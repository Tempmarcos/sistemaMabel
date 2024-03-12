'use client'
import { turmas } from "@/mocks/turmas"
import styles from './page.module.css'
import TurmaCard from "@/app/components/cards/TurmaCard/TurmaCard"
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar"
import { useForm, SubmitHandler } from "react-hook-form"


type InputData = {
    nome : string;
    prof : string;
    turno : string;
    faixa : string;
}

export default function Home(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<InputData>()

    const onSubmit: SubmitHandler<InputData> = (data) => alert(JSON.stringify(data, null, 2));



    return (
        <main className={styles.main}>
            {turmas.map(turma => {
                return <TurmaCard id={turma.id} nome={turma.nome} key={turma.id}
                faixa={turma.faixa} prof={turma.prof} turno={turma.turno} />
            })}

            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue='nome' {...register("nome", { required: true })} />
                <input defaultValue="professor(a)" {...register("prof")} />
                <input defaultValue="turno" {...register("turno")} />
                <input defaultValue="faixa" {...register("faixa")} />
                {errors.nome && <span>This field is required</span>}

                <input type="submit" />
            </form>
           
            <BtnAdicionar title="Adicionar turma" corElemento="blue" corTexto="white"/>
        </main>
    )
}