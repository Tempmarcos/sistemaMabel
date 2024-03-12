import { temas } from "@/app/(logged)/temas";



interface Iheader{
    children: React.ReactNode
}


export default function Header({ children } : Iheader){
    return(
        <header style={{backgroundColor: temas.corElemento, color: temas.corTexto}}>
           {children}
        </header>
    );
}