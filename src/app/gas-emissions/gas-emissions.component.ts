import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as echarts from "echarts";
import * as _moment from 'moment';
import { Config, FormOutputData, DataSet } from '../models/fuel.model';

@Component({
  selector: 'app-gas-emissions',
  templateUrl: './gas-emissions.component.html',
  styleUrls: ['./gas-emissions.component.scss']
})
export class GasEmissionsComponent {
  public totalEmissions!: number;
  private chart!: echarts.EChartsType;
  
  @Input() formConfig!: Config;
  @Input() dataSet!: DataSet;
  @Input() fuelName!: string;

  @ViewChild('chart', {static: true}) element!: ElementRef<HTMLElement>;

  ngOnInit() {
    this.chart = echarts.init(this.element.nativeElement);
    this.updateChart();

    this.totalEmissions = +this.dataSet.reduce((sum, current) => sum + current.y, 0).toFixed(2); 
  }

  onAddData(event: FormOutputData): void {
    this.updateDataset(event.date, this.calcGasEmission(event.value));
    this.updateChart();

    this.totalEmissions = +this.dataSet.reduce((sum, current) => sum + current.y, 0).toFixed(2); 
  }

  private updateDataset(newDate: Date, newValue: number): void {
    this.dataSet = this.dataSet.filter(point => point.x.getTime() !== newDate.setHours(0,0,0))
    this.dataSet.push({ x: newDate, y: newValue });
    this.dataSet.sort((dataA, dataB) => dataA.x.getTime() - dataB.x.getTime());
  }

  private calcGasEmission(fuelСonsumption: number): number {
    return +((fuelСonsumption * 1.129)*1.59).toFixed(2);
  }

  private updateChart(): void {
    const chartOptions = {
      grid: {
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.dataSet.map(data => _moment(data.x).format('DD MMM YYYY'))
      },
      yAxis: {
        type: 'value', 
        axisLabel: {
          formatter: '{value} тонн'
        },
      },
      series: [
        {
          symbolSize: 15,
          data: this.dataSet.map(data => data.y),
          type: 'scatter'
        }
      ]
    };

    this.chart.setOption(chartOptions);
  }
}
