import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetdataService } from 'src/app/core/services/getdata.service';
import { LocationService } from '../../core/services/location.service';
import { Weather } from '../../core/models/Weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'WeatherApp';
  public form: FormGroup;
  cityValue: string = '';
  tempCelc: string = '';
  cityName: string = '';
  isSuccessWeather: boolean = false;
  isError: boolean = false;
  placeHolderText: string = 'Plase a city!';
  _getLocation: LocationService;
  latitude: string = '';
  longitude: string = '';
  time: string = '';
  month: string = '';
  imageItem: string = '';
  seasonText: string = '';
  isPageHidden = false;
  dayString: string = '';
  showSpinner: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _getDataService: GetdataService
  ) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.latitude = pos.coords.latitude.toFixed();
        this.longitude = pos.coords.longitude.toFixed();
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        this.loadWeather();
      });
    }
  }

  ngOnInit(): void {
    this.constructForm();
  }

  loadLocation() {
    this._getLocation.getPosition().subscribe((pos: Position) => {
      console.log(pos.coords.latitude);
    });
  }

  loadWeather() {
    this._getDataService
      .getAll(this.latitude, this.longitude)
      .subscribe((data) => {
        this.showSpinner = false;
        this.isSuccessWeather = true;
        this.tempCelc = (data.daily[0].temp.max - 273.15).toFixed();
        this.cityName = data.timezone;
        this.timeConverter(data.daily[0].dt);
        this.isPageHidden = true;

        this._getDataService.subject.next(data.daily);
      });
  }

  timeConverter(unix: number) {
    var dateItem = new Date(unix * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = dateItem.getFullYear();
    const month = months[dateItem.getMonth()];
    const date = dateItem.getDate();
    const day = dateItem.getDay();
    const time = date + ' ' + month + ' ' + year;
    this.time = time;
    this.month = month;

    this.findDay(day);
    this.findImage(this.month);
  }

  constructForm() {
    this.form = this.fb.group({
      todo: this.fb.control(null, Validators.required),
    });
  }

  findDay(d: number) {
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    this.dayString = weekday[d];
    console.log(this.dayString);
  }

  findImage(month: string) {
    switch (month) {
      case 'Dec':
      case 'Jan':
      case 'Feb':
        this.imageItem = 'assets/images/winter.png';
        this.seasonText = 'WINTER';
        break;
      case 'Mar':
      case 'Apr':
      case 'May':
        this.imageItem = 'assets/images/spring.png';
        this.seasonText = 'SPRING';
        break;
      case 'Jun':
      case 'Jul':
      case 'Aug':
        this.imageItem = 'assets/images/summer.png';
        this.seasonText = 'SUMMER';
        break;
      case 'Sep':
      case 'Oct':
      case 'Nov':
        this.imageItem = 'assets/images/autumn.png';
        this.seasonText = 'AUTUMN';
        break;
      default:
        break;
    }
  }

  onSubmit() {
    this.cityValue = this.form.get('todo').value;
    console.log(this.cityValue);
    this.form.reset;

    if (
      this.cityValue != null &&
      this.cityValue != '' &&
      this.cityValue != undefined
    ) {
      this.cityName = '';
      this.isError = false;
    } else {
      this.placeHolderText = 'bos bırakma!';
      this.isError = true;
    }
  }
}
