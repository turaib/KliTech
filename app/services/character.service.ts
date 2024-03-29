import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Character} from "../models/character.type";

@Injectable()
export class CharacterService {
    private characterUrl:string='https://www.anapioficeandfire.com/api/characters/';


    constructor(private http: Http) {}

    /**
     * Karakterek listájának lekérdezése az API-tól
     * @param pageNumber Oldalszám
     * @param pageSize Oldalon megjelenő entitások száma
     */
    getCharacters( pageNumber:number=1, pageSize:number=10):Observable<Character[]>{
        return this.http.get(this.characterUrl+"?pageSize="+pageSize+"&page="+pageNumber).map(response => response.json());
    }

    /**
     * Entitás azonosítóját állítja elő.
     * @param url Entitás címe.
     */
    getID(url:string):string{
        if(typeof url==="undefined")return "";
        return Number.parseInt(url.split('/')[5]).toString();
    }

    /**
     * Karakter lekérdezése ID alapján
     * @param url Karakter URL-je
     * @param id Opcionálisan lekérdezhető ID alapján is.
     */
    getCharacterById(url:string, id?:number):Observable<Character>{
        if(typeof id!=="undefined")return this.http.get(this.characterUrl+id).map(response => response.json());
        else return this.http.get(this.characterUrl+this.getID(url)).map(response => response.json());
    }
}