import { Component, Input, ViewChild } from '@angular/core';
import { Config, FormOutputData, DataSet} from '../models/fuel.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-solid-fuel-emissions',
  templateUrl: './solid-fuel-emissions.component.html',
  styleUrls: ['./solid-fuel-emissions.component.scss']
})
export class SolidFuelEmissionsComponent {
  public chartOptions!: ChartOptions;
  totalEmissions!: number;

  @Input() formConfig!: Config;
  @Input() dataSet!: DataSet;
  @Input() fuelName!: string;

  @ViewChild("chart") chart!: ChartComponent;

  ngOnInit() {
    this.updateChart();
    this.totalEmissions = +this.dataSet.reduce((sum, current) => sum + current.y, 0).toFixed(2); 
  }

  onAddData(event: FormOutputData) {  
    this.updateDataset(event.date, this.calcFuelEmissions(event.value))
    this.updateChart();

    this.totalEmissions = +this.dataSet.reduce((sum, current) => sum + current.y, 0).toFixed(2); 
  }

  private calcFuelEmissions(fuelСonsumption: number): number {
    return +((fuelСonsumption * 0.768)*2.76).toFixed(2);
  }

  private updateDataset(newDate: Date, newValue: number): void {
    this.dataSet = this.dataSet.filter(point => point.x.getTime() !== newDate.setHours(0,0,0))
    this.dataSet.push({x: newDate, y: newValue})
    this.dataSet.sort((dataA, dataB) => dataA.x.getTime() - dataB.x.getTime());
  }

  private updateChart(): void {
    const newOptions = JSON.parse(JSON.stringify({
      series: [
        {
          name: "Solid fuel",
          data: this.dataSet.map(data => {
           return {x: data.x + ' GMT', y: data.y}
          })
        }
      ],
      chart: {
        height: 280,
        width: 550,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return val + ' тонн'
          }
        }
      }
    }));

    this.chartOptions = newOptions;
  }
}
