import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../shared/place.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import {ModalsComponent} from "../../shared/modals/modals.component";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  cinemaForm: FormGroup;
  list;
  line;
  seat;
  seats = [];
  sector;
  sectors = [];
  category;
  categories = [];
  lines = [];

  constructor(
    private service: PlaceService,
    private dialog: MatDialog) {

    this.cinemaForm = new FormGroup({
      sector: new FormControl([], Validators.required),
      category: new FormControl({value: '', disabled: true}, Validators.required),
      line: new FormControl({value: '', disabled: true}, Validators.required),
      seat: new FormControl({value: '', disabled: true}, Validators.required)
    });

  }

  onSubmit() {
    if (this.cinemaForm.valid) {
      this.service.addToBasket(this.seat);
      let data;
      data = {
        status: true,
        name: `Ваш билет №${this.seat.id} успешно забронирован`,
        place: `
        Сектор: ${this.sector.name}
        Ряд: ${this.line.name}, Место:${this.seat.seat}
        Цена пакета: ${this.category.price}
        `
      };
      const dialogRef = this.dialog.open(ModalsComponent, {
        width: '400px',
        height: 'auto',
        data: data
      });
    } else {
      let data;
      data = {
        status: false,
        name: `Заполните поля!`
      };
      const dialogRef = this.dialog.open(ModalsComponent, {
        width: '400px',
        height: 'auto',
        data: data
      });
    }

  }

  ngOnInit() {
    this.service.getSectors()
      .subscribe(sectors => {
        this.sectors = sectors;
        console.log(this.sectors);
      });

    this.cinemaForm.get('sector').valueChanges
      .do(sector => this.sector = sector)
      .flatMap(() => this.service.getFilteredSeatsBySector(this.sector.id))
      .flatMap(() => this.service.getCategories())
      .subscribe(cat => {
        this.cinemaForm.get('category').enable();
        this.cinemaForm.get('category').reset([]);
        this.categories = cat;
      });

    this.cinemaForm.get('category').valueChanges
      .do(cat => this.category = cat)
      .flatMap(() => this.service.getLines(this.category.id))
      .subscribe((lines) => {
        this.cinemaForm.get('line').enable();
        this.cinemaForm.get('line').reset([]);
        this.lines = lines;
        console.log(this.lines);
      });

    this.cinemaForm.get('line').valueChanges
      .do(line => this.line = line)
      .subscribe(() => {
        this.seats = this.service.getSeats(this.line.id);
        this.cinemaForm.get('seat').enable();
        this.cinemaForm.get('seat').reset([]);
      });

    this.cinemaForm.get('seat').valueChanges
      .subscribe(seat => {
        console.log(seat);
        this.seat = seat
      });

  }


}
