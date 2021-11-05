import express from 'express'
import multer from 'multer'
import countPages from './pdf-parser';
import cors from 'cors';
import fs from 'fs'
import path from 'path'

const uploadsPath = path.resolve(__dirname, '..', 'uploads')
const app = express();
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
        const files = request.query.files as string
        const res = await countPages(JSON.parse(files))
        return response.status(200).send(res)
        
    } catch (error) {
        return response.status(200).send(error)      
    }
})

app.post('/', upload.array('file'), (request, response) => {
    const files: string[] = []
    const recivedFiles = request.files as unknown as File[]
    recivedFiles.forEach((file: any) => {
        files.push(file.filename)
    })
    return response.status(201).send({ 
        message: "Arquivo enviado com sucesso",
        files
    })
})

app.listen(process.env.PORT || 3333)