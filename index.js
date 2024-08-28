const express = require('express');
const { status } = require('express/lib/response');
const app = express();
const PORT = 3000;

app.use(express.json()); //Vai usar o json que está na biblioteca express

let alunos = [
    {id: 1, nome: 'Felipe', cor: 'Amarelo', idade: 35, altura: 1.85},
    {id: 2, nome: 'Angelo', cor: 'Roxo', idade: 18, altura: 1.58}
]

app.get('/api/alunos', (req, res) => {
    res.json(alunos); //criando resposta no formato json
});

app.get('/api/alunos/getByName/:nome',(req,res) => {
    const { nome } = req.params; //dos parametros da requisição vai vir o nome
    const index = alunos.findIndex(a => a.nome === nome); // "a" representa todos os objetos dentro do bd alunos

    if (index > -1) {
        res.json(alunos[index]);
    } else {
        res.status(404).json({message: 'Aluno não encontrado'});
    }
    
});

app.post('/api/alunos',(req, res) => {
    const novoAluno = { id: alunos.length + 1, ...req.body }; //esses três pontos é um atalho pra pegar o body e inserir (não recomendado)
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

app.put('/api/alunos/:id',( req, res) => {
    const { id } = req.params;
    const alunoIndex = alunos.findIndex(a => a.id === Number(id));

    if (alunoIndex > -1){
        alunos[alunoIndex] = {id: id, ...req.body };
        res.json(alunos[alunoIndex]);
    } else {
        res.status(404).json({message: 'Aluno não encontrado'});
    }
});

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});

