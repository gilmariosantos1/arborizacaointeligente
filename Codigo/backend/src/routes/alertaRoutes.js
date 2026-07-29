import { Router } from 'express'
import { upload } from '../config/multerConfig.js'
import { criarAlerta, listarAlertas, atualizarStatusAlerta } from '../controllers/alertaController.js'

const router = Router()

router.post('/alertas', upload.single('imagem'), criarAlerta)
router.get('/alertas', listarAlertas)
router.patch('/alertas/:id/status', atualizarStatusAlerta)

export default router