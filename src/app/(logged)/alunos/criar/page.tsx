'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './page.module.css'
import { CreateAlunoRequestType, createAlunoRequestParse } from '@/http/parses/aluno'
import { axiosInstance } from '@/http/config/axiosConfig'
import { errorHandler } from '@/http/errorHandler'
import { useCallback, useEffect, useState } from 'react'
import { getTurmas } from '@/http/services/turmas/functions'
import { getPlanos } from '@/http/services/planos/functions'
import Alerta from '@/app/components/cards/Alerta/Alerta'
import { useRouter } from 'next/navigation'

type TurmaData = {
    id : string;
    nome : string;
  }

  type PlanoData = {
    id : string;
    nome : string;
    valor : string;
  }

  type PaiMaeData = {
    id : string;
    nome : string;
  }

  type ResponsavelData = {
    id : string;
    nome : string;
  }

  

  type AlunoType = Omit<Omit<CreateAlunoRequestType, 'turma'>, 'plano'> & {
    turma : any;
    plano : any;
    valorPlano : any;
  }
  

export default function Home(){
  const [turmas, setTurmas] = useState<TurmaData[]>([] as TurmaData[]);
  const [planos, setPlanos] = useState<PlanoData[]>([] as PlanoData[]);

  const [pais, setPais] = useState<PaiMaeData[]>([] as PaiMaeData[]);
  const [paisFiltrados, setPaisFiltrados] = useState(pais);
  const [maes, setMaes] = useState<PaiMaeData[]>([] as PaiMaeData[]);
  const [maesFiltradas, setmaesFiltradas] = useState(maes);
  const [responsaveis, setResponsaveis] = useState<ResponsavelData[]>([] as ResponsavelData[]);
  const [responsaveisFiltrados, setresponsaveisFiltrados] = useState(responsaveis);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [displaySelect, setDisplaySelect] = useState('none');
  const [displayAlerta, setDisplayAlerta] = useState('none');
  const [displayAlunoCriado, setDisplayAlunoCriado] = useState('none');
  const [displayErroCriar, setDisplayErroCriar] = useState('none');
  const navigate = useRouter();


    const fetchTurmas = useCallback(async () => {
        try {
            const data : TurmaData[] = await getTurmas();
            setTurmas(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchPlanos = useCallback(async () => {
        try {
            const data : PlanoData[] = await getPlanos();
            setPlanos(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        } 
    }, []);


    const fetchPais = useCallback(async () => {
        try {
            const data = await axiosInstance.get('/pais');
            setPais(data.data);
            setPaisFiltrados(pais);
            // alert(JSON.stringify(data, null, 2));
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchMaes = useCallback(async () => {
        try {
            const data = await axiosInstance.get('/maes');
            setMaes(data.data);
            setmaesFiltradas(maes);
            // alert(JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchResponsaveis = useCallback(async () => {
        try {
            const data = await axiosInstance.get('/responsaveis');
            setResponsaveis(data.data);
            // setresponsaveisFiltrados(responsaveis);
            // alert(JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        fetchTurmas();
        fetchPlanos();
        fetchResponsaveis();
        fetchMaes();
        fetchPais();
    }, [fetchResponsaveis, fetchMaes, fetchPais, fetchTurmas, fetchPlanos]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AlunoType>()

    function displayPaiMaeResponsavel(){
        if(pais.length > 0 && maes.length > 0 && responsaveis.length > 0) {
            if(displaySelect === 'none') {
            setDisplaySelect('flex');
        }
        }

    }

     displayPaiMaeResponsavel();


    function hasPai(){
            return (
                <div style={{display: displaySelect}}>
                    <label htmlFor="escolherPai">Importar informações do pai:</label>
                        <select  id="escolherPai" {...register('pai.id', {
                            onChange : e => handleEscolherPai(e)
                        })}>
                        {/* <input type="text" placeholder="Pesquisar..." id="searchBar" onChange={filtrarPais} /> */}
                        <option value=""></option>
                            {pais.map(pai => {
                                 return <option key={pai.id} value={pai.id}>{pai.nome}</option>
                            })}
                        </select>
                </div>
            ) 
    }

    // function filtrarPais(event: { target: { value: any; }; }){
    //     setPaisFiltrados(pais.filter(pai => pai.nome.toLowerCase().includes(event.target.value)))
    //   }

    async function handleEscolherPai(event : any){
        let id = event?.target.value;
        if(!id){
            reset ({
                pai: {nome: '', fone: '', funcao: '', email: '', trabalho: ''}
            })
        } else {
            const resposta = await axiosInstance.get(`/pais/${id}`);
            reset ({
                pai: resposta.data
            })
        }
    }

    function hasMae(){
            return (
                <div style={{display: displaySelect}}>
                    <label htmlFor="escolherMae">Importar informações da Mãe:</label>
                        <select id="escolherMae" {...register('mae.id', {
                            onChange : e => handleEscolherMae(e)
                        })}>
                        <option value=""></option>
                            {maes.map(mae => {
                                 return <option key={mae.id} value={mae.id}>{mae.nome}</option>
                            })}
                        </select>
                </div>
            )
        }

    async function handleEscolherMae(event : any){
        let id = event?.target.value;
        if(!id){
            reset ({
                mae: {nome: '', fone: '', funcao: '', email: '', trabalho: ''}
            })
        } else {
            const resposta = await axiosInstance.get(`/maes/${id}`);
            reset ({
                mae: resposta.data
            })
        }
    }

    function hasResponsavel(){
        return (
            <div style={{display: displaySelect}}>
                <label htmlFor="escolherResponsavel">Importar info. do Responsável:</label>
                     <select id="escolherResponsavel" {...register('responsavel.id', {
                            onChange : e => handleEscolherResponsavel(e)
                        })}>
                     <option value=""></option>
                        {responsaveis.map(responsavel => {
                            return <option key={responsavel.id} value={responsavel.id}>{responsavel.nome}</option>
                        })}
                    </select>
            </div>
        )
    }

    async function handleEscolherResponsavel(event : any){
        let id = event?.target.value;
        if(!id){
            // alert('oi')
            reset ({
                responsavel: {nome: '', rg: '', cpf: '', fone_pessoal: '', fone_trabalho: '', funcao: '', email: '', trabalho: ''}
            })
        } else{
            const resposta = await axiosInstance.get(`/responsaveis/${id}`);
            reset ({
                responsavel: resposta.data
            })
            // alert(JSON.stringify(resposta.data, null, 2))
        }
    }

    let valorPlanoEscolhido;

    function handleEscolherPlano(event : any){
        let id = event?.target.value;
        if(!id){
            reset ({valorPlano: ''});
            return
        }
        let planoEscolhido = planos.find(plano => plano.id === id);
        valorPlanoEscolhido = planoEscolhido?.valor;
        reset ({valorPlano: valorPlanoEscolhido})
        //alert(valorPlanoEscolhido);
    }

    const enderecoAluno = watch("endereco");

    const copiarEndereco = () => {
        setValue("responsavel.endereco", enderecoAluno);
      };


    const dadosMae = watch("mae");
    const dadosPai = watch("pai");
    const nomeAluno = watch('nome');
    const valorPlano = watch('valorPlano')

    const copiarDadosMae = () => {
        setValue("responsavel.nome", dadosMae.nome);
        setValue("responsavel.rg", '');
        setValue("responsavel.cpf", '');
        setValue("responsavel.fone_trabalho", '');
        setValue("responsavel.fone_pessoal", dadosMae.fone);
        setValue("responsavel.email", dadosMae.email);
        setValue("responsavel.trabalho", dadosMae.trabalho);
        setValue("responsavel.funcao", dadosMae.funcao);
      };

      const copiarDadosPai = () => {
        setValue("responsavel.nome", dadosPai.nome);
        setValue("responsavel.rg", '');
        setValue("responsavel.cpf", '');
        setValue("responsavel.fone_pessoal", dadosPai.fone);
        setValue("responsavel.fone_trabalho", '');
        setValue("responsavel.email", dadosPai.email);
        setValue("responsavel.trabalho", dadosPai.trabalho);
        setValue("responsavel.funcao", dadosPai.funcao);
      };
    

    const onSubmit: SubmitHandler<AlunoType> = async (data) => {
        chamarModal();
        data.dataIngresso = new Date(data.dataIngresso);
        data.nascimento = new Date(data.nascimento);
        data.valor = parseInt(data.valor.toString());
        data.turma = {id : data.turma};
        data.plano = {id : data.plano};
        console.log(data);
        setSubmittedData(data);
    }

    function chamarModal(){
        setDisplayAlerta('flex');
    }

    function botaoNao(){
        setDisplayAlerta('none');
    }

    async function botaoSim(data : any){
        // alert(JSON.stringify(data, null, 2));
        // alert(typeof data.dataIngresso + typeof data.nascimento);
        try {
        const dadosParseados = createAlunoRequestParse(data);
        } catch (error) {
        console.log(error)
        }
        try {
        const resposta = await axiosInstance.post('/alunos', data);
        setDisplayAlunoCriado('flex');
        } catch (error) {
            setDisplayErroCriar('flex');
            errorHandler(error)
        } finally {
            setDisplayAlerta('none');
        }
    }

    function botaoOkCriar(){
        navigate.push('/alunos');
    }

    function botaoOkErro(){
        setDisplayErroCriar('none');
    }

    return (
        <main className={styles.main}>
            <Alerta texto={`Tem certeza que deseja criar o aluno ${nomeAluno}?`} confirmacao={true} 
            display={displayAlerta} botaoNao={botaoNao} botaoSim={() => botaoSim(submittedData)}></Alerta>
            <Alerta display={displayAlunoCriado} texto='Aluno criado com sucesso!' 
            confirmacao={false} botaoOk={botaoOkCriar}></Alerta>
            <Alerta display={displayErroCriar} texto='Houve um erro ao criar o aluno :(' 
            confirmacao={false} botaoOk={botaoOkErro}></Alerta>
            <a href="/alunos" className={styles.link}>Voltar aos alunos</a>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <section className='formSection'>
                    <h1>Criar aluno</h1>
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input id='nome' {...register("nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="nascimento">Nascimento:</label>
                        <input id='nascimento' type='date' {...register('nascimento', {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="serie">Série:</label>
                        <input id='serie' {...register('serie')} /> 
                    </div>
                    <div>
                        <label htmlFor="escola">Escola:</label>
                        <input id='escola' {...register('escola')} /> 
                    </div>
                    <div>
                        <label htmlFor="nacionalidade">Nacionalidade:</label>
                        <input id='nacionalidade' {...register('nacionalidade')} /> 
                    </div>
                    <div>
                        <label htmlFor="religiao">Religião:</label>
                        <input id='religiao' {...register('religiao')} /> 
                    </div>
                    <div>
                        <label htmlFor="turma">Turma:</label>
                        <select id="turma" {...register('turma', {required : true})}>
                            <option value=""></option>
                            {turmas.map(turma => {
                                 return <option key={turma.id} value={turma.id}>{turma.nome}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dataIngresso">Data de ingresso:</label>
                        <input id="dataIngresso" type='date' {...register('dataIngresso', {required : true})} />
                    </div>
                    <div>
                        <label htmlFor="plano">Plano:</label>
                        <select id="plano" {...register('plano', {required : true ,
                            onChange : e => handleEscolherPlano(e)
                        })}>
                            <option value=""></option>
                            {planos.map(plano => {
                                 return <option key={plano.id} value={plano.id}> {plano.nome} </option>
                            })}
                        </select>
                    </div>
                    <div style={{display: 'none'}}>
                        <label htmlFor="almoco">Almoço:</label>
                        <input type="checkbox" id="almoco" {...register('almoco')} />
                    </div>
                    <div>
                        <label htmlFor="valor">Valor do plano:</label>
                        <input id="valor" defaultValue={valorPlano} type='number' readOnly />
                    </div>
                    <div>
                        <label htmlFor="valorFinal">Valor final:</label>
                        <input defaultValue={valorPlano} id="valorFinal" type='number' {...register('valor', {required : true})} />
                    </div>
                    <h3>Endereço</h3>
                        <div>
                            <label htmlFor="CEP">CEP:</label>
                            <input id='CEP' {...register("endereco.cep", {required: true})} /> 
                        </div>
                        <div>
                            <label htmlFor="estado">Estado:</label>
                            <input id='estado' {...register("endereco.estado", {required: true})} /> 
                        </div>
                        <div>
                            <label htmlFor="cidade">Cidade:</label>
                            <input id='cidade' {...register("endereco.cidade", {required: true})} /> 
                        </div>
                        <div>
                            <label htmlFor="logradouro">Logradouro:</label>
                            <input id='logradouro' {...register("endereco.logradouro", {required: true})} /> 
                        </div>
                        <div>
                            <label htmlFor="numero">Número:</label>
                            <input id='numero' {...register("endereco.numero", {required: true})} /> 
                        </div>
                        <div>
                            <label htmlFor="complemento">Complemento:</label>
                            <input id='complemento' {...register("endereco.complemento")} /> 
                        </div>
                    
                </section>
                <section className='formSection'>
                    <h2>Informações do pai:</h2>
                    {hasPai()}
                    <div>
                        <label htmlFor="nomePai">Nome:</label>
                        <input id='nomePai' {...register("pai.nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="trabalhoPai">Trabalho:</label>
                        <input id='trabalhoPai' {...register("pai.trabalho")} /> 
                        <h6>Local do trabalho</h6>
                    </div> 
                    <div>
                        <label htmlFor="funcaoPai">Função:</label>
                        <input id='funcaoPai' {...register("pai.funcao")} /> 
                    </div>
                    <div>
                        <label htmlFor="fonePai">Fone:</label>
                        <input placeholder='(99) 99999-9999' id='fonePai' {...register("pai.fone")} /> 
                    </div>
                    <div>
                        <label htmlFor="emailPai">E-mail:</label>
                        <input type='email' id='emailPai' {...register("pai.email")} /> 
                    </div>
                </section>
                <section className="formSection">
                <h2>Informações da mãe:</h2>
                    {hasMae()}
                    <div>
                        <label htmlFor="nomeMae">Nome:</label>
                        <input id='nomeMae' {...register("mae.nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="trabalhoMae">Trabalho:</label>
                        <input id='trabalhoMae' {...register("mae.trabalho")} /> 
                        <h6>Local do trabalho</h6>
                    </div> 
                    <div>
                        <label htmlFor="funcaoMae">Função:</label>
                        <input id='funcaoMae' {...register("mae.funcao")} /> 
                    </div>
                    <div>
                        <label htmlFor="foneMae">Fone:</label>
                        <input placeholder='(99) 99999-9999' id='foneMae' {...register("mae.fone")} /> 
                    </div>
                    <div>
                        <label htmlFor="emailMae">E-mail:</label>
                        <input type='email' id='emailMae' {...register("mae.email")} /> 
                    </div>  
                </section>
                <section className="formSection">
                    <h2>Responsável financeiro:</h2>
                    <a className={styles.botao} onClick={copiarDadosMae}>Copiar dados da mãe</a>
                    <a className={styles.botao} onClick={copiarDadosPai}>Copiar dados do pai</a>
                    {hasResponsavel()}
                    <div>
                        <label htmlFor="nomeResponsavel">Nome:</label>
                        <input id='nomeResponsavel' {...register("responsavel.nome", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="RGresponsavel">RG:</label>
                        <input id='RGresponsavel' {...register("responsavel.rg", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="CPFresponsavel">CPF:</label>
                        <input id='CPFresponsavel' {...register("responsavel.cpf", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="trabalhoResponsavel">Trabalho:</label>
                        <input id='trabalhoResponsavel' {...register("responsavel.trabalho")} /> 
                    </div>
                    <div>
                        <label htmlFor="funcaoResponsavel">Função:</label>
                        <input id='funcaoResponsavel' {...register("responsavel.funcao")} /> 
                    </div>
                    <div>
                        <label htmlFor="foneTrabalhoResponsavel">Fone trabalho:</label>
                        <input id='foneTrabalhoResponsavel' placeholder='(99) 99999-9999' {...register("responsavel.fone_trabalho")} /> 
                    </div>
                    <div>
                        <label htmlFor="foneResponsavel">Fone pessoal:</label>
                        <input id='foneResponsavel'  placeholder='(99) 99999-9999' {...register("responsavel.fone_pessoal")} /> 
                    </div>
                    <div>
                        <label htmlFor="emailResponsavel">E-mail:</label>
                        <input id='emailResponsavel' type='email' {...register("responsavel.email")} /> 
                    </div>
                    <h3>Endereço</h3>
                    <a className={styles.botao} onClick={copiarEndereco}>Copiar endereço do aluno</a>
                    <div>
                        <label htmlFor="CEPenderecoResponsavel">CEP:</label>
                        <input id='CEPenderecoResponsavel' {...register("responsavel.endereco.cep", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="estadoEnderecoResponsavel">Estado:</label>
                        <input id='estadoEnderecoResponsavel' {...register("responsavel.endereco.estado", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="cidadeEnderecoResponsavel">Cidade:</label>
                        <input id='cidadeEnderecoResponsavel' {...register("responsavel.endereco.cidade", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="logradouroEnderecoResponsavel">Logradouro:</label>
                        <input id='logradouroEnderecoResponsavel' {...register("responsavel.endereco.logradouro", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="numeroEnderecoResponsavel">Número:</label>
                        <input id='numeroEnderecoResponsavel' {...register("responsavel.endereco.numero", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="complementoEnderecoResponsavel">Complemento:</label>
                        <input id='complementoEnderecoResponsavel' {...register("responsavel.endereco.complemento")} /> 
                    </div>
                </section>
                <section className="formSection">
                    <h3>Info. Emergência</h3>
                    <div>
                        <label htmlFor="informacoes">Informações:</label>
                        <input id="informacoes" {...register('informacoes')} />
                        <h6>Informações julgadas necessárias</h6>
                    </div>
                    <div>
                        <label htmlFor="medicamentos">Medicamentos:</label>
                        <input id="medicamentos" {...register('medicamentos')} />
                        <h6>(Acompanhados de prescrição médica)</h6>
                    </div>
                    <h4>Contato emergência</h4>
                    <div>
                        <label htmlFor="nomeEmergencia">Nome:</label>
                        <input id="nomeEmergencia" {...register('emergencia.nome', {required : true})} />
                        <h6>Nome do contato de emergência</h6>
                    </div>
                    <div>
                        <label htmlFor="foneEmergencia">Fone:</label>
                        <input placeholder='(99) 99999-9999' id='foneEmergencia' {...register("emergencia.fone")} /> 
                        <h6>Fone do contato de emergência</h6>
                    </div>
                    <div>
                        <label htmlFor="localEmergencia">Local:</label>
                        <input id="localEmergencia" {...register('emergencia.local')} />
                        <h6>Em caso de emergência, levar para:</h6>
                    </div>
                    <div>
                        <label htmlFor="convenioEmergencia">Convênio:</label>
                        <input id="convenioEmergencia" {...register('emergencia.convenio')} />
                    </div>
                    <h4>Pessoas autorizadas a retirar <br /> a criança (além dos pais)</h4>
                    <div>
                        <label htmlFor="nomeAutorizado">Nome do autorizado:</label>
                        <input id="nomeAutorizado" {...register('nomeAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="rgAutorizado">RG do autorizado:</label>
                        <input id="rgAutorizado" {...register('rgAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="foneAutorizado">Fone do autorizado:</label>
                        <input id="foneAutorizado" placeholder='(99) 99999-9999' {...register('foneAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="nomeAutorizado2">Nome do autorizado 2:</label>
                        <input id="nomeAutorizado2" {...register('nomeAutorizado2')} />
                    </div>
                    <div>
                        <label htmlFor="rgAutorizado2">RG do autorizado 2:</label>
                        <input id="rgAutorizado2" {...register('rgAutorizado2')} />
                    </div>
                    <div>
                        <label htmlFor="foneAutorizado2">Fone do autorizado 2:</label>
                        <input id="foneAutorizado2" placeholder='(99) 99999-9999' {...register('foneAutorizado2')} />
                    </div>
                </section>
                <button type="submit" disabled={isSubmitting}>Criar aluno</button>
            </form>
         </main>
    )
}