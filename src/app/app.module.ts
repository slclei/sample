import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { ModelComponent } from './model/model.component';
import { TestComponent } from './test/test.component';
import { ModelDialogComponent } from './model-dialog/model-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    ModelComponent,
    TestComponent,
    ModelDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[TestComponent,ModelDialogComponent]
})
export class AppModule { }
