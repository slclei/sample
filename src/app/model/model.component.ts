import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {GLTFLoader,GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit, AfterViewInit{
  scene!: THREE.Scene;
  loaderGLTF: any=new GLTFLoader();
  model!: THREE.Object3D<THREE.Event>;
  camera!: THREE.PerspectiveCamera;
  fieldOfView: number | undefined=0.5;
  nearClippingPane: number | undefined=0.01;
  farClippingPane: number | undefined=1000;
  ambientLight!: THREE.AmbientLight;
  controls!: OrbitControls;
  renderer!: THREE.WebGLRenderer;
  directionalLight!: THREE.DirectionalLight;
  light1!: THREE.PointLight;
  light2!: THREE.PointLight;
  light3!: THREE.PointLight;
  light4!: THREE.PointLight;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
  
  @ViewChild('modelRef') private modelRef:ElementRef | any;
  test='assets/test.gltf';
  robot='assets/robot/scene.gltf'

  /**
   * Create the scene
   * 
   *  @private
   *  @memeberof ModelComponent
   */
  private createScene(){
    //* Scene
    this.scene=new THREE.Scene();
    this.scene.background=new THREE.Color(0xd4d4d8);
    this.loaderGLTF.load(this.robot,(gltf:GLTF)=>{
      this.model=gltf.scene.children[0];
      console.log(this.model);
      let box=new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.model.scale.set(1,1,1);
      this.scene.add(this.model);
      this.scene.add(new THREE.AxesHelper(10));
    });
    //*Camera
    let aspectRatio:any=this.getAspectRatio();
    this.camera=new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    this.camera.position.set(50,50,50); // Set position like this
    this.camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

    this.ambientLight=new THREE.AmbientLight(0x000000,100);
    this.scene.add(this.ambientLight);    
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  /**
   * create controls
   * 
   * @private
   * @memberof ModelComponent
   */
  private createControls=()=>{
    const renderer=new CSS2DRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.domElement.style.position='absolute';
    renderer.domElement.style.top='0px';
    document.body.appendChild(renderer.domElement);
    this.controls=new OrbitControls(this.camera,renderer.domElement);
    this.controls.autoRotate=true;
    this.controls.enableZoom=true;
    this.controls.enablePan=false;
    this.controls.update();

  }

  private get canvas(): HTMLCanvasElement {
    return this.modelRef.nativeElement;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: ModelComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      //component.animateModel();
      requestAnimationFrame(render);
      console.log("render",component.model);
    }());
  }

   /**
   *Animate the model
   *
   * @private
   * @memberof ModelComponent
   */
   private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

}
