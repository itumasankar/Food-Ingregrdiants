import { Component, Directive,ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[allowAlpha]'
})

export class RestrictInput {
    private navigationKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'Home',
      'End',
      'ArrowLeft',
      'ArrowRight',
      'Clear',
      'Copy',
      'Paste'
    ];
    inputElement: HTMLElement;
    constructor(public el: ElementRef) {
      this.inputElement = el.nativeElement;
    }

    @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this.el.nativeElement.value;

      this.el.nativeElement.value = initalValue.replace(/[^a-z A-Z]*/g, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }

  }
