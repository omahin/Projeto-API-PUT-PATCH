const tarefasJson = require("../models/tarefas.json");
// const fs = require("fs");

const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).send(novaTarefa)

}

const deleteTask = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

};

const replaceTask = (req, res) => {
    let requestedId = req.params.id;
    let postFromBody = req.body;

    let filteredTask = tarefasJson.find(tarefa => tarefa.id == requestedId);

    let updateTask = {
        id: filteredTask.id,
        dataInclusao: filteredTask.dataInclusao,
        concluido: filteredTask.concluido,
        descricao: filteredTask.descricao,
        nomeColaborador: filteredTask.Colaborador
     };

     const indice = tarefasJson.indexOf(filteredTask);
     tarefasJson.splice(indice, 1, updateTask);

     res.status(200).send({
         "mensagem": "Task substuida com sucesso!",
         updateTask
     });
};

const updateTask = (req, res) => {
    let requestedId = req.params.id;
    let newTask = req.body.task;

    let filteredTask = tarefasJson.find(tarefa => tarefa.id == requestedId);

    filteredTask.task = newTask;

    res.status(200).send({
        "mensagem": "Task adicionada com sucesso!",
        filteredTask
    });
};

const updateAll = (req, res) => {
    let requestedId = req.params.id;
    let filteredTask = tarefasJson.find(tarefa => tarefa.id == requestedId);
    let updateTask = req.body;

    let keyList = Object.keys(updateTask);

    keyList.forEach((key) => {
        filteredTask[key] = updateTask[key];
    });

    res.status(200).send({
        "message": "Task atualizada com sucesso!",
        filteredTask
    });
};


module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask,
    updateTask,
    updateAll
}