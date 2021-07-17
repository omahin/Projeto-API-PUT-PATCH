const express = require("express")
const router = express.Router()

router.get("/", (_request, response)=>{
    response.status(200).json({
        "titulo": "Reprogramaflix",
        "version": "1.0.0",
        "mensagem": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3",
    })
})
module.exports = router