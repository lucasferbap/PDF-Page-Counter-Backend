import express from 'express'
import multer from 'multer'
import countPages from './pdf-parser';
import cors from 'cors';


const app = express();
app.use(cors());


// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Indica o novo nome do arquivo:
        cb(null, `${file.originalname}`)
    }
});

const upload = multer({ storage });

app.get('/', async (request, response) => { 
    const res = await countPages()
    return response.status(200).send(res)
})

app.post('/', upload.array('file'), (request, response) => {    
    return response.status(201).send({ message: "Arquivo enviado com sucesso" })
})

app.listen(process.env.PORT || 3333)