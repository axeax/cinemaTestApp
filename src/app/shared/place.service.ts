import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  orderedSeats = [];
  filteredCategories = new Set();
  filteredLines = new Set();
  filteredResponse: Array<any>;

  constructor(private http: HttpClient){}

  private _getSeats(line) {
    return this.filteredResponse.filter(seat => (seat.line === line && seat.status === 0));
  }

  private _filterBySector(sector) {
    this.clearData();
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      const res = this.objToArray(response.response.seats);
      this.filteredResponse = res.filter(seat => {
        if (seat.sector === sector) {
          this.filteredCategories.add(seat.category);
          this.filteredLines.add(seat.line);
          return (seat.sector === sector);
        }
      });
      return this.filteredResponse;
    });
  }

  private _filterByCategory() {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      console.log(response.response.categories);
      const cat = this.objToArray(response.response.categories);
      let filteredResponse;

      filteredResponse = cat.filter(category => {
        return this.filteredCategories.has(category.id);
      });

      console.log(filteredResponse);
      return filteredResponse;
    });
  }

  private _filterLinesByCategory(cat) {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      const lines = this.objToArray(response.response.lines);
      let filteredLinesByCategory;
      const filteredLinesSet = new Set();

      this.filteredResponse.filter((seat) => {
        if (this.filteredLines.has(seat.line) && seat.category === cat) {
          filteredLinesSet.add(seat.line);
          return seat.category === cat;
        }
      });

      filteredLinesByCategory = lines.filter(line => filteredLinesSet.has(line.id));
      return filteredLinesByCategory;
    });
  }

  private _getSectors() {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      return this.objToArray(response.response.sectors);
    });
  }

  private clearData() {
    this.orderedSeats = [];
    this.filteredCategories = new Set();
    this.filteredLines = new Set();
    this.filteredResponse = [];
  }

  private objToArray(obj): Array<any> {
    let arr = [];
    const res = obj;
    arr = Object.keys(res).map(key => res[key]);
    return arr;
  }

  getFilteredSeatsBySector(sector) {
    return this._filterBySector(sector);
  }

  getSeats(line) {
    return this._getSeats(line);
  }

  getSectors() {
   return this._getSectors();
  }

  getCategories() {
    return this._filterByCategory();
  }

  getLines(cat) {
    return this._filterLinesByCategory(cat);
  }

  addToBasket(ticket) {
    console.log(ticket);
    this.orderedSeats.push(ticket);
  }
}
