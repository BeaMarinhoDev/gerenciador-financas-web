import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/cadastro.html');
});

export default router;