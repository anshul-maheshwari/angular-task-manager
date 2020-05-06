import { Directive, Renderer2, ElementRef, HostBinding, Input, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appLettersWithSpacesOnly]'
})
export class LettersWithSpacesOnlyDirective {

  @HostBinding('style.color') textColor = 'black';
  @Input() maxSpaces = 1;

  constructor(private renedere2: Renderer2, private el: ElementRef) { }

  @HostListener('input') onInputHandler(event) {
    const value = this.el.nativeElement.value || '';

    if(/^[a-zA-Z\s]*$/.test(value)) {
      this.textColor = 'black';
    } else {
      this.textColor = 'blue';
    }
    let backgroundColor = 'white'; 
     if(value.split(' ').length-1 > this.maxSpaces){
      backgroundColor = 'red';      
    }
    else {
      backgroundColor = 'white';
    }
      this.renedere2.setStyle(this.el.nativeElement, 'backgroundColor', backgroundColor);
  }

}