import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Domain } from 'domain';

@Pipe({
  name: 'videopipe',
  standalone: true,
})
export class VideopipePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(value: any, url: any): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }
}
