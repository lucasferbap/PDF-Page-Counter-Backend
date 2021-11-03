import express from 'express'
import multer from 'multer'
import countPages from './pdf-parser';
import cors from 'cors';
import fs from 'fs'
import path from 'path'

const uploadsPath = path.resolve(__dirname, '..', 'uploads')

const app = express();
app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
});
app.use(cors());


// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadsPath)){
            fs.mkdirSync(uploadsPath)
        }
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Indica o novo nome do arquivo:
        cb(null, `${file.originalname}`)
    }
});

const upload = multer({ storage });

app.get('/', async (request, response) => { 
    try {
        const res = await countPages()
        return response.status(200).send(res)
        
    } catch (error) {
        return response.status(200).send(error)      
    }
})

app.post('/', upload.array('file'), (request, response) => {    
    return response.status(201).send({ message: "Arquivo enviado com sucesso" })
})

app.listen(process.env.PORT || 3333)