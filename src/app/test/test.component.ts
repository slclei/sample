import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GUI } from 'dat.gui';
import { state } from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

//04212023 working
export class TestComponent implements OnInit, AfterViewInit {
  scene!: THREE.Scene;
  loaderGLTF: any = new GLTFLoader();
  test!: THREE.Object3D<THREE.Event>;
  camera!: THREE.PerspectiveCamera;
  fieldOfView: number | undefined = 30;
  nearClippingPane: number | undefined = 1;
  farClippingPane: number | undefined = 10000;
  ambientLight!: THREE.AmbientLight;
  controls!: OrbitControls;
  renderer!: THREE.WebGLRenderer;
  directionalLight!: THREE.DirectionalLight;
  light1!: THREE.PointLight;
  light2!: THREE.PointLight;
  light3!: THREE.PointLight;
  light4!: THREE.PointLight;
  light5!:any;
  light6:any;
  ele: any;
  directionalLight2!: THREE.DirectionalLight;
  gui:any;
  cp=document.getElementById("canvas-P");

  ngOnInit(): void {
  }
  async ngAfterViewInit(): Promise<void> {
    await this.createScene();
    this.startRenderingLoop();
    this.createControls();
    this.addGUI();
  }

  @ViewChild('testRef') private testRef: ElementRef | any;
  test1 = 'assets/test.gltf';
  robot = 'assets/robot/scene.gltf';
  do = 'assets/do.gltf';

  /**
   * Create the scene
   * 
   *  @private
   *  @memeberof testComponent
   */
  async createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
    this.loaderGLTF.load(this.test1, (gltf: GLTF) => {
      this.test = gltf.scene.children[0];
      //let box=new THREE.Box3().setFromObject(this.test);
      //box.getCenter(this.test.position);
      var helper = new THREE.BoxHelper(this.test, 0xff0000);
      helper.update();
      this.test.position.multiplyScalar(-1);
      this.test.position.set(-300, -0,-300)
      this.test.scale.set(0.02, 0.02, 0.02);
      this.scene.add(gltf.scene.children[0]);
      this.scene.add(new THREE.AxesHelper(400));
      this.scene.add(helper);

    });
    //*Camera
    let aspectRatio: any = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    this.camera.position.set(500, 500, 500); // Set position like this
    this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Set look at coordinate like this

    //this.camera.position.z = -5


    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.ambientLight.name="Ambient Light";
    this.scene.add(this.ambientLight);



    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    this.directionalLight.position.set(0, 4, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.directionalLight2 = new THREE.DirectionalLight(0xffdf04, 4);
    this.directionalLight2.position.set(0, -4, 0);
    this.directionalLight2.castShadow = true;
    this.scene.add(this.directionalLight2);

    this.light1 = new THREE.PointLight(0x4b371c, 5);
    this.light1.position.set(0, 400, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 5);
    this.light2.position.set(500, 400, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 5);
    this.light3.position.set(0, 400, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 5);
    this.light4.position.set(-500, 500, 500);
    this.scene.add(this.light4);

    this.light5  = new THREE.AmbientLight(0x4b371c, 5);
    this.scene.add( this.light5 );

    this.light6  = new THREE.DirectionalLight(0x4b371c, 5);
    this.light6.position.set(0.5, 0, 0.866); // ~60º
    this.scene.add( this.light6);
  }

  /**
   * create controls
   * 
   * @private
   * @memberof testComponent
   */
  private createControls = () => {
    const renderer = new CSS2DRenderer();
    //get testRef document
    const testD=this.canvas
    renderer.setSize(testD.clientWidth, testD.clientHeight);
    renderer.domElement.style.position = 'relative';
    renderer.domElement.style.top = '0px';
    testD.parentElement!.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();

  }

  private get canvas(): HTMLCanvasElement {
    console.log(this.testRef.nativeElement,this.testRef.nativeElement.clientWidth);
    return this.testRef.nativeElement;
  }

  private getAspectRatio() {
    return window.innerWidth / window.innerHeight;
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
    (function render(this: any) {
      component.renderer.render(component.scene, component.camera);
      //component.animatetest();
      requestAnimationFrame(render);
      component.renderer.toneMapping = THREE.LinearToneMapping;
      component.renderer.toneMappingExposure = Math.pow(2, -1.41);
    }());
  }

  //function to wait for some selector
  private waitForElm(selector: any) {
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

  //add dat gui to the scene
  private addGUI(){
    const gui=this.gui=new GUI({autoPlace:false, width:260,hideable:true});

    const cameraFolder=gui.addFolder('Camera');
    cameraFolder.add(this.camera.position,'z',0,10);
    cameraFolder.open();

    const lightFolder=gui.addFolder('Lighting');
    lightFolder.add(this.ambientLight,'intensity',0,10,1);
    lightFolder.add(this.renderer,'toneMappingExposure',-10,10,0.01)
    lightFolder.addColor(this.directionalLight,'color');

    const guiWrap:any = document.getElementById('gui-wrap');
    guiWrap.appendChild(gui.domElement);
    gui.open();
  }

}
