import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Device} from '../../model/device';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'fb-catalog-form',
  template: `
    <form #f="ngForm" (ngSubmit)="saveHandler()">
      <input type="text" [ngModel]="active?.label" name="label" required class="form-control" placeholder="Device Model">
      <input type="number" [ngModel]="active?.price" name="price" class="form-control" placeholder="Price">
      <button type="submit" class="btn btn-warning">
        {{active?.id ? 'EDIT' : 'ADD'}}
      </button>
      <button type="button" class="btn btn-danger" (click)="resetHandler()" *ngIf="active">
        RESET
      </button>
    </form>
  `,
  styles: []
})
export class CatalogFormComponent implements OnChanges {

  @Input() active: Device;
  @Output() save: EventEmitter<Device> = new EventEmitter<any>();
  @Output() reset: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('f') form: NgForm;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.active.currentValue);
    const active: Device = changes.active.currentValue;
    if (!active.id) {
      this.form.reset();
    }
  }

  saveHandler() {
    this.save.emit(this.form.value);
  }

  resetHandler() {
    this.reset.emit();
    this.form.reset();
  }
}
