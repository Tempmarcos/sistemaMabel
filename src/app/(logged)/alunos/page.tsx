'use client'
import AlunoCard from '@/app/components/cards/cardAluno/AlunoCard';
import styles from './page.module.css'
// import style from '../../components/cards/cardAluno/alunocard.module.css'
import {useCallback, useEffect, useState} from "react";
import DropdownButton from "../../components/botoes/dropdownButton/dropdownButton";
import BtnAdicionar from '../../components/botoes/BtnAdicionar/BtnAdicionar';
import Header from "@/app/components/header/Header";
import { getTurmas } from "@/http/services/turmas/functions";
import { useForm, SubmitHandler } from "react-hook-form"
import { ListAlunoResponseType } from "@/http/parses/aluno";
import { getAlunos } from "@/http/services/alunos/services";
import Modal from "@/app/components/cards/Modal/Modal";
import { axiosInstance } from "@/http/config/axiosConfig";
import { CreateDiariaRequestType, ListDiariaResponseType } from "@/http/parses/diaria";
import dayjs from "dayjs";
import DiariaCard from "@/app/components/cards/DiariaCard/DiariaCard";
import { CreateAtrasoRequestType, ListAtrasoResponseType } from "@/http/parses/atraso";
import { useRouter } from "next/navigation";
import SideBar from '@/app/components/sideBar/sideBar';


type TurmaData = {
  id : string;
  nome : string;
}

type AlunoType = {
  id: string;
  nome: string;
  turma: {
      id: string;
      nome: string;
      turno: "MANHA" | "TARDE" | "NOITE";
      faixa: "KIDS" | "TEENS";
  };
}

export default function Home() {
  const [displayLegenda, setDisplayLegenda] = useState("none")
  const [textoLegenda, setTextoLegenda] = useState('Legendas ↓');
  const [isLoading, setIsLoading] = useState(true);

  const [displayModal, setDisplayModal] = useState("none");
  const [alunoAtual, setAlunoAtual] = useState({} as AlunoType);
  const [displayCriarDiaria, setDisplayCriarDiaria] = useState('none');
  const [displayCriarAtraso, setDisplayCriarAtraso] = useState('none');


  const [atrasosAtuais, setAtrasosAtuais] = useState<ListAtrasoResponseType>([] as ListAtrasoResponseType);
  const [diariasAtuais, setDiariasAtuais] = useState<ListDiariaResponseType>([] as ListDiariaResponseType);
  const [alunos, setAlunos] = useState<ListAlunoResponseType>([] as ListAlunoResponseType);
  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);
  const [turmas, setTurmas] = useState<TurmaData[]>([] as TurmaData[]);
  const navigate = useRouter();
  
  const corElemento = 'orange';
  const corTexto = "black";
  const corFundo = "white";

  const fetchAlunos = useCallback(async () => {
    try {
        setIsLoading(true);
        const data : ListAlunoResponseType = await getAlunos();
        setAlunos(data);
        setAlunosFiltrados(data);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
}, []);
useEffect(() => {
    fetchAlunos();
}, [fetchAlunos]);

  const fetchTurmas = useCallback(async () => {
    try {
        const data : TurmaData[] = await getTurmas();
        setTurmas(data);
    } catch (error) {
        //errorHandler(error);
    }
}, []);
useEffect(() => {
    fetchTurmas();
}, [fetchTurmas]);


  //Função para pegar as informações de um aluno específico.
  function handleGetAluno(aluno : AlunoType) {
    setDisplayModal('flex');
    // alert(JSON.stringify(id, null, 2))
    setAlunoAtual(aluno);
    getDiarias(aluno.id);
    getAtrasos(aluno.id);
    reset ({
      alunoId: aluno.id
    })
    resetAtraso ({
      alunoId: aluno.id
    })
  }

  async function getDiarias(id : string){
    const resposta = await axiosInstance.get(`/diarias/${id}`);
    const diarias: ListDiariaResponseType = resposta.data;
    // alert(JSON.stringify(diarias, null, 2));
    diarias.forEach(diaria => {
      diaria.data = dayjs(diaria.data).locale('pt-br').add(3, 'hour').format('DD/MM');
    })
    setDiariasAtuais(diarias);
  }

  function textoDiarias() {
    if(diariasAtuais.length === 0){
      return <h4>{alunoAtual.nome} não possui diárias</h4>
    }
  }

  function textoAtrasos() {
    if(atrasosAtuais.length === 0){
      return <h4>{alunoAtual.nome} não possui atrasos</h4>
    }
  }

  async function handleDeleteDiaria(id : string, alunoId : string){
    const resposta = await axiosInstance.delete(`diarias/${id}`);
    getDiarias(alunoId);
    return resposta;
  }

  function handleAdicionarDiaria() {
    displayCriarDiaria === 'none' ? setDisplayCriarDiaria('flex') : setDisplayCriarDiaria('none');
  }

  async function getAtrasos(id : string){
    const resposta = await axiosInstance.get(`/atrasos/${id}`);
    const atrasos: ListAtrasoResponseType = resposta.data;
    // alert(JSON.stringify(diarias, null, 2));
    atrasos.forEach(atraso => {
      atraso.data = dayjs(atraso.data).format('DD/MM');
    })
    setAtrasosAtuais(atrasos);
  }

  async function handleDeleteAtraso(id : string, alunoId : string){
    const resposta = await axiosInstance.delete(`atrasos/${id}`);
    getAtrasos(alunoId);
    return resposta;
  }

  function handleAdicionarAtraso() {
    displayCriarAtraso === 'none' ? setDisplayCriarAtraso('flex') : setDisplayCriarAtraso('none');
  }

  function handleFecharModal() {
    setDisplayModal('none');
    setAlunoAtual({} as AlunoType);
    setDiariasAtuais([]);
    setAtrasosAtuais([]);
  }

  //Botão pra fazer as legendas (manhã, tarde, etc) aparecerem/sumirem
  function handleLegendas() {
    if(displayLegenda == 'block'){
      setDisplayLegenda('none');
      setTextoLegenda('Legendas ↓');
      
    } else {
      setDisplayLegenda('block');
      setTextoLegenda('Legendas ↑');
    }
  }

  //Função para a filtragem do turno e da turma
  function handleFiltro(atributo : string){
    if(atributo == '') setAlunosFiltrados(alunos); 
    else setAlunosFiltrados(alunos.filter(aluno => aluno.turma.turno === atributo || aluno.turma.nome === atributo))
  }

//Função para pesquisar o nome dos alunos
  function SearchFilter(event: { target: { value: any; }; }){
    setAlunosFiltrados(alunos.filter(aluno => aluno.nome.toLowerCase().includes(event.target.value)))
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateDiariaRequestType>()

  const onSubmit: SubmitHandler<CreateDiariaRequestType> = async (data) => {
    try{
      // alert(JSON.stringify(data, null, 2));
      const resposta = await axiosInstance.post(`/diarias`, data);
      getDiarias(data.alunoId);
    } catch(error){
        console.log(error)
    } finally {
      setDisplayCriarDiaria('none');
      reset ({
        alunoId: data.alunoId,
        data : '',
        almoco : false,
        turno: 'MANHA',
      })
    }
  }

  const {
    register : registerAtraso,
    handleSubmit : handleAtrasoSubmit,
    reset : resetAtraso,
    formState: { errors : errorsAtraso },
  } = useForm<CreateAtrasoRequestType>()

  const onAtrasoSubmit: SubmitHandler<CreateAtrasoRequestType> = async (data) => {
    try{
      // alert(JSON.stringify(data, null, 2));
      const resposta = await axiosInstance.post(`/atrasos`, data);
      getAtrasos(data.alunoId);
    } catch(error){
        console.log(error)
    } finally {
      setDisplayCriarAtraso('none');
    }
  }

  return (
    <main className={styles.main} style={{backgroundColor: corFundo, color: corTexto}}>
      <SideBar corElemento={'orange'} corTexto={'white'}/>
      <Header>
        <DropdownButton name="Turno" corElemento={corElemento} corTexto={corTexto}>
          <div>
            <a onClick={() => handleFiltro('')}>Turno</a>
            <a onClick={() => handleFiltro('MANHA')}>Manhã</a>
            <a onClick={() => handleFiltro('TARDE')}>Tarde</a>
          </div>
        </DropdownButton> 

        <DropdownButton name="Turma" corElemento={corElemento} corTexto={corTexto}>
          <div>
          {/* <input type="text" placeholder="Pesquisar turmas..." onChange={SearchFilter}/> */}
            <a onClick={() => handleFiltro('')}>Turma</a>
            {
              turmas.map(turma => {
              return <a key={turma.id} onClick={() => handleFiltro(turma.nome)}> {turma.nome} </a>
            })}
          </div>
        </DropdownButton> 
        <input type="text" placeholder="Pesquisar..." id="searchBar" onChange={SearchFilter} />
        </Header>
      <div className="legendas">
        <a onClick={handleLegendas} style={{display: 'block', cursor: 'pointer', width: '150px'}}><h2>{textoLegenda}</h2></a>
        <div style={{display: displayLegenda}}>
          <h3>Manhã:</h3> <input type="color" id="inputColorManha" value='#00ffff' />
          <h3>Tarde:</h3> <input type="color" id="inputColorTarde" value='#ffa500' />
      </div>
      <h2>Alunos: {alunosFiltrados.length}</h2>
      </div>
      <div className={styles.listaAlunos}>
        {isLoading && alunos.length === 0 && <p>Carregando...</p>} 
        {!isLoading && alunos.length === 0 && <p>Para criar um aluno, clique no botão ali embaixo!</p>}
        {!isLoading && alunosFiltrados.length === 0 && alunos.length !== 0 && <p>Nenhum aluno possui esse filtro :(</p>}
        {
          alunosFiltrados.map(aluno => {
          return <a key={aluno.id} className="linkAlunos" onClick={() => handleGetAluno(aluno)}>
                    <AlunoCard id={aluno.id} nome={aluno.nome} turma={aluno.turma.nome} turno={aluno.turma.turno} />
                 </a>
          })
        }
     </div>
     <Modal display={displayModal} onClick={handleFecharModal}>
        <div className={styles.modal}>
            <a onClick={() => navigate.push(`/alunos/editar/${alunoAtual.id}`)} className={styles.linkEditar}>Ver/Editar informações do aluno</a>
            <h1 className={styles.nome} >{alunoAtual.nome}</h1>
            <div className={styles.div}>
                <h1>Diárias</h1>
                <a onClick={handleAdicionarDiaria}><h1>+</h1></a>
                <div style={{display: displayCriarDiaria}}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label htmlFor="turno">Turno:</label>
                        <select id="turno" {...register('turno')}>
                          <option value="MANHA">Manhã</option>
                          <option value="TARDE">Tarde</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="almoco">Almoço:</label>
                        <input type="checkbox" id="almoco" {...register('almoco')}/>
                      </div>
                      <div>
                        <label htmlFor="data">Data:</label>
                        <input type="date" id="data" {...register('data')}/>
                      </div>
                      <button type="submit">Registrar diária</button>
                  </form>
                </div>
            </div>
            <div className={styles.div}>
                {textoDiarias()}
                {diariasAtuais.map(diaria => {
                  return <DiariaCard key={diaria.id} almoco={diaria.almoco} turno={diaria.turno} data={diaria.data} onClick={() => handleDeleteDiaria(diaria.id, diaria.alunoId)}/>
                })}
            </div>
            <div className={styles.div}>
                <h1>Atrasos</h1>
                <a onClick={handleAdicionarAtraso}><h1>+</h1></a>
                <div style={{display: displayCriarAtraso}}>
                  <form onSubmit={handleAtrasoSubmit(onAtrasoSubmit)}>
                      <div>
                        <label htmlFor="data">Data:</label>
                        <input type="date" id="data" {...registerAtraso('data')}/>
                      </div>
                      <button type="submit">Registrar atraso</button>
                  </form>
                </div>
            </div>
            <div className={styles.div}>
                {textoAtrasos()}
                {atrasosAtuais.map(atraso => {
                  return <DiariaCard key={atraso.id} data={atraso.data} onClick={() => handleDeleteAtraso(atraso.id, atraso.alunoId)}/>
                })}
            </div>
        </div>
      </Modal>
      <a href='/alunos/criar'><BtnAdicionar title='Adicionar aluno' corTexto={corTexto} corElemento={corElemento}/></a>
    </main>
  )
}
