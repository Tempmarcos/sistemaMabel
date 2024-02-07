export default function Header(link: string, text: string){
    return(
        <header className="header">
           <ol>
            <li><a href={link}></a></li>
            <li><a href={link}></a></li>
            <li><a href={link}></a></li>
           </ol>
        </header>
    );
}