"use client"
import Image from "next/image";
import styles from "./page.module.css";
import AlunoCard from "../../components/cards/alunoCard/alunoCard";
import ModalCard from "../../components/cards/modalCard/modalCard";
import {useState} from "react";
import DropdownButton from "../../components/botoes/dropdownButton/dropdownButton";
import { alunos } from "@/mocks/alunos";
import { turmas } from "@/mocks/turmas";
import BtnAdicionarAluno from "../../components/botoes/BtnAdicionarAluno/BtnAdicionarAluno";




export default function Home() {

  const [displayAtual, setDisplayAtual] = useState("none");

  const [displayLegenda, setDisplayLegenda] = useState("none")
  const [textoLegenda, setTextoLegenda] = useState('Legendas ↓');

  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);

  //Botão pra abrir o modal dos alunos.
  function handleOpenModal() {
    setDisplayAtual("block");
  }

  //Botão para minimizar o modal dos alunos
  function handleCloseModal() {
    setDisplayAtual("none");
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

  function handleFiltroTurma(turma : string){
    if(turma == '') setAlunosFiltrados(alunos); 
    else setAlunosFiltrados(alunos.filter(aluno => aluno.turma === turma))
  }

  function handleFiltroTurno(turno : string){
    if(turno == '') setAlunosFiltrados(alunos); 
    else setAlunosFiltrados(alunos.filter(aluno => aluno.turno === turno))
  }

  

  return (
    <>
      <div className="filtro">
        <h1 className="contagemAlunos">Alunos: {alunosFiltrados.length}</h1>

        <DropdownButton name="Turno">
          <div>
            <a onClick={() => handleFiltroTurno('')}>Turno</a>
            <a onClick={() => handleFiltroTurno('manha')}>Manhã</a>
            <a onClick={() => handleFiltroTurno('tarde')}>Tarde</a>
          </div>
        </DropdownButton> 

        <DropdownButton name="Turma">
          <div>
            <a onClick={() => handleFiltroTurma('')}>Turma</a>
            {
              turmas.map(turma => {
              return <a onClick={() => handleFiltroTurma(turma.nome)}> {turma.nome} </a>
            })}
          </div>
        </DropdownButton> 
        <input type="text" placeholder="Pesquisar..." id="searchBar"/>
      </div>
      <div className="legendas">
        <a onClick={handleLegendas} style={{display: 'block', cursor: 'pointer', width: '150px'}}><h2>{textoLegenda}</h2></a>
        <div style={{display: displayLegenda}}>
          <h3>Manhã:</h3> <input type="color" id="inputColorManha" value='#00ffff' />
          <h3>Tarde:</h3> <input type="color" id="inputColorTarde" value='#ffa500' />
      </div>
      </div>
      <div className="listaAlunos">
        {
          alunosFiltrados.map(aluno => {
          return <a className="linkAlunos" onClick={handleOpenModal}>
                    <AlunoCard nome={aluno.nome} turma={aluno.turma} turno={aluno.turno} />
                 </a>
          })
        }
     </div>
      <div className="modal" style={{display: displayAtual}}>
          <ModalCard/>
          <div className='exit'>
                <a onClick={handleCloseModal}><h1>✖</h1></a>
           </div>
      </div>
      <a onClick={handleOpenModal}><BtnAdicionarAluno /></a>
      <ul>
        {
            alunosFiltrados.map(aluno => {
            return <li>* {aluno.nome}</li>
            })
          }
      </ul>
    </>
  )
}
