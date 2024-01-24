import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHandlerService {

  constructor() { }

  public get(key: string): any {
    let value: any | null = localStorage.getItem(key);
    try {
      value = JSON.parse(value);
      return value;
    } catch (e) {
      return value;
    }
  }
  public checkUserLogined(key: string) {
    if (localStorage.getItem(key)) {
      return true;
    }
    return false;
  }

  //set key value store in localstorage
  public set(key: string, value: string): void {
    if (value === undefined) this.remove(key);
    else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  //remove the key from localstorage
  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  //remove all keys from localstorage
  public clear(): void {
    localStorage.clear();
  }
}
