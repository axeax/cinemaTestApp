import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  sectorChanges = new Subject<any>();
  categoriesChanges = new Subject<any>();
  linesChanges = new Subject<any>();
  seatsChanges = new Subject<any>();

  orderedSeats = [];
  filteredSeats = [];

  categoryList = new Set();
  linesList = new Set();
  sectorsList = new Set();
  seats;
  lines;
  sectors;
  categories;

  constructor(private http: HttpClient) {
    this._getSectors()
      .subscribe((sectors) => {
        this.sectors = sectors;
        this.sectorChanges.next(this.sectors);
      });
  }

  // получаем данные с сервера и записываем
  private _getSectors() {
    return this.http.get('https://syn.su/js/front/data.js').map( (response: any) => {
      // сразу фильтруем список сектора от пустых
      this.seats = this.objToArray(response.response.seats)
        .filter(seat => {
          this.sectorsList.add(seat.sector);
          return seat.status === 0;
        });
      this.sectors = this.objToArray(response.response.sectors)
        .filter(sector => this.sectorsList.has(sector.id));

      this.lines = this.objToArray(response.response.lines);
      this.categories = this.objToArray(response.response.categories);
      return this.sectors;
    });
  }

  // фильтруем список по сектору
  public _filterBySector(sector) {
    this.categoryList.clear();
    this.filteredSeats = this.seats.filter(seat => {
      if (seat.sector === sector) {
        console.log(seat.category);
        this.categoryList.add(seat.category);
        return true;
      }
    });
    this.categoriesChanges.next(this.categories.filter(cat => this.categoryList.has(cat.id)));
  }
  // фильтруем по категории
  public _filterByCategory(cat) {
    this.linesList.clear();

    const lines = this.filteredSeats.filter(seat => {
      if (seat.category === cat) {
        this.linesList.add(seat.line);
        return seat.category === cat;
      }
    });

    this.linesChanges.next(this.lines.filter(line => this.linesList.has(line.id)));
  }
  // фильтруем по ряду
  private _filterByLine(line) {
    this.seatsChanges.next(this.filteredSeats.filter(seat => seat.line === line));
    console.log(this.filteredSeats.filter(seat => seat.line === line));
  }

  private objToArray(obj): Array<any> {
    let arr = [];
    const res = obj;
    arr = Object.keys(res).map(key => res[key]);
    return arr;
  }

  getFilteredSeatsBySector(sector) {
    this._filterBySector(sector);
  }

  getSeats(line) {
    this._filterByLine(line);
  }

  getSectors() {
    if (this.sectors) {
      return this.sectors.slice();
    }
  }

  getLines(cat) {
    this._filterByCategory(cat);
  }

  addToBasket(ticket) {
    console.log(ticket);
    this.orderedSeats.push(ticket);
  }
}
