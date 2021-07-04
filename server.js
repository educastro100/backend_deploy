const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// Seta as configurações do CORS.
var corsOptions = {
    origin: "*"
};

// Ativa a configuração CORS
app.use(cors(corsOptions));

// Parseia requisições do tipo JSON - application/json
app.use(bodyParser.json());

// Parseia também requisições do tipo HTML -
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Uma rota que responde um JSON simples
app.get("/", (req, res) => {
    res.json({ msg: "Está funcionando!" });
});

// "Executa" o servidor, escutando em uma porta específica.
const PORT = process.env.PORT || 8040;
app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}.`)
        ;
});


// Depois 

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado ao banco de dados");
    })
    .catch(err => {
        console.log("Não foi possível conectar ao banco de dados", err);
        process.exit();
    });
require("./app/routes/produto.routes")(app);