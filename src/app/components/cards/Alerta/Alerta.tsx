import styles from './alerta.module.css'


interface IAlerta {
    children? : React.ReactNode;
    display : string;
    texto : string;
    confirmacao : boolean;
    botaoOk? : () => void;
    botaoSim? : any;
    botaoNao? : () => void;
}

export default function Alerta({ children, display, texto, confirmacao, botaoOk, botaoNao, botaoSim } : IAlerta){


    function tipoDeCard(){
        if(confirmacao){
            return(
                <div>
                    <button onClick={botaoNao} style={{backgroundColor: 'red'}}>Não</button>
                    <button onClick={botaoSim} style={{backgroundColor: 'lime'}}>Sim</button>
                </div>
            )
        }else {
            return (
                <div>
                    <button onClick={botaoOk}>Ok</button>
                </div>
            )
        }
    }

    return (
        <div>
            <div className={styles.alerta} style={{display: display}}>
                <h2>{texto}</h2>
                <div>{children}</div>
                {tipoDeCard()}
            </div>
        </div>
    )
}