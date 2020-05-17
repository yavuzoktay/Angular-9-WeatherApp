import { Injectable, enableProdMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  lat: any;
  lng: any;
  constructor() {}

  getPosition(): Observable<Position> {
    return Observable.create((observer) => {
      navigator.geolocation.watchPosition((pos: Position) => {
        observer.next(pos.coords.latitude);
      }),
        () => {
          console.log('Position is not available');
        };
    });
  }
}
