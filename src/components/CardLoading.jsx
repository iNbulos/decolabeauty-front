import { Card, CardContent } from "./ui/card";
export default function CardLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm shadow-lg rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                    <p className="text-sm text-gray-600">Carregando...</p>
                </CardContent>
            </Card>
        </div>
    )
}