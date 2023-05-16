import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModelDirective } from '../directives/model.directive';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';

@Component({
  selector: 'app-dynamic-dialog',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template modelDirective></ng-template>
    </div>
  `,
  styleUrls: ['./dynamic-dialog.component.css'],
})
export class dynamicDialogComponent implements OnInit {
  dialogRef: any;
  @ViewChild(ModelDirective, { static: true }) modelDirective!: ModelDirective;

  constructor(
    private dialog:MatDialog,
  ) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.modelDirective.viewContainerRef;
    viewContainerRef.clear();

    const DiaCon= new MatDialogConfig();

    DiaCon.panelClass= 'custom-modalbox';
    DiaCon.disableClose=false;
    DiaCon.autoFocus=true;
    DiaCon.width='50vw';
    DiaCon.height='50vh';

    const diaRef=this.dialogRef=this.dialog.open(ModelDialogComponent,DiaCon);

    //get element for the dialog
    let nElem= diaRef['_containerInstance']['_elementRef'].nativeElement;
    
    nElem.style.position='absolute';
    nElem.style.height='50vh';
    nElem.style.width='50vw';
    nElem.style.top='10px';
    nElem.style.left='10px';

    const componentRef = viewContainerRef.createComponent<ModelDialogComponent>(
      nElem
    );
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
