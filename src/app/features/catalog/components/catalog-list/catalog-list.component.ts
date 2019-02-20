import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Device} from '../../model/device';

@Component({
  selector: 'fb-catalog-list',
  template: `
    <div class="list-group-item" *ngFor="let device of devices" (click)="setActive.emit(device)"
         [ngClass]="{'active': device.id === active?.id}">

      <fb-os-icon [os]="device.os"></fb-os-icon>

      {{device.label}}
      <div class="pull-right">
        <fb-price [price]="device.price"></fb-price>
        <i class="fa fa-trash" (click)="deleteHandler($event, device)"></i>
      </div>
    </div>
  `,
  styles: []
})
export class CatalogListComponent {

  @Input() devices: Device[];
  @Input() active: Device[];

  @Output() setActive: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() delete: EventEmitter<Device> = new EventEmitter<Device>();

  deleteHandler(event: MouseEvent, device: Device) {
    event.stopPropagation();
    this.delete.emit(device);
  }

}
