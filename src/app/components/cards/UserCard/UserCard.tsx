import styles from './usercard.module.css'

interface IUserCard {
    id : number;
    nome : string;
    role : string;
}


export default function UserCard({ id, nome, role} : IUserCard) {


    let background;
    if(role == 'ADMIN'){
        background= 'blue';
    } else if(role == 'PROF') {
        background= 'cyan';
    } else if(role == 'DIRETORA'){
        background= 'purple'
    } else {
        background= 'gray';
    }

    return (
        <div className={styles.card} style={{backgroundColor: background}}>
            <h1>{nome}</h1>
        </div>
    )
}