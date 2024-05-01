'use client'
import BtnAdicionar from "@/app/components/botoes/BtnAdicionar/BtnAdicionar";
import Modal from "@/app/components/cards/Modal/Modal";
import styles from './page.module.css';
import UserCard from "@/app/components/cards/UserCard/UserCard";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { axiosInstance } from "@/http/config/axiosConfig"
import { AxiosError } from "axios";
import { getUsers, getUser, deleteUser } from '@/http/services/users/functions';
import { errorHandler } from "@/http/errorHandler";
import Alerta from "@/app/components/cards/Alerta/Alerta";


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
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState('');
  const [displayAlerta, setDisplayAlerta] = useState('none');


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
            return <button className={styles.deletar} onClick={() => handleDeleteUser(selectedUser)}>Deletar usuário</button>
        }
      }

      const openAlerta = () => {
        return <Alerta confirmacao={true} texto="Deseja excluír esse usuário?" 
        display={displayAlerta}></Alerta>
      }

      async function handleDeleteUser(id : string) {
        openAlerta();
        try{
            const userDelete = await deleteUser(id);
        }catch(error){
            errorHandler(error);
        }
        handleXDisplay();
        setSelectedUser('');
        fetchData();
      }

      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
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
            {!isLoading && users.length === 0 && <p>Para criar um usuário, clique no botão ali embaixo!</p>}

                {
                    !isLoading && users.map(user => {
                        return <a className={styles.card} key={user.id} onClick={() => handleGetUser(user.id)}>
                               <UserCard id={user.id} nome={user.nome} key={user.id}
                               role={user.role} /></a>
                    }) 
                }
            </div>
            <Modal onClick={handleXDisplay} display={displayModal}>
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

                <input type="submit" disabled={isSubmitting}/>
            </form>
            </Modal>
            <a onClick={handleOpenModal}>
                <BtnAdicionar title="Adicionar usuário" corElemento="orange" corTexto="black"/>
            </a>
        </main>
    )
}