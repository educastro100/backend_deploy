const db = require("../models");
const Produto = db.produto;

// add novo produto
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar um produto

    console.log(req.body);

    if (!req.body.titulo || !req.body.descricao || !req.body.preco) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    } else {
        const produto = new Produto({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: req.body.preco
        });

        // Depois de criado o objeto, vamos salvá-lo no banco de dados.
        produto.save(produto).then(data => {
            // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB
            res.send(data)
        }).catch(err => {
            // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro
            res.status(500).send({
                msg: err.message
            });
        });
    }

}


// Retornar a lista de produtos
exports.findAll = (req, res) => {
    /* Condição vazia = seleciona todos itens */
    var condition = {};
    Produto.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de produtos" })
    });
}