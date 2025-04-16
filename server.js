const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get("/users", (req, res) => { 
    res.redirect('/users.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});