const { json } = require("express");
const express = require("express")
const app = express();
const cep =[
  {
    "cep": "01001-001",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  }
]
const usuario=[
    {nome:"carlos", idade:"19", peso:"70"},
    {nome:"Pedro", idade:"30", peso:"100"},
    {nome:'Joao', idade:"40", peso:"60", cep:"77807060"},

]

app.use("/todos",(req, res, next)=>{res.send(usuario)})
app.use("/nome",(req, res, next)=>{res.send(usuario[1].nome)})
// // app.use("/cep/:valor",(req, res, next)=>{
// //   const valor=req.params.valor
//   res.send(valor)})
app.use("/soma",(req, res, next)=>{
    let total=0
    for(i=0; i<usuario.length; i++)
    {
      total=total+parseInt(usuario[i].idade)
    }

    res.send("Soma total: "+total);
})

app.use("/cep/:valor",(req, res, next)=>{
  const valor = req.params.valor
  const local = cep.filter(locais =>locais.cep === valor)

  res.send(local)
})
app.use("/viacep/:valor",(req, res, next)=>{
  const valor = req.params.valor

  
fetch("https://viacep.com.br/ws/"+valor+"/json/").then(resposta=>resposta.json()).then(data=>{
  const dados={
    cep:data.cep,
    logradouro:data.logradouro,
    localidade:data.localidade,
    ddd:data.ddd
  }
  res.send(dados)
})

})
app.use("/matricula/:id",(req, res, next)=>{
  const id = req.params.id
  const alunos=["ana silva","carlos oliveira","xiaolin matadordeporco","lula","aleglande de morais"]
const cursos=["Eletricista","Tecnico de Infórmatica","Eleitor do mito","Socorrista mirim","Psicólogo"]
const matricula = [
  {"idaluno":"2","idcurso":"2"},
  {"idaluno":"3","idcurso":"0"},
  {"idaluno":"4","idcurso":"3"},
  {"idaluno":"0","idcurso":"1"},
  {"idaluno":"1","idcurso":"4"}
 
 ]
const matriculado = matricula.filter(linha=>linha.idaluno==id)
  const nomecurso = cursos[matriculado[0].idcurso]
  const nome = alunos[id]
  function findByKey (key,value){
    return(item, i) => item[key] === value
  }
  let findParams = findByKey('idcurso',matriculado[0].idcurso)
  let index = matricula.findIndex(findParams)
  
  const resposta = {
    idaluno:id,
    nomedoaluno:nome,
    idmatricula:index,
    cursomatriculado:nomecurso,
    mensagem:"dados da matricula"
  }






res.send(resposta)
})
module.exports = app