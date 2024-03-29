"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rx_1 = require("rxjs/rx");
var http_1 = require("@angular/http");
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.bookUrl = 'https://www.anapioficeandfire.com/api/books/';
        this.hasCopy = false;
    }
    /**
     * Az össes könyv lekérdezése a service-től. Ha korábban már lekérdezte, akkor a mentett tartalommal tér vissza.
     */
    BookService.prototype.getBooks = function () {
        var _this = this;
        if (this.hasCopy)
            return rx_1.Observable.of(this.books);
        var tmp = this.http.get(this.bookUrl).map(function (response) { return response.json(); });
        tmp.subscribe(function (it) {
            _this.books = it;
            _this.hasCopy = true;
        });
        return tmp;
    };
    /**
     * Entitás azonosítóját állítja elő.
     * @param url Entitás címe.
     */
    BookService.prototype.getID = function (url) {
        if (typeof url === "undefined")
            return "";
        return Number.parseInt(url.split('/')[5]).toString();
    };
    /**
     * Könyv lekérdezése ID alapján
     * @param url Könyv URL-je
     * @param id Opcionálisan lekérdezhető ID alapján is.
     */
    BookService.prototype.getBookById = function (url, id) {
        if (typeof id !== "undefined")
            return this.http.get(this.bookUrl + id).map(function (response) { return response.json(); });
        else
            return this.http.get(this.bookUrl + this.getID(url)).map(function (response) { return response.json(); });
    };
    return BookService;
}());
BookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map