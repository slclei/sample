import {
  Injectable,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  ViewContainerRef,
} from '@angular/core'
import { DialogModule } from './dialog.module'
import { DialogComponent } from './dialog.component'

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef!: ComponentRef<DialogComponent>

  constructor(
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  appendDialogComponentToBody() {
    const component = this.viewContainerRef.createComponent(DialogComponent);
    this.appRef.attachView(component.hostView);

    const domElem = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = component;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  public open() {
    this.appendDialogComponentToBody();
}
}