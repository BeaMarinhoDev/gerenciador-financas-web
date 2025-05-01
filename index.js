import { Router } from 'express';
const router = Router();

// Importação das rotas
router.get('/', redirectTo('index.html'));
router.get('/home', redirectTo('home.html'));
router.get('/users', redirectTo('users.html'));
router.get('/register', redirectTo('cadastro.html'));

function redirectTo(page) {
    return (req, res, next) => {
        try {
            res.redirect(`/${page}`);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    };
}

export default router;