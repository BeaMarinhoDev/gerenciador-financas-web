import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/users.html');
});

export default router;