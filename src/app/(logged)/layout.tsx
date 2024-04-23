'use client'
import SideBar from "../components/sideBar/sideBar";
import "../globals.css";




export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{color: 'black', backgroundColor: 'white'}}>{children}</body>
      <SideBar corElemento={'orange'} corTexto={'white'}/>
    </html>
  );
}
