'use client'
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar";
import Modal from "@/app/components/cards/Modal/Modal";
import styles from './page.module.css';
import UserCard from "@/app/components/cards/UserCard/UserCard";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import { AxiosError } from "axios";
import { errorHandler } from "@/http/errorHandler";


type InputData = {
    id? : string;
    nome : string;
    role : string;
    password : string;
    email : string;
    created_at? : string;
}

type APIData = {
    id : string;
    nome : string;
    role : string;
    email : string;
} 


export default function Home() {
    const [displayModal, setDisplayModal] = useState("none");

    const [users, setUsers] = useState<APIData[]>([] as APIData[]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');


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
        return resposta.data;
      }

    async function getUser(id : string) {
        const resposta = await axiosInstance.get(`/users/${id}`);
        return resposta.data;
    }

    //⁝

    async function deleteUser(id : string) {
        const resposta = await axiosInstance.delete(`/users/${id}`);
        alert(JSON.stringify(resposta.data, null, 2))
        handleXDisplay();
        setSelectedUser('');
        fetchData();
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
        setSelectedUser('');
    }

    function handleMinimizarModal(){
        setDisplayModal('none');
        reset({
            nome : '',
            role : '',
            password : '',
            email : '',
        })
        setSelectedUser('');
    }

    function handleOpenModal() {
        setDisplayModal("flex");
      }

     async function handleGetUser(id : string) {
        handleOpenModal();
        const user = await getUser(id);
        setSelectedUser(user.id);
        reset(user);
      }

      const aparecerBotaoDeletar = () => {
        if(selectedUser){
            return <button onClick={() => handleDeleteUser(selectedUser)}>Deletar usuário</button>
        }
      }

      async function handleDeleteUser(id : string) {
        const userDelete = await deleteUser(id);
      }

      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<InputData>()



    const onSubmit: SubmitHandler<InputData> = async (data) => {
        if(selectedUser) {
            delete data.created_at;
            // alert(JSON.stringify(data, null, 2));
            try {
                const resposta = await axiosInstance.put(`/users`, data);
                fetchData();
            } catch (error) {
                errorHandler(error);
            } finally {
                handleXDisplay();
                setSelectedUser('');
            }
        } else {
            try {
                const resposta = await axiosInstance.post('/users', data);
                fetchData();
            } catch (error) {
                errorHandler(error)
            } finally{
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
                    !isLoading && users.map(user => {
                        return <a className={styles.card} key={user.id} onClick={() => handleGetUser(user.id)}>
                               <UserCard id={user.id} nome={user.nome} key={user.id}
                               role={user.role} /></a>
                    }) 
                }
            </div>
            <Modal onClickMin={handleMinimizarModal} onClick={handleXDisplay} display={displayModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {aparecerBotaoDeletar()}
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input id="nome" {...register("nome", { required: true })} />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" {...register("email", { required: true })} />
                </div>
                <div>
                    <label htmlFor="role">Cargo:</label>
                    <select id="role" {...register("role")}>
                        <option value="PROF">Professor(a)</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="DIRETORA">Diretora</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" {...register("password", { required: true })} />
                </div>
                {errors.nome && <span>This field is required</span>}

                <input type="submit" />
            </form>
            </Modal>
            <a onClick={handleOpenModal}>
                <BtnAdicionar title="Adicionar usuário" corElemento="blue" corTexto="white"/>
            </a>
        </main>
    )
}