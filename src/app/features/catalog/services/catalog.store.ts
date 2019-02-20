import {Device} from '../model/device';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogStore {
  devices: Device[];
  active: Device = {};

  load(device: Device[]) {
    this.devices = device;
  }

  add(device: Device) {
    this.devices.push(device);
    this.active = {};
  }

  delete(id: number) {
    const index = this.devices.findIndex(d => d.id === id);
    this.devices.splice(index, 1);
  }

  edit(device: Device) {
    const index = this.devices.findIndex(d => d.id === this.active.id);
    this.devices[index] = device;
  }

  setActive(device: Device) {
    this.active = device;
  }

  reset() {
    this.active = {};
  }
}
