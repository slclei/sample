import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CubeComponent} from './cube/cube.component';
import { ModelComponent } from './model/model.component';
import { TestComponent } from './test/test.component';
import { ModelDialogComponent } from './model-dialog/model-dialog.component';

const routes: Routes = [
  {
    path:"cube", component:CubeComponent
  },
  {
    path:"model", component:ModelComponent
  },
  {
    path:"test", component:TestComponent
  },
  {path:"mdc",component:ModelDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
