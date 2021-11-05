import PDF from "./PDF";

export default class ContadorGeral{
    pdfs: PDF[] = [];
    total_docs = 0; // foi
    total_pages = 0; // foi
    pages_less_than_A4 = 0 //foi
    pages_A4 = 0;
    pages_A3 = 0;
    pages_A2 = 0;
    pages_A1 = 0;
    pages_A0 = 0;
    pages_greater_then_A0 = 0;

    constructor(){
        
    }

    assingPDF(pdf: PDF){
        this.pdfs.push(pdf) 
        this.total_docs += 1
        this.total_pages += pdf.totalPages
        Object.keys(pdf.groupedPages).map(key => {
            if(key == 'A5' || key == 'A6' || key == 'A7' || key == 'A8' || key == 'A9' || key == 'A10'){
                this.pages_less_than_A4 += pdf.groupedPages[key].length
            }
            if(key == 'A4'){ this.pages_A4 += pdf.groupedPages[key].length}
            if(key == 'A3'){ this.pages_A3 += pdf.groupedPages[key].length}
            if(key == 'A2'){ this.pages_A2 += pdf.groupedPages[key].length}
            if(key == 'A1'){ this.pages_A1 += pdf.groupedPages[key].length}
            if(key == 'A0'){ this.pages_A0 += pdf.groupedPages[key].length}
            if(key == '4A0' || key == '2A0'){
                this.pages_greater_then_A0 += pdf.groupedPages[key].length
            }

        })
    }
}