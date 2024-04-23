interface Iheader{
    children: React.ReactNode
}


export default function Header({ children } : Iheader){
    return(
        <header style={{backgroundColor: 'orange', color: 'black'}}>
           {children}
        </header>
    );
}