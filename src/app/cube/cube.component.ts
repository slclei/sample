import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input,OnInit,ViewChild } from '@angular/core';
import * as THREE from "three";
import { TestComponent } from '../test/test.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})

//https://medium.com/geekculture/hello-cube-your-first-three-js-scene-in-angular-176c44b9c6c0
export class CubeComponent implements AfterViewInit {
  dialogRef: any;

  constructor(private dialog:MatDialog){}

  @ViewChild('canvas')
  private canvasRef:ElementRef|any;

  //Cube properties
  //rotation speed in x an y axis
  @Input() public rotationSpeedX: number =0.05;
  @Input() public rotationSpeedY: number =0.01;
  @Input() public size: number =200;
  @Input() public texture:string="/assets/texture.jpg";

  //Stage properties
  //only items between the two clipping planes are rendered
  @Input() public cameraZ: number=400;
  @Input() public fieldOfView: number=1;
  @Input('nearClipping') public nearClippingPlane: number=1;
  @Input('farClipping') public farClippingPlane:number=1000; 

  //Helper properties
  private camera!:THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  private loader= new THREE.TextureLoader();
  //geometry is a rendered shape
  private geometry=new THREE.BoxGeometry(1,1,1);
  private material=new THREE.MeshBasicMaterial({map:this.loader.load(this.texture)});

  private cube:THREE.Mesh=new THREE.Mesh(this.geometry,this.material);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  /** 
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */ 
  private createScene(){
    //*Scene
    this.scene=new THREE.Scene();
    this.scene.background=new THREE.Color(0x000000)
    this.scene.add(this.cube);
    //Camera
    let aspectRatio=this.getAspectRatio();
    this.camera=new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z=this.cameraZ;
  }

  private getAspectRatio(){
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /** 
   *Animate the cube 
   * 
   * @private
   * @memberof CubeComponent
  */
  private animateCube(){
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   *Sart the rendering loop
   *  
   * @private
   * @memberof CubeComponent
   */
  private startRenderingLoop(){
    //* Renderer
    // Use canvas element in template
    this.renderer=new THREE.WebGL1Renderer({canvas:this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight);

    let component: CubeComponent=this;

    (function render(){
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene,component.camera);
    }());
  }

  //creat a dialog with model inside it
  //Known bug: can not control inside the dialog
  openDialog(){
    const DiaCon= new MatDialogConfig();

    DiaCon.panelClass= 'custom-modalbox';
    DiaCon.disableClose=false;
    DiaCon.autoFocus=true;

    const diaRef=this.dialogRef=this.dialog.open(ModelDialogComponent,DiaCon);
    

    //get element for the dialog
    let nElem= diaRef['_containerInstance']['_elementRef'].nativeElement;
    
    nElem.style.position='absolute';
    nElem.style.height='50vh';
    nElem.style.width='50vw';
    nElem.style.top='100px';
    nElem.style.left='100px';

    diaRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  close() {
    this.dialogRef.close();
}

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

}
