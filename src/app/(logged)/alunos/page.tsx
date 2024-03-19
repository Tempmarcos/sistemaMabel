'use client'
import AlunoCard from "../../components/cards/AlunoCard/AlunoCard";
import CriarAlunoForm from "../../components/forms/CriarAlunoForm/CriarAlunoForm";
import {useState} from "react";
import DropdownButton from "../../components/botoes/dropdownButton/dropdownButton";
import { alunos } from "@/mocks/alunos";
import { turmas } from "@/mocks/turmas";
import BtnAdicionar from '../../components/botoes/BtnAdicionar/BtnAdicionar';
import Header from "@/app/components/header/Header";
import Modal from "@/app/components/cards/Modal/Modal";




export default function Home() {
  const [displayModal, setDisplayModal] = useState("none");

  const [displayLegenda, setDisplayLegenda] = useState("none")
  const [textoLegenda, setTextoLegenda] = useState('Legendas ↓');

  const [alunosFiltrados, setAlunosFiltrados] = useState(alunos);
  
  const corElemento = 'yellow';
  const corTexto = "black";
  const corFundo = "gold";

  //#04AA6D

  //Função pra abrir o modal.
  function handleOpenModal() {
    setDisplayModal("block");
  }

  //Função para pegar as informações de um aluno específico.
  function handleGetAluno(id : number) {
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

  /*
  function handleFiltroTurma(turma : string){
    if(turma == '') setAlunosFiltrados(alunos); 
    else setAlunosFiltrados(alunos.filter(aluno => aluno.turma === turma))
  }*/

  //Função para a filtragem do turno e da turma
  function handleFiltro(atributo : string){
    if(atributo == '') setAlunosFiltrados(alunos); 
    else setAlunosFiltrados(alunos.filter(aluno => aluno.turno === atributo || aluno.turma === atributo))
  }

//Função para pesquisar o nome dos alunos
  function SearchFilter(event: { target: { value: any; }; }){
    setAlunosFiltrados(alunos.filter(aluno => aluno.nome.toLowerCase().includes(event.target.value)))
  }


  return (
    <main style={{backgroundColor: corFundo, color: corTexto, minHeight: '100vh'}}>
      <Header>
        <h2 className="contagemAlunos">Alunos: {alunosFiltrados.length}</h2>

        <DropdownButton name="Turno" corElemento={corElemento} corTexto={corTexto}>
          <div>
            <a onClick={() => handleFiltro('')}>Turno</a>
            <a onClick={() => handleFiltro('manha')}>Manhã</a>
            <a onClick={() => handleFiltro('tarde')}>Tarde</a>
          </div>
        </DropdownButton> 

        <DropdownButton name="Turma" corElemento={corElemento} corTexto={corTexto}>
          <div>
          <input type="text" placeholder="Pesquisar turmas..." onChange={SearchFilter}/>
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
      </div>
      <div className="listaAlunos">
        {
          alunosFiltrados.map(aluno => {
          return <a key={aluno.id} className="linkAlunos" onClick={() => handleGetAluno(aluno.id)}>
                    <AlunoCard id={aluno.id} nome={aluno.nome} turma={aluno.turma} turno={aluno.turno} />
                 </a>
          })
        }
     </div>
      <Modal onClick={handleXDisplay} display={displayModal}> <CriarAlunoForm/> </Modal>
          
          
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
