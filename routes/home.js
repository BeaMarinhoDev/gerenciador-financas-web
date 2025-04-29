import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/home.html');
});

export default router;