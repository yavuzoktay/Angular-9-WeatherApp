import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/core/services/getdata.service';
import { Daily, Weather, Temp } from '../../core/models/Weather';
import { Card } from '../../core/models/card';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  items: Daily[] = [];
  element: Daily[] = [];
  dayString: string;
  isShowPage: boolean = false;

  weatherCard = new Card();

  constructor(private _getDataService: GetdataService) {}

  ngOnInit(): void {
    this._getDataService.observable.subscribe((clients: Daily[]) => {
      this.isShowPage = true;
      console.log('Client', clients);
      this.items = clients.slice();
      this.getWeather();
    });
  }

  getWeather() {
    for (let index = 1; index < this.items.length - 1; index++) {
      this.element.push(this.items[index]);
      this.getDay(this.items[index].dt);
      this.calculateTemp(this.items[index].temp.max);
    }

    console.log('Element', this.element);
  }

  calculateTemp(temp: number) {
    this.weatherCard.temp.push((temp - 273.15).toFixed());
    console.log(this.weatherCard);
  } 

  getDay(unix: number) {
    var dateItem = new Date(unix * 1000);
    const day = dateItem.getDay();
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    this.weatherCard.date.push(weekday[day]);
  }
}
