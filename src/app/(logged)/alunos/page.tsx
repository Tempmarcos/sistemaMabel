'use client'
import AlunoCard from "../../components/cards/AlunoCard/AlunoCard";
import styles from './page.module.css'
import CriarAlunoForm from "../../components/forms/CriarAlunoForm/CriarAlunoForm";
import {useCallback, useEffect, useState} from "react";
import DropdownButton from "../../components/botoes/dropdownButton/dropdownButton";
import BtnAdicionar from '../../components/botoes/BtnAdicionar/BtnAdicionar';
import Header from "@/app/components/header/Header";
import Modal from "@/app/components/cards/Modal/Modal";
import { errorHandler } from "@/http/errorHandler";
import { getTurmas } from "@/http/services/turmas/functions";
import { ListAlunoResponseType } from "@/http/parses/aluno";
import { getAlunos } from "@/http/services/alunos/services";


type TurmaData = {
  id : string;
  nome : string;
}

export default function Home() {
  const [displayModal, setDisplayModal] = useState("none");

  const [displayLegenda, setDisplayLegenda] = useState("none")
  const [textoLegenda, setTextoLegenda] = useState('Legendas ↓');
  const [isLoading, setIsLoading] = useState(true);


  const [alunos, setAlunos] = useState<ListAlunoResponseType>([] as ListAlunoResponseType);
  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);
  const [turmas, setTurmas] = useState<TurmaData[]>([] as TurmaData[]);
  
  const corElemento = 'purple';
  const corTexto = "black";
  const corFundo = "white";

  //#04AA6D

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


  //Função pra abrir o modal.
  function handleOpenModal() {
    setDisplayModal("block");
  }

  //Função para pegar as informações de um aluno específico.
  function handleGetAluno(id : string) {
    handleOpenModal();
    alert(JSON.stringify(id, null, 2))
  }

  //
  function handleCriarAluno() {
    handleOpenModal();
  }

  //Botão para minimizar o modal dos alunos
  function handleXDisplay(){
    setDisplayModal('none');
}

function handleMinimizarModal(){
  setDisplayModal('none');
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

  return (
    <main className={styles.main} style={{backgroundColor: corFundo, color: corTexto}}>
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
              return <a onClick={() => handleFiltro(turma.nome)}> {turma.nome} </a>
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
      <div className="listaAlunos">
        {isLoading && alunos.length === 0 && <p>Carregando...</p>} 
        {!isLoading && alunos.length === 0 && <p>Para criar um aluno, clique no botão ali embaixo!</p>}
        {!isLoading && alunosFiltrados.length === 0 && alunos.length !== 0 && <p>Nenhum aluno possui esse filtro :(</p>}
        {
          alunosFiltrados.map(aluno => {
          return <a key={aluno.id} className="linkAlunos" onClick={() => handleGetAluno(aluno.id)}>
                    <AlunoCard id={aluno.id} nome={aluno.nome} turma={aluno.turma.nome} turno={aluno.turma.turno} />
                 </a>
          })
        }
     </div>
      <Modal onClickMin={handleMinimizarModal} onClick={handleXDisplay} display={displayModal}> <CriarAlunoForm/> </Modal>    
      <a onClick={handleCriarAluno}><BtnAdicionar title='Adicionar aluno' corTexto={corTexto} corElemento={corElemento}/></a>
      <ul>
        {
            alunosFiltrados.map(aluno => {
            return <li>* {aluno.nome}</li>
            })
          }
      </ul>
    </main>
  )
}
