'use client'
import { axiosInstance } from "@/http/config/axiosConfig";
import styles from "./login.module.css"
import { SubmitHandler, useForm } from "react-hook-form";



type LoginData = {
    user : string;
    senha : string;
}

export default function Login(){

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>()


    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try{
            const resposta = await axiosInstance.post(`/auth`, data);

            localStorage.setItem('token', resposta.data.token)
        }catch(error){
            console.log(error)
        }

    }

    return (
        <body style={{'overflow': 'hidden'}}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <img className={styles.img} src="./icon.png" alt=""/>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1>Usuário:</h1>
                            <input type="text" name="" id="" />
                            <h1>Senha:</h1>
                            <input type="password" name="" id="" />
                            <br />
                            <button type="submit"><a href="/alunos">Entrar</a></button>
                        </form>
                    </div>
                </div>
            </main>
        </body>
    )
}