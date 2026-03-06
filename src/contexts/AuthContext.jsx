import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup as firebaseSignInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";


import { auth } from "../lib/firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  role: null,
  profile: null,
  getIdToken: async (_forceRefresh = false) => null,
  signInWithGoogle: async () => { },
  signOut: async () => { },
  updateUserProfile: async (_data) => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);

  // 👉 função auxiliar: garante que o perfil tem todos os campos novos
  const ensureUserProfileShape = async (firebaseUser, existingData, ref) => {
    const updates = {};

    // Exemplo de campos que você quer garantir:
    if (!existingData.email && firebaseUser.email) {
      updates.email = firebaseUser.email;
    }

    if (!existingData.name && firebaseUser.displayName) {
      updates.name = firebaseUser.displayName;
    }

    if (!existingData.photoURL && firebaseUser.photoURL) {
      updates.photoURL = firebaseUser.photoURL;
    }

    if (!existingData.role) {
      updates.role = "client"; // padrão
    }

    if (!existingData.createdAt) {
      updates.createdAt = serverTimestamp();
    }

    // campo de controle de migração (opcional)
    if (Object.keys(updates).length > 0) {
      updates.migratedAt = serverTimestamp();
      await updateDoc(ref, updates);
      return { ...existingData, ...updates };
    }

    // nada pra atualizar
    return existingData;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(true);

      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          // usuário que já tinha doc antigo
          let data = snap.data();

          // 👉 aqui rola a "migração" se estiver faltando campo
          data = await ensureUserProfileShape(currentUser, data, ref);

          setProfile(data);
          setRole(data.role || null);
        } else {
          // não existia doc (talvez usuário bem antigo etc)
          const baseProfile = {
            email: currentUser.email,
            name: currentUser.displayName || "",
            photoURL: currentUser.photoURL || null,
            role: "client",
            createdAt: serverTimestamp(),
          };

          await setDoc(ref, baseProfile);
          setProfile(baseProfile);
          setRole(baseProfile.role);
        }
      } catch (err) {
        console.error("Erro ao buscar/atualizar perfil do usuário:", err);
        setProfile(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const result = await firebaseSignInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const userProfile = {
        email: firebaseUser.email,
        role: "client",
        name: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || null,
        createdAt: serverTimestamp(),
      };

      await setDoc(ref, userProfile);
      setProfile(prev => ({ ...prev, ...userProfile }));
      setRole(userProfile.role);
    } else {
      // mesmo caso de cima: já tem doc antigo → garantir shape
      const data = await ensureUserProfileShape(firebaseUser, snap.data(), ref);
      setProfile(data);
      setRole(data.role || null);
    }

    return result;
  };

  const updateUserProfile = async (data) => {
    if (!user) throw new Error("Nenhum usuário autenticado");

    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    setProfile(prev => ({
      ...prev,
      ...data,
    }));

    if (data.role) {
      setRole(data.role);
    }
  };

  const signOut = () => firebaseSignOut(auth);

  const getIdToken = useCallback(async (forceRefresh = false) => {
    const u = auth.currentUser;
    if (!u) return null;                // ou throw new Error(...)
    return await u.getIdToken(forceRefresh);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        loading,
        getIdToken,
        signInWithGoogle,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
