import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modelDirective]',
})
export class ModelDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}