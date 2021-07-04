module.exports = app => {
    const produto = require("../controllers/produto.controller.js");

    var router = require("express").Router();

    // Insere novo produto
    router.post("/", produto.create);

    // Retorna todos produto
    router.get("/", produto.findAll);

    app.use('/api/produtos', router);
    };