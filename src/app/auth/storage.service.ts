import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  //get the stored value for the given key
  public get(key: string): any {
    let value: any | null = localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (e) {
      return value;
    }
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
  public clear():void {
    localStorage.clear();
  }
}
