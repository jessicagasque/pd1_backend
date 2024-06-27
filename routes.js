import { Router } from "express"

import { mentorCreate, mentorIndex, mentorAlteraSenha } from "./controllers/mentorController.js"
import { loginMentor } from "./controllers/logmentorController.js"

const router = Router()

router.get('/mentores', mentorIndex)
      .post('/mentores', mentorCreate)
      .put('/usuarios', mentorAlteraSenha)

router.get('/login', loginMentor)




export default router