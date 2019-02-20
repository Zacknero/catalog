import {Component, Input} from '@angular/core';

@Component({
  selector: 'fb-price',
  template: `
    <span [style.color]="price > 500? 'red': null">{{price | number: '1.2-2'}}</span>
  `,
  styles: []
})
export class PriceComponent {

  @Input() price: number;

}
