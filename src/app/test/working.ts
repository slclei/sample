import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {GLTFLoader,GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

//04212023 working
export class TestComponent implements OnInit, AfterViewInit{
  scene!: THREE.Scene;
  loaderGLTF: any=new GLTFLoader();
  test!: THREE.Object3D<THREE.Event>;
  camera!: THREE.PerspectiveCamera;
  fieldOfView: number | undefined=30;
  nearClippingPane: number | undefined=1;
  farClippingPane: number | undefined=10000;
  ambientLight!: THREE.AmbientLight;
  controls!: OrbitControls;
  renderer!: THREE.WebGLRenderer;
  directionalLight!: THREE.DirectionalLight;
  light1!: THREE.PointLight;
  light2!: THREE.PointLight;
  light3!: THREE.PointLight;
  light4!: THREE.PointLight;
  ele:any;

  ngOnInit(): void {
  }
  async ngAfterViewInit(): Promise<void> {
    await this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
  
  @ViewChild('testRef') private testRef:ElementRef | any;
  test1='assets/test.gltf';
  robot='assets/robot/scene.gltf';
  do='assets/do.gltf';

  /**
   * Create the scene
   * 
   *  @private
   *  @memeberof testComponent
   */
  async createScene(){
    //* Scene
    this.scene=new THREE.Scene();
    this.scene.background=new THREE.Color(0xd4d4d8);
    this.loaderGLTF.load(this.test1,(gltf:GLTF)=>{
      this.test=gltf.scene.children[0];
      console.log(this.test);
      //let box=new THREE.Box3().setFromObject(this.test);
      //box.getCenter(this.test.position);
      var helper = new THREE.BoxHelper(this.test, 0xff0000);
      helper.update();
      this.test.position.multiplyScalar(-1);
      //this.test.position.set(0,0,0)
      this.test.scale.set(0.01,0.01,0.01);
      this.scene.add(gltf.scene.children[0]);
      this.scene.add(new THREE.AxesHelper(100));
      //this.scene.add(helper);
      
    });
    //*Camera
    let aspectRatio:any=this.getAspectRatio();
    this.camera=new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    this.camera.position.set(1000,1000,10000); // Set position like this
    //this.camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

    this.camera.position.z = -5
    

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
   * @memberof testComponent
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
    return this.testRef.nativeElement;
  }

  private getAspectRatio() {
    return window.innerWidth /window.innerHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof testComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: TestComponent = this;
    (function render(this:any) {
      component.renderer.render(component.scene, component.camera);
      component.animatetest();
      requestAnimationFrame(render);
      console.log("render",component.test);
    }());
  }

  private waitForElm(selector:any) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

   /**
   *Animate the test
   *
   * @private
   * @memberof testComponent
   */
   private animatetest() {
    if (this.test) {
      this.test.rotation.z += 0.005;
    }
  }

}
