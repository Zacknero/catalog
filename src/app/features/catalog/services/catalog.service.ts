import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Device} from '../model/device';
import {CatalogStore} from './catalog.store';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient, private store: CatalogStore) {
    this.getAll();
  }

  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
      .subscribe(res => {
        this.store.load(res);
      });
  }

  deleteHandler(device: Device) {
    this.http.delete(`http://localhost:3000/devices/${device.id}`)
      .subscribe(() => this.store.delete(device.id));
  }

  save(device: Device) {
    this.store.active.id ? this.edit(device) : this.add(device);
  }

  add(device: Device) {
    this.http.post<Device>(`http://localhost:3000/devices/`, device)
      .subscribe(result => this.store.add(result));
  }

  edit(device: Device) {
    this.http.patch<Device>(`http://localhost:3000/devices/${this.store.active.id}`, device)
      .subscribe(res => this.store.edit(res));
  }

  setActive(device: Device) {
    this.store.setActive(device);
  }

  reset() {
    this.store.reset();
  }
}
