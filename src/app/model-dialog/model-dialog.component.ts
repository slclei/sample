import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.css']
})
export class ModelDialogComponent implements OnInit{

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModelDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data:any) {
    }

    ngOnInit() {
    }

    save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
