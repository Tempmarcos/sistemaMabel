'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './page.module.css'
import { CreateAlunoRequestType, createAlunoRequestParse } from '@/http/parses/aluno'
import { axiosInstance } from '@/http/config/axiosConfig'
import { errorHandler } from '@/http/errorHandler'
import { useCallback, useEffect, useState } from 'react'
import { getTurmas } from '@/http/services/turmas/functions'
import { getPlanos } from '@/http/services/planos/functions'
import dayjs from 'dayjs'

type TurmaData = {
    id : string;
    nome : string;
  }

  type PlanoData = {
    id : string;
    nome : string;
    valor : string;
  }

  type AlunoType = Omit<Omit<Omit<Omit<CreateAlunoRequestType, 'turma'>, 'plano'>, 'nascimento'>, 'dataIngresso'> & {
    turma : any;
    plano : any;
    nascimento : any;
    dataIngresso : any;
  }
  

  interface UserProps {
    params: {
        id : string;
    }
  }

export default function Home({ params } : UserProps){
  const [turmas, setTurmas] = useState<TurmaData[]>([] as TurmaData[]);
  const [planos, setPlanos] = useState<PlanoData[]>([] as PlanoData[]);
  const [aluno, setAluno] = useState<AlunoType>({} as AlunoType);


    async function getAluno(alunoId : string){
        const resposta = await axiosInstance.get(`/alunos/${alunoId}`);
        return resposta.data;
    }

    const fetchAluno = useCallback(async () => {
        try {
            const aluno = await getAluno(params.id);
            // alert(aluno.nascimento);
            setAluno(aluno);
            reset({
                nome: aluno.nome,
                nascimento: dayjs(aluno.nascimento).format('YYYY-MM-DD'),
                serie: aluno.serie,
                escola: aluno.escola,
                nacionalidade: aluno.nacionalidade,
                religiao: aluno.religiao,
                turma: aluno.turma,
                plano: aluno.plano,
                dataIngresso: dayjs(aluno.dataIngresso).format('YYYY-MM-DD'),
                almoco: aluno.almoco,
                valor: aluno.valor,
                endereco: aluno.endereco,
                pai: aluno.pai,
                mae: aluno.mae,
                responsavel: aluno.responsavel,
                emergencia: aluno.emergencia,
                informacoes: aluno.informacoes,
                medicamentos: aluno.medicamentos,
                nomeAutorizado1: aluno.nomeAutorizado1,
                rgAutorizado1: aluno.rgAutorizado1,
                foneAutorizado1: aluno.foneAutorizado1,
                nomeAutorizado2: aluno.nomeAutorizado2,
                rgAutorizado2: aluno.rgAutorizado2,
                foneAutorizado2: aluno.foneAutorizado2,
                
            })
        } catch (error) {
            //errorHandler(error);
        }
    }, []);
    useEffect(() => {
        fetchAluno();
    }, [fetchAluno]);

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

    const fetchPlanos = useCallback(async () => {
        try {
            const data : PlanoData[] = await getPlanos();
            setPlanos(data);
        } catch (error) {
            console.error(error);
        } 
    }, []);
    useEffect(() => {
        fetchPlanos();
    }, [fetchPlanos]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AlunoType>()


    const onSubmit: SubmitHandler<AlunoType> = async (data) => {
        alert(JSON.stringify(data.nascimento, null, 2));
         data.dataIngresso = new Date(data.dataIngresso);
         data.nascimento = new Date(data.nascimento);
         data.valor = parseInt(data.valor.toString());

         data.turma = {id : data.turma};
         data.plano = {id : data.plano};

        // alert(typeof data.dataIngresso + typeof data.nascimento);
        
        try {
            const dadosParseados = createAlunoRequestParse(data);
        } catch (error) {
            console.log(error)
        }
        try {
            const resposta = await axiosInstance.post('/alunos', data);
        } catch (error) {
            errorHandler(error)
        } 
    }

    return (
        <main className={styles.main}>
            <a href="/alunos" className={styles.link}>Voltar aos alunos</a>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <section className='formSection'>
                    <h1>Editar aluno</h1>
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input id='nome' {...register("nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="nascimento">Nascimento:</label>
                        <input defaultValue={aluno.nascimento} id='nascimento' type='date' {...register('nascimento', {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="serie">Série:</label>
                        <input id='serie' {...register('serie', {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="escola">Escola:</label>
                        <input id='escola' {...register('escola', {required: true})} /> 
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
                        <select id="turma" defaultValue={aluno.turma} {...register('turma', {required : true})}>
                            {turmas.map(turma => {
                                 return <option value={turma.id}>{turma.nome}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="plano">Plano:</label>
                        <select id="plano" defaultValue={aluno.plano} {...register('plano', {required : true})}>
                            {planos.map(plano => {
                                 return <option value={plano.id}> {plano.nome} </option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dataIngresso">dataIngresso:</label>
                        <input id="dataIngresso" type='date' {...register('dataIngresso', {required : true})} />
                    </div>
                    <div>
                        <label htmlFor="almoco">Almoço:</label>
                        <input type="checkbox" id="almoco" {...register('almoco', {required : true})} />
                    </div>
                    <div>
                        <label htmlFor="valor">Valor:</label>
                        <input id="valor" type='number' {...register('valor', {required : true})} />
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
                    <div>
                        <label htmlFor="nomePai">Nome:</label>
                        <input id='nomePai' {...register("pai.nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="trabalhoPai">Trabalho:</label>
                        <input id='trabalhoPai' {...register("pai.trabalho")} /> 
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
                    <div>
                        <label htmlFor="nomeMae">Nome:</label>
                        <input id='nomeMae' {...register("mae.nome", {required: true})} /> 
                    </div> 
                    <div>
                        <label htmlFor="trabalhoMae">Trabalho:</label>
                        <input id='trabalhoMae' {...register("mae.trabalho")} /> 
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
                    <div>
                        <label htmlFor="nomeResponsavel">Nome:</label>
                        <input id='nomeResponsavel' {...register("responsavel.nome", {required: true})} /> 
                    </div>
                    <div>
                        <label htmlFor="RGresponsavel">RG:</label>
                        <input id='RGresponsavel'  {...register("responsavel.rg", {required: true})} /> 
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
                        <input id='foneResponsavel' placeholder='(99) 99999-9999' {...register("responsavel.fone_pessoal")} /> 
                    </div>
                    <div>
                        <label htmlFor="emailResponsavel">E-mail:</label>
                        <input id='emailResponsavel' type='email' {...register("responsavel.email")} /> 
                    </div>
                    <h3>Endereço</h3>
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
                    <div>
                        <label htmlFor="informacoes">Informacoes:</label>
                        <input id="informacoes" {...register('informacoes')} />
                    </div>
                    <div>
                        <label htmlFor="medicamentos">Medicamentos:</label>
                        <input id="medicamentos" {...register('medicamentos')} />
                    </div>
                    <h3>Info. Emergência</h3>
                    <div>
                        <label htmlFor="nomeEmergencia">Nome:</label>
                        <input id="nomeEmergencia" {...register('emergencia.nome', {required : true})} />
                        <h6>Nome do contato de emergência</h6>
                    </div>
                    <div>
                        <label htmlFor="foneEmergencia">Fone:</label>
                        <input placeholder='(99) 99999-9999' id='foneEmergencia' {...register("emergencia.fone")} /> 
                    </div>
                    <div>
                        <label htmlFor="localEmergencia">Local:</label>
                        <input id="localEmergencia" {...register('emergencia.local')} />
                    </div>
                    <div>
                        <label htmlFor="convenioEmergencia">Convênio:</label>
                        <input id="convenioEmergencia" {...register('emergencia.convenio')} />
                    </div>
                    <div>
                        <label htmlFor="nomeAutorizado">Nome do autorizado:</label>
                        <input id="nomeAutorizado" {...register('nomeAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="rgAutorizado">RG do autorizado:</label>
                        <input id="rgAutorizado"  {...register('rgAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="foneAutorizado">Fone do autorizado:</label>
                        <input id="foneAutorizado"  placeholder='(99) 99999-9999' {...register('foneAutorizado1')} />
                    </div>
                    <div>
                        <label htmlFor="nomeAutorizado2">Nome do autorizado 2:</label>
                        <input id="nomeAutorizado2" {...register('nomeAutorizado2')} />
                    </div>
                    <div>
                        <label htmlFor="rgAutorizado2">RG do autorizado 2:</label>
                        <input id="rgAutorizado2"  {...register('rgAutorizado2')} />
                    </div>
                    <div>
                        <label htmlFor="foneAutorizado2">Fone do autorizado 2:</label>
                        <input id="foneAutorizado2"  placeholder='(99) 99999-9999' {...register('foneAutorizado2')} />
                    </div>
                </section>
                <button type="submit">Editar aluno</button>
            </form>
         </main>
    )
}