interface Iheader{
    children: React.ReactNode
}


export default function Header({ children } : Iheader){
    return(
        <header style={{backgroundColor: 'orange', color: 'black', boxShadow: '0px 1px 10px black' }}>
           {children}
        </header>
    );
}