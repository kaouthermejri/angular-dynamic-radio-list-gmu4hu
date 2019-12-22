import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  form: FormGroup;
  orders = [];
  options = []

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: [''],
      options: ['']
    });

    // mimic async orders
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.form.controls.orders.patchValue(this.orders[0].id);
    });

    // getOptions
    of(this.getOptions()).subscribe(options => {
      this.options = options;
      this.form.controls.options.patchValue(this.options[0].id);
    })

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);
  }

  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];
  }

  getOptions(){
        return[
          {id: 'Once', name: 'Once'},
          {id: 'Daily', name: 'Daily'},
          {id: 'Weekly', name: 'Weekly'},
          {id: 'Interval', name: 'Interval'},
        ]
      }

      ngOnInit(){
        this.options
      }


      get Options(){
        return this.form.get('options').value;
      }

  submit() {
    console.log(this.form.value);
  }
}
