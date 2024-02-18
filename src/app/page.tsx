"use client"
import Image from "next/image";
import styles from "./page.module.css";
import AlunoCard from "./components/cards/alunoCard/alunoCard";
import {useState} from "react";
import DropdownButton from "./components/botoes/dropdownButton";
import { alunos } from "@/mocks/alunos";





export default function Home() {

  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);


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
          <a onClick={() => handleFiltroTurma('Tarde Kids 1')}>Tarde Kids 1</a>
          <a onClick={() => handleFiltroTurma('Tarde Teens 1')}>Tarde Teens 1</a>
          <a onClick={() => handleFiltroTurma('Manha Kids 1')}>Manha Kids 1</a>
          <a onClick={() => handleFiltroTurma('Manha Teens 1')}>Manha Teens 1</a>
        </div>
      </DropdownButton> 
    
    </div>
    <div className="listaAlunos">
      {
        alunosFiltrados.map(aluno => {
         return <AlunoCard nome={aluno.nome} turma={aluno.turma} turno={aluno.turno} />
        })
      }
    </div>
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
