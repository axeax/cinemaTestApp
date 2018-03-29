import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  orderedSeats = [];

  constructor(private http: HttpClient){}

  private _getList() {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      return response.response;
    });
  }

  private _getCategories(sectorId) {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      console.log(response.response.categories);
      let cat = this.objToArray(response.response.categories);
      cat = cat.filter((category) => category.id === sectorId);
      return cat;
    });
  }

  private _getLine(cat, sector) {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      let lines = this.objToArray(response.response.lines);
      lines = lines.filter(line => (line.event === cat && line.event === sector));
      return lines;
    });
  }

  private _getSeats(line, cat, sector) {
    console.log(line, cat, sector);
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      let seats = this.objToArray(response.response.seats);
      console.log(seats);
      console.log(line, cat, sector);
      seats = seats.filter(seat => {
        // return (seat.sector === sector && seat.line === line && seat.status === 0 && seat.category === cat);
        return (seat.sector === sector && seat.line === line && seat.status === 0);
      });
      return seats;
    });
  }

  private _getSectors() {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      return this.objToArray(response.response.sectors);
    });
  }

  private objToArray(obj): Array<any> {
    let arr = [];
    const res = obj;
    arr = Object.keys(res).map(key => res[key]);
    return arr;
  }

  getSeats(line, cat, sector) {
    return this._getSeats(line, cat, sector);
  }

  getSectors() {
   return this._getSectors();
  }

  getCategories(id) {
    return this._getCategories(id);
  }

  getLine(cat, sector) {
    return this._getLine(cat, sector);
  }

  addToBasket(ticket) {
    console.log(ticket);
    this.orderedSeats.push(ticket);
  }
}
