"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Page_1 = __importDefault(require("./Page"));
var PDF_1 = __importDefault(require("./PDF"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var PDFParser = require("pdf2json");
var uploadsPath = path_1.default.resolve(__dirname, '..', 'uploads');
var papers = [
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
];
var maisProximo = function (valores, valor) {
    var proximo = valores.reduce(function (anterior, corrente) {
        return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
    });
    return proximo;
};
var maiorValorMaisProximo = function (a, x) {
    var lo, hi;
    for (var i = a.length; i--;) {
        if (a[i] <= x && (lo === undefined || lo < a[i]))
            lo = a[i];
        if (a[i] >= x && (hi === undefined || hi > a[i]))
            hi = a[i];
    }
    ;
    return hi;
};
var pageSizeIdentifier = function (width, height) {
    var oldWidth = width;
    var oldHeigth = height;
    var valores = [2378, 1682, 1189, 841, 594, 420, 297, 210, 148, 105, 74, 52, 37, 26];
    var areas = [3999796, 1999898, 999949, 499554, 249480, 124740, 62370, 31080, 15540, 7770, 3848, 1924, 962];
    width = maisProximo(valores, width);
    height = maisProximo(valores, height);
    var area = width * height;
    var paper = papers.find(function (paper) { return paper.area == area; });
    if (paper == undefined) {
        area = oldHeigth * oldWidth;
        paper = papers.find(function (paper) { return paper.area == maiorValorMaisProximo(areas, area); });
    }
    return paper === null || paper === void 0 ? void 0 : paper.name;
};
var groupSizes = function (pages, keyGetter) {
    var map = new Map();
    pages.forEach(function (page) {
        var key = keyGetter(page);
        var collection = map.get(key);
        if (!collection) {
            map.set(key, [page]);
        }
        else {
            collection.push(page);
        }
    });
    return Object.fromEntries(map);
};
var countPages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pdf, promisses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pdf = [];
                promisses = fs_1.default.readdirSync(uploadsPath).map(function (file) {
                    return new Promise(function (resolve, reject) {
                        var pdfParser = new PDFParser();
                        var fileLocation = uploadsPath + "/" + file;
                        console.log(fileLocation);
                        pdfParser.loadPDF(fileLocation);
                        pdfParser.on("pdfParser_dataError", function (errData) {
                            console.error(errData.parserError);
                            reject(errData);
                        });
                        pdfParser.on("pdfParser_dataReady", function (pdfData) {
                            var pagesResponse = [];
                            var pages = pdfData.Pages;
                            pages.forEach(function (page, index) {
                                var width = (page.Width / 4.5) * 25.4; // pdf page width im mm
                                var height = (page.Height / 4.5) * 25.4; // pdf page height  im mm
                                pagesResponse.push(new Page_1.default(pageSizeIdentifier(width, height), index + 1));
                            });
                            var groupedSizes = groupSizes(pagesResponse, function (page) { return page.size; });
                            pdf.push(new PDF_1.default(pagesResponse.length, pagesResponse, file, groupedSizes));
                            fs_1.default.unlink(fileLocation, function (err) { console.log(err); });
                            resolve(pdf);
                        });
                    });
                });
                return [4 /*yield*/, Promise.all(promisses)];
            case 1:
                _a.sent();
                return [2 /*return*/, pdf];
        }
    });
}); };
exports.default = countPages;
