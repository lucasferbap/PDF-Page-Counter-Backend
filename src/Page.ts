export default class Page{
    size: string | undefined
    pageNumber: number
    constructor(size: string|undefined, pageNumber: number){
        this.size = size
        this.pageNumber = pageNumber
    }
}