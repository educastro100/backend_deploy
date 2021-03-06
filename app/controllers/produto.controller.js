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

// Remover um produto
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const id = req.params.id;

    Produto.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o Produto" })
        } else {
            res.send({ msg: "Produto atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o Produto" });
    });

};

// Remover um produto específico
exports.delete = (req, res) => {
    const id = req.params.id;
    Produto.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o Produto" })
        } else {
            res.send({ msg: "Produto deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o Produto" });
    });
};