const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3001;
const host = '0.0.0.0';

var listaDoces = [];

function cadastroDoceView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Doces</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Doces</h1>
                    <form method="POST" action="/cadastrarDoce" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" name="nome" required>
                        </div>
                        <div class="col-md-4">
                            <label for="tipo" class="form-label">Tipo</label>
                            <input type="text" class="form-control" id="tipo" name="tipo" required>
                        </div>
                        <div class="col-md-4">
                            <label for="peso" class="form-label">Peso (g)</label>
                            <input type="number" class="form-control" id="peso" name="peso" required>
                        </div>
                        <div class="col-md-4">
                            <label for="sabor" class="form-label">Sabor</label>
                            <input type="text" class="form-control" id="sabor" name="sabor" required>
                        </div>
                        <div class="col-md-4">
                            <label for="preco" class="form-label">Preço</label>
                            <input type="text" class="form-control" id="preco" name="preco" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function cadastrarDoce(req, resp) {
    const { nome, tipo, peso, sabor, preco } = req.body;
    const doce = { nome, tipo, peso, sabor, preco };
    listaDoces.push(doce);

    resp.write(`
        <html>
            <head>
                <title>Lista de Doces</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Sabor</th>
                            <th scope="col">Preço</th>
                        </tr>
                    </thead>
                    <tbody>`);
    for (let i = 0; i < listaDoces.length; i++) {
        resp.write(`
            <tr>
                <td>${listaDoces[i].nome}</td>
                <td>${listaDoces[i].tipo}</td>
                <td>${listaDoces[i].peso} g</td>
                <td>${listaDoces[i].sabor}</td>
                <td>${listaDoces[i].preco}</td>
            </tr>`);
    }
    resp.write(`</tbody>
                </table>
                <a class="btn btn-primary" href="/cadastrarDoce">Continuar Cadastrando</a>
                <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN6jIeHz" crossorigin="anonymous"></script>
            </html>`);
    resp.end();
}

app.get('/', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Doces</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarDoce">
                                    <button class="btn btn-primary">Cadastrar Doce</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="container mt-4">
                    <h2>Bem-vindo ao sistema de cadastro de doces!</h2>
                    <p>Use o botão acima para cadastrar um novo doce.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
});

app.get('/cadastrarDoce', cadastroDoceView);
app.post('/cadastrarDoce', cadastrarDoce);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});

                       
