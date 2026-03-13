// src/services/UserRepo.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function clean(s) {
  return String(s || "").trim();
}

function normalize(s) {
  return clean(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mapUserDoc(d) {
  const data = d.data() || {};
  return { uid: d.id, id: d.id, ...data };
}

// ✅ pegar usuário por uid
export async function getUserById(uid) {
  const id = clean(uid);
  if (!id) return null;

  const ref = doc(db, "users", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { uid: snap.id, id: snap.id, ...snap.data() };
}

export async function listUsersLatest({ limitN = 200 } = {}) {
  const lim = Math.max(1, Math.min(500, Number(limitN) || 200));
  const qy = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(lim));
  const snap = await getDocs(qy);
  return snap.docs.map(mapUserDoc);
}

// ✅ busca por prefixo em email e name (Firestore: >= e <= prefix+"\uf8ff")
export async function searchUsers({ q, limitN = 20 } = {}) {
  const text = normalize(q);
  const lim = Math.max(1, Math.min(30, Number(limitN) || 20));

  if (!text || text.length < 2) return [];

  const end = text + "\uf8ff";

  // Query 1: email prefix
  const qEmail = query(
    collection(db, "users"),
    orderBy("email"),
    where("email", ">=", text),
    where("email", "<=", end),
    limit(lim)
  );

  // Query 2: name prefix
  const qName = query(
    collection(db, "users"),
    orderBy("name"),
    where("name", ">=", text),
    where("name", "<=", end),
    limit(lim)
  );

  const [s1, s2] = await Promise.all([getDocs(qEmail), getDocs(qName)]);

  // merge sem duplicar
  const map = new Map();
  for (const d of s1.docs) map.set(d.id, mapUserDoc(d));
  for (const d of s2.docs) map.set(d.id, mapUserDoc(d));

  return Array.from(map.values());
}
