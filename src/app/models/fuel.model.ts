import { ApexFill } from "ng-apexcharts";

export type FuelLabel = {
    fuelName: string; 
    fuelMeasure: string;
}

type DateLimit = {
    min: Date, 
    max: Date
}

export type Config = {
    dates: DateLimit
    labels: FuelLabel
}

export type FormOutputData = {
    date: Date,
    value: number
}

export type DataSet = {
    x: Date, 
    y: number
}[]

export type SeriesData = {
    x: any;
    y: any;
    fill?: ApexFill | undefined;
    fillColor?: string | undefined;
    strokeColor?: string | undefined;
    meta?: any;
    goals?: any;
    barHeightOffset?: number | undefined;
    columnWidthOffset?: number | undefined;
}[]