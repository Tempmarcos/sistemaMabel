'use client'
import SideBar from "../components/sideBar/sideBar";
import "../globals.css";
import { temas } from "./temas";



export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{color: temas.corTexto, backgroundColor: temas.corFundo}}>{children}</body>
      <SideBar corElemento={temas.corElemento} corTexto={temas.corTexto}/>
    </html>
  );
}
