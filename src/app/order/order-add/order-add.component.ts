import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../shared/place.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { ModalsComponent } from '../../shared/modals/modals.component';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  cinemaForm: FormGroup;
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
      category: new FormControl([], Validators.required),
      line: new FormControl([], Validators.required),
      seat: new FormControl([], Validators.required)
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
    // берем сектора из сервиса и
    this.sectors = this.service.getSectors();

    // и подписываемся на обновления всех данных
    this.service.sectorChanges
      .subscribe((sectors) => this.sectors = sectors);
    this.service.categoriesChanges
      .subscribe((categories) => this.categories = categories);
    this.service.linesChanges
      .subscribe((lines) => this.lines = lines);
    this.service.seatsChanges
      .subscribe((seats) => this.seats = seats);

    // после выбора сектора вызываем фильтр сервиса
    this.cinemaForm.get('sector').valueChanges
      .do(sector => this.sector = sector)
      .subscribe( () => {
        this.cinemaForm.get('category').setValue([]);
        this.cinemaForm.get('line').setValue([]);
        this.cinemaForm.get('seat').setValue([]);
        this.service.getFilteredSeatsBySector(this.sector.id);
      });

    this.cinemaForm.get('category').valueChanges
      .do(cat => this.category = cat)
      .subscribe( () => {
        this.cinemaForm.get('line').setValue([]);
        this.cinemaForm.get('seat').setValue([]);
        this.service.getLines(this.category.id);
      });

    this.cinemaForm.get('line').valueChanges
      .do(line => this.line = line)
      .subscribe(() => {
        this.cinemaForm.get('seat').setValue([]);
        this.service.getSeats(this.line.id);
      });

    this.cinemaForm.get('seat').valueChanges
      .subscribe(seat => {
        this.seat = seat;
      });

  }


}
