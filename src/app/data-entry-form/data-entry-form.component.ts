import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config, FormOutputData } from '../models/fuel.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE  } from '@angular/material/core';
import { numberValidator } from '../validators/number.validator';
import * as _moment from 'moment';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-data-entry-form',
  templateUrl: './data-entry-form.component.html',
  styleUrls: ['./data-entry-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DataEntryFormComponent implements OnInit {
  formHeader = 'Введите расход';
  dateInputLabel = 'Дата ввода данных';
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();

  @Input() config!: Config;
  @Output() newDataEvent = new EventEmitter<FormOutputData>();

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit() {
    this.createForm(); 
  }

  onResetForm() {
    this.form.reset({date: _moment(this.config.dates.min)});
  }

  onSave() {
    this.newDataEvent.emit({date: this.date?.value.toDate(), value: this.fuel?.value})
  }

  private createForm(): void {
    this.form = this.fb.group({
      fuel: ['', [Validators.required, numberValidator]], 
      date: [_moment(this.config.dates.min), [Validators.required]]
    })
  }

  get fuel() {return this.form.get('fuel')}
  get date() {return this.form.get('date')}
}
