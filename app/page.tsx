'use client';

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios';

export default function Home() {

  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(<li style={{display: "none"}}></li>);
  const [autores, setAutores] = useState([]);
  const [ultimoCursoMatriculado, setUltimoCursoMatriculado] = useState(<li style={{display: "none"}}></li>);
  const [msgError, setMsgError] = useState();


  async function getAlunos() {
    try {
      const response = await axios.get("http://localhost:3000/alunos", { headers: { "Access-Control-Allow-Origin": "*" } });
      const lisAlunos = response.data.map((x: any) => <li key={x.id}>{JSON.stringify(x)}</li>)
      setAlunos(lisAlunos);
    }
    catch {
      setAlunos([]);
    }
  }

  async function getCursos() {
    try {
      const response = await axios.get("http://localhost:3000/cursos", { headers: { "Access-Control-Allow-Origin": "*" } });
      const lisCursos = response.data.map((x: any) => <li key={x.id}>{JSON.stringify(x)}</li>)
      setCursos(lisCursos);
    }
    catch {
      setCursos([]);
    }
  }

  async function getCurso() {
    try {
      const response = await axios.get("http://localhost:3000/cursos/"+(document.querySelector('#cursoById') as HTMLInputElement)?.value, { headers: { "Access-Control-Allow-Origin": "*" } });
      const liCurso = <li key={response.data.id}>{JSON.stringify(response.data)}</li>
      setCurso(liCurso);
    }
    catch {
      setCurso(<li style={{display: "none"}}></li>);
    }
  }

  async function getAutores() {
    try {
      const response = await axios.get("http://localhost:3000/autores", { headers: { "Access-Control-Allow-Origin": "*" } });
      const lisAutores = response.data.map((x: any) => <li key={x.id}>{JSON.stringify(x)}</li>)
      setAutores(lisAutores);
    }
    catch {
      setAutores([]);
    }
  }

  async function postAluno() {
    let data: Object = {
      "nome": (document.querySelector('#alunoNome') as HTMLInputElement)?.value,
      "email": (document.querySelector('#alunoEmail') as HTMLInputElement)?.value,
      "idade": (document.querySelector('#alunoIdade') as HTMLInputElement)?.value,
    }

    try {
      await axios.post("http://localhost:3000/alunos", data, { headers: { "Access-Control-Allow-Origin": "*" } });
      getAlunos();
    }
    catch (e: any) {
      setMsgError(e.response.data.message);
    }
  }

  async function postAutor() {
    let data: Object = {
      "nome": (document.querySelector('#autorNome') as HTMLInputElement)?.value,
      "email": (document.querySelector('#autorEmail') as HTMLInputElement)?.value,
      "idade": (document.querySelector('#autorIdade') as HTMLInputElement)?.value,
    }

    try {
      await axios.post("http://localhost:3000/autores", data, { headers: { "Access-Control-Allow-Origin": "*" } });
      getAutores();
    }
    catch (e: any) {
      setMsgError(e.response.data.message);
    }
  }

  async function postCurso() {
    let data: Object = {
      "nome": (document.querySelector('#cursoNome') as HTMLInputElement)?.value,
      "descricao": (document.querySelector('#cursoDescricao') as HTMLInputElement)?.value,
      "cargaHoraria": (document.querySelector('#cursoCargaHoraria') as HTMLInputElement)?.value,
      "autorId": (document.querySelector('#autorId') as HTMLInputElement)?.value,
    }

    try {
      await axios.post("http://localhost:3000/cursos", data, { headers: { "Access-Control-Allow-Origin": "*" } });
      getCursos();
    }
    catch (e: any) {
      setMsgError(e.response.data.message);
    }
  }

  async function matricularAluno() {
    let data: any = {
      cursoId: (document.querySelector('#cursoId') as HTMLInputElement)?.value,
      alunoId: (document.querySelector('#alunoId') as HTMLInputElement)?.value,
    }

    try {
      const response = await axios.post("http://localhost:3000/cursos/"+data.cursoId+"/matricular/"+data.alunoId, {}, { headers: { "Access-Control-Allow-Origin": "*" } });
      setUltimoCursoMatriculado( <li>{JSON.stringify(response.statusText)}</li> )
    }
    catch (e: any) {
      setMsgError(e.response.data.message);
    }
  }

  useEffect(() => {
    getAlunos();
    getCursos();
    getAutores();
  }, []);

  return (
    <main className={styles.main}>
      {msgError}
      <br></br>
      <br></br>
      <br></br>
      <div>
        <input id='alunoNome' placeholder='Nome' type='text'></input>
        <input id='alunoEmail' placeholder='Email' type='text'></input>
        <input id='alunoIdade' placeholder='Idade' type='number'></input>
        <button onClick={postAluno}> Cadastrar aluno</button>

        <ul>
          {alunos}
        </ul>

        <hr></hr>

        <input id='autorNome' placeholder='Nome' type='text'></input>
        <input id='autorEmail' placeholder='Email' type='text'></input>
        <input id='autorIdade' placeholder='Idade' type='text'></input>
        <button onClick={postAutor}> Cadastrar autor</button>

        <ul>
          {autores}
        </ul>

        <hr></hr>

        <input id='cursoNome' placeholder='Nome' type='text'></input>
        <input id='cursoDescricao' placeholder='Descricao' type='text'></input>
        <input id='cursoCargaHoraria' placeholder='Carga Horária' type='number'></input>
        <input id='autorId' placeholder='Id do autor' type='text'></input>
        <button onClick={postCurso}> Cadastrar curso</button>

        <ul>
          {cursos}
        </ul>

        <hr></hr>

        <input id='cursoId' placeholder='Id do Curso' type='text'></input>
        <input id='alunoId' placeholder='Id do Aluno' type='text'></input>
        <button onClick={matricularAluno}> Matricular Aluno</button>

        <ul>
          {ultimoCursoMatriculado}
        </ul>

        <hr></hr>

        <input id='cursoById' placeholder='Id do Curso' type='text'></input>
        <button onClick={getCurso}> Encontar Curso</button>

        <ul>
          {curso}
        </ul>

        <hr></hr>


      </div>
    </main>
  )
}
