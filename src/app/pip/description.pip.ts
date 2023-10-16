import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {
  // , ...args: unknown[]
  transform(value: string, args: string): string {
    if (args == 'title') {
      if (value.length >= 30) {
        let text = '';
        for (let i = 0; i <= 30; i++) {
          text += value[i];
        }
        return text + '...';
      }
      else
        return value;
    }
    else {
      if (value.length >= 120) {
        let text = '<div class="fw-normal lh-1 border-0 text-decoration-none m-0 p-0 ts">';
        for (let i = 0; i <= 120; i++) {
          text += value[i];
        }
        text += '<b class="fs-2 fw-bolder lh-0">...</b></div>'
        return text;
      }
      else if (value.length >= 80) {
        let text = '<div class="fw-normal lh-1 border-0 text-decoration-none m-0 p-0 ts">';
        for (let i = 0; i <= 80; i++) {
          text += value[i];
        }
        text += '<b class="fs-2 fw-bolder lh-0">...</b></div>'
        return text;
      }
      else if (value.length >= 40) {
        let text = '<div class="fw-normal lh-1 border-0 text-decoration-none m-0 p-0 ts">';
        for (let i = 0; i <= 40; i++) {
          text += value[i];
        }
        text += '<b class="fs-2 fw-bolder lh-0">...</b></div>'
        return text;
      }
      else
        return value;
    }
  }

}
