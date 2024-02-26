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
      <body>{children}</body>
      <SideBar />
    </html>
  );
}
