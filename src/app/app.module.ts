import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { GasEmissionsComponent } from './gas-emissions/gas-emissions.component';
import { SolidFuelEmissionsComponent } from './solid-fuel-emissions/solid-fuel-emissions.component';
import { DataEntryFormComponent } from './data-entry-form/data-entry-form.component';
import { TransformFuelNamePipe } from './pipes/transform-fuel-name.pipe';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [
    AppComponent,
    GasEmissionsComponent,
    SolidFuelEmissionsComponent,
    DataEntryFormComponent,
    TransformFuelNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,  
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    ReactiveFormsModule, 
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
