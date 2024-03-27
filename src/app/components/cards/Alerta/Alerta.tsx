import styles from './alerta.module.css'


interface IAlerta {
    children : React.ReactNode;
}

export default function Alerta({ children } : IAlerta){
    return (
        <div>
            <div className={styles.alerta}>
                {children}
            </div>
        </div>
    )
}