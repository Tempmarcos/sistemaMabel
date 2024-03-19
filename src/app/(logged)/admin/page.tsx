'use client'
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar";
import Modal from "@/app/components/cards/Modal/Modal";
import styles from './page.module.css';
import UserCard from "@/app/components/cards/UserCard/UserCard";
import { useCallback, useEffect, useState } from "react";
import { users } from "@/mocks/users";
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"


type InputData = {
    nome : string;
    role : string;
    password : string;
    email : string;
}

type APIData = {
    id : number;
    nome : string;
    role : string;
    email : string;
} 


export default function Home() {
    const [displayModal, setDisplayModal] = useState("none");

    const [users, setUsers] = useState<APIData[]>([] as APIData[]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getUsers();;

            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    async function getUsers() {
        const resposta = await axiosInstance.get('/users');
        console.log(resposta.data);
        return resposta.data;
      }

    function handleXDisplay(){
        setDisplayModal('none');
        reset({
            nome : '',
            role : '',
            password : '',
            email : '',
        })
    }

    function handleOpenModal() {
        setDisplayModal("flex");
      }

      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<InputData>()


    const onSubmit: SubmitHandler<InputData> = async (data) => {
        alert(JSON.stringify(data, null, 2));
        try {
            const resposta = await axiosInstance.post('/users', data);
            console.log(resposta);
            fetchData();
            handleXDisplay();
        } catch (error) {
            if(error instanceof Error) {
            alert(JSON.stringify(error.message, null, 2));
            handleXDisplay()
        }
        }
        
    } 

    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>Usuários:</h1>
            </div>
            <div>
            {isLoading && users.length === 0 && <p>Carregando...</p>}
                {
                    /*
                    users.map(user => {
                        return <UserCard nome={user.nome} role={user.role} />
                    })
                    */
                    !isLoading && users.map(user => {
                        return <UserCard id={user.id} nome={user.nome} key={user.id}
                          role={user.role} />
                    })
                    
                }
            </div>
            <Modal onClick={handleXDisplay} display={displayModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Nome' {...register("nome", { required: true })} />
                <input placeholder="E-mail" type="email" {...register("email", { required: true })} />
                <label htmlFor="role">Cargo:</label>
                <select id="role" {...register("role")}>
                    <option value="DIRETORA">Diretora</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="PROF">Professor(a)</option>
                </select>
                <input type="password" placeholder="Senha" {...register("password", { required: true })} />
                {errors.nome && <span>This field is required</span>}

                <input type="submit" />
            </form>
            </Modal>
            <a onClick={handleOpenModal}><BtnAdicionar title="Adicionar usuário" corElemento="blue" corTexto="white"/></a>
        </main>
    )
}