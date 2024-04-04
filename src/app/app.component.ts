import { Component} from '@angular/core';
import { Config, DataSet } from './models/fuel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent {
  // mock Data
  gasName = 'Природный газ';
  solidFuelName = 'Уголь';
  dateLimit = {min: new Date('2023-11-17'), max: new Date('2023-12-14')}
  gasFormConfig: Config = {
    dates: this.dateLimit, 
    labels: {fuelName: 'Природный газ', fuelMeasure: 'тыс. м3'}
  };

  solidFuelFormConfig: Config = {
    dates: this.dateLimit, 
    labels: {fuelName: 'Уголь', fuelMeasure: 'тонн'}
  };

  chartsDataset: DataSet = [
    {
      x: new Date('17 Nov 2023'),
      y: 20.95
    },
    {
      x: new Date('29 Nov 2023'),
      y: 80.95
    },
    {
      x: new Date('1 Dec 2023'),
      y: 180.95
    },
    {
      x: new Date('14 Dec 2023'),
      y: 280.95
    },
  ];
}
