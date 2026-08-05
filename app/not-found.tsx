import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe. Puede que haya sido movida o eliminada.
      </p>
      <Link href="/">
        <Button size="lg">
          Volver al inicio
        </Button>
      </Link>
    </div>
  );
}