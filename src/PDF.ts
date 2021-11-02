import Page from "./Page";

export default class PDF{
    totalPages!: number;
    pages!: Page[];
    name!: string;
    groupedPages!: any

    constructor(totalPages: number, pages: Page[], name: string, groupedSize: any){
        this.totalPages = totalPages
        this.pages = pages
        this.name = name
        this.groupedPages = groupedSize
    }
}