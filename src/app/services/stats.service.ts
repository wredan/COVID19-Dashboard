import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  media(values: number[]): number {
    let sum = 0;
    values.forEach(val => sum += val);
    return sum / values.length;
  }

  varianza(values: number[]): number {
    let media = this.media(values);
    let sum = 0;
    values.forEach(val => sum += Math.pow((val - media), 2));
    return sum / values.length;
  }

  deviazioneStandard(varianza: number): number {
    return Math.sqrt(varianza);
  }

  covarianza(x: number[], y: number[]): number {
    let mediaX = this.media(x);
    let mediaY = this.media(y);
    let n = x.length;
    let sum = 0;
    for (let i = 0; i < n; i++)
      sum += (x[i] - mediaX) * (y[i] - mediaY);
    return sum / n;
  }

  coeffPearson(x: number[], y: number[]): number {
    let covarianza = this.covarianza(x, y);
    let devstdX = this.deviazioneStandard(this.varianza(x));
    let devstdY = this.deviazioneStandard(this.varianza(y));
    return covarianza / (devstdX * devstdY);
  }

  coeffM(x: number[], y: number[]): number {
    let covarianza = this.covarianza(x, y);
    let varianzaX = this.varianza(x);
    return covarianza / varianzaX;
  }

  coeffQ(x: number[], y: number[]): number {
    let mediaX = this.media(x);
    let mediaY = this.media(y);
    let covarianza = this.covarianza(x, y);
    let varianzaX = this.varianza(x);
    return mediaY - (mediaX * covarianza / varianzaX);
  }

  regrLinY(x: number, coeffM: number, coeffQ: number): number{
    return coeffM * x + coeffQ;
  }

  getRegrLinDrawPoints(x: number[], coeffM: number, coeffQ: number): any {
    let min = Math.min(...x);
    let max = Math.max(...x);
    var drawPoints = [
      { x: min, y: this.regrLinY(min, coeffM, coeffQ)},
      { x: max, y: this.regrLinY(max, coeffM, coeffQ)}
    ];
    return drawPoints;
  }
}
