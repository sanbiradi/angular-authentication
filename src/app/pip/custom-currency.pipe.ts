import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(val: number, args: string): any {
    // return this.fun(val, args);
    if (args === 'INR' || args === '₹') {
      return Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(Number(val));
    }
    else if (args === 'USD' || args === '$') {
      return Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(Number(val));
    }
    else {
      return val;
    }
  }

}
