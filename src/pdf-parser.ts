import Page from "./Page";
import PDF from "./PDF";
import fs from 'fs'
import path from 'path'

const PDFParser = require("pdf2json");

const uploadsPath = path.resolve(__dirname, '..', 'uploads')

const papers = [
    {
        area: 3999796,
        name: "4A0"
    },
    {
        area: 1999898,
        name: "2A0"
    },
    {
        area: 999949,
        name: "A0"
    },
    {
        area: 499554,
        name: "A1"
    },
    {
        area: 249480,
        name: "A2"
    },
    {
        area: 124740,
        name: "A3"
    },
    {
        area: 62370,
        name: "A4"
    },
    {
        area: 31080,
        name: "A5"
    },
    {
        area: 15540,
        name: "A6"
    },
    {
        area: 7770,
        name: "A7"
    },
    {
        area: 3848,
        name: "A8"
    },
    {
        area: 1924,
        name: "A9"
    },
    {
        area: 962,
        name: "A10"
    },
]

const maisProximo = (valores: number[], valor: number) => {
    const proximo = valores.reduce(function(anterior, corrente) {
        return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
    });

    return proximo
}

var maiorValorMaisProximo = function(a: string | any[], x: number) {
    var lo, hi;
    for (var i = a.length; i--;) {
        if (a[i] <= x && (lo === undefined || lo < a[i])) lo = a[i];
        if (a[i] >= x && (hi === undefined || hi > a[i])) hi = a[i];
    };
    return hi;
}


const pageSizeIdentifier = (width: number, height: number) => {
    const oldWidth = width;
    const oldHeigth = height

    var valores = [2378, 1682, 1189, 841, 594, 420, 297, 210, 148, 105, 74, 52, 37, 26]
    var areas = [3999796, 1999898, 999949, 499554, 249480, 124740, 62370, 31080, 15540, 7770, 3848, 1924, 962 ] 

    width = maisProximo(valores, width)
    height = maisProximo(valores, height);

    var area = width*height;

    var paper = papers.find(paper =>  paper.area == area)
    if(paper == undefined){
        area = oldHeigth*oldWidth
        paper = papers.find(paper => paper.area == maiorValorMaisProximo(areas, area));
    }
    return paper?.name
}

const groupSizes = (pages:Page[], keyGetter: (arg0: any) => any) => {
    const map = new Map();
    pages.forEach((page: any) => {
        const key = keyGetter(page);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [page]);
        }else {
            collection.push(page);
        }
    });
    return Object.fromEntries(map);
}

const countPages = async(array_arquivos: string[]) => {
    var pdf: PDF[] = []
    console.log(array_arquivos)
    const promisses = array_arquivos.map(file => {
        return new Promise((resolve, reject) => {
            var pdfParser = new PDFParser();

            let fileLocation = `${uploadsPath}/${file}`;
            console.log(fileLocation)
            pdfParser.loadPDF(fileLocation);

            pdfParser.on("pdfParser_dataError", (errData: { parserError: any; }) => {
                console.error(errData.parserError);
                reject(errData);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData: { Pages: any; }) => {
                var pagesResponse: Page[] = []
                const pages = pdfData.Pages
                pages.forEach((page: { Width: number; Height: number; }, index: number) => {
                    const width = (page.Width / 4.5) * 25.4; // pdf page width im mm
                    const height = (page.Height / 4.5) * 25.4 // pdf page height  im mm
                    pagesResponse.push(new Page(pageSizeIdentifier(width, height), index+1))
                });
                const groupedSizes = groupSizes(pagesResponse, page => page.size)
                pdf.push(new PDF(pagesResponse.length, pagesResponse, file, groupedSizes))
                fs.unlink(fileLocation, err => {console.log(err)})
                resolve(pdf)
            })
        })
    })
    await Promise.all(promisses)
    return pdf
}

export default countPages