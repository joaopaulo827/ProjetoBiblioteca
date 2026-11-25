import { Suspense } from "react";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Carregando from "@/components/Carregando/Carregando";
import "./globals.css";

export const metadata = {
  title: "Biblioteca Digital",
  description: "Exemplo de navegação entre páginas no Next",
};
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense fallback={<Carregando />}>
          <Cabecalho />
          <main className="conteudo">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}