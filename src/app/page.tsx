"use client"
import Image from "next/image";
import styles from "./page.module.css";
import AlunoCard from "./components/cards/alunoCard/alunoCard";
import {useState} from "react";
import DropdownButton from "./components/botoes/dropdownButton";



const alunos = [ 
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Kids"},
  {nome: "Giovanni", turno: "tarde", turma: "Teens"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Narciso", turno: "tarde", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "João", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Kids"},
  {nome: "Gabriel", turno: "manha", turma: "Teens"},
  {nome: "Ana Clara", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Marcos", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Kids"},
  {nome: "Luiza", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Gabriel", turno: "manha", turma: "Kids"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  {nome: "Joaquim", turno: "tarde", turma: "Teens"},
  
]

export default function Home() {



  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);

  
  function listaTurma(alunos : any){
    let arrayTurma = alunos.turma.filter(function (v : string, i: number, self: string){
      return i == self.indexOf(v);
    });

    console.log(arrayTurma)
    return arrayTurma;
  }

  function handleFilterTurno(filter: string) {
    setAlunosFiltrados(alunos.filter(aluno => aluno.turno === filter))
    if(!filter) setAlunosFiltrados(alunos)
  }


 function handleButtonSemFiltro(){
  setAlunosFiltrados(alunos);
 }

 function handleButtonKids(){
  setAlunosFiltrados(alunos.filter(aluno => aluno.turma === "Kids"));
 }

 function handleButtonTeens(){
  setAlunosFiltrados(alunos.filter(aluno => aluno.turma === "Teens"));
 }

  return (
    <>
    <div className="filtro">
    <h1 className="contagemAlunos">Alunos: {alunos.length}</h1>
      <DropdownButton name="Turno">
        <div>
          <a onClick={() => handleFilterTurno('')}>Turno</a>
          <a onClick={() => handleFilterTurno('manha')}>Manhã</a>
          <a onClick={() => handleFilterTurno('tarde')}>Tarde</a>
        </div>
      </DropdownButton> 

      <DropdownButton name="Turma">
        <div>
          <a onClick={handleButtonSemFiltro}>Turma</a>
          <a onClick={handleButtonKids}>Kids</a>
          <a onClick={handleButtonTeens}>Teens</a>
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
