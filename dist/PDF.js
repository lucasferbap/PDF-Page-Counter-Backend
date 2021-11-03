"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PDF = /** @class */ (function () {
    function PDF(totalPages, pages, name, groupedSize) {
        this.totalPages = totalPages;
        this.pages = pages;
        this.name = name;
        this.groupedPages = groupedSize;
    }
    return PDF;
}());
exports.default = PDF;
