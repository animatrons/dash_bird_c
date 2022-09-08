import { Inject, Injectable, InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('Storage', {
  providedIn: 'root',
  factory: () => localStorage
})

@Injectable()
export class PersistenceService {

  constructor(@Inject(STORAGE) public storage: Storage) { }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(this.storage.getItem(key) ?? '');
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

}
