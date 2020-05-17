import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { Weather } from '../models/Weather';
import { Constants } from 'src/app/shared/utils/constants';

HttpClient;
@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  constructor(private _http: HttpClient) {}

  subject: Subject<any> = new Subject<any>();
  observable: Observable<any> = this.subject.asObservable();

  getAll(lat, lon): Observable<Weather> {
    return this._http
      .get<Weather>(
        Constants.host +
          'lat=' +
          lat +
          '&lon=' +
          lon +
          '&exclude=current,minutely,hourly' +
          '&APPID=' +
          Constants.apiKey
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert('Please check your internet connection!.');
    return throwError(errorMessage);
  }
}
