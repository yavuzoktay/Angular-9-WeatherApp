export class Weather {
  daily: Daily[];
  timezone: string;
}

export class Daily {
  max: number;
  temp: Temp;
  dt: number;
}

export class Temp {
  max: number;
}
