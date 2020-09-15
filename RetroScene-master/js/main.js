'use strict';

import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";

//variables Globales
var container;
var sceneWidth, sceneHeight;
var scene;
var renderer;
var camera;
var controls;
var cube;

init();

function init() {

  createScene();
  update();

}

function createScene() {

  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;

  //Escena
  scene = new THREE.Scene();
  var skybox = new THREE.CubeTextureLoader().load( [

    
    

  ] );

  scene.background = "black";

  //Render

  renderer = new THREE.WebGLRenderer( { antialias:true, alpha:true  } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( sceneWidth, sceneHeight );

  //Canvas
  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  //Camara
  camera = new THREE.PerspectiveCamera( 30, sceneWidth / sceneHeight, 1, 10000); // para reducir o aumentar el campo de vision del plano
  camera.position.set( 0, 50, 500 ); //( las posiciones en x, y )
   
  //Luces
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 0, 10 );
  scene.add(light);

  var hemi = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
  hemi.position.set( 0, 0, 5);
  scene.add( hemi );

  //Controles
  controls = new OrbitControls( camera, renderer.domElement );
  
  controls.update();
  controls.maxDistance = 300;

  //
  var cubeGeo = new THREE.IcosahedronGeometry( 100, 1 );
  cubeGeo.computeFlatVertexNormals();
  var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xee1122 } );
  cube = new THREE.Mesh( cubeGeo, cubeMaterial );
  cube.position.z -= 1000;
  //scene.add( cube );
  createPlane()

}

function createPlane() {

  var group = new THREE.Group();
  const planeBlack = new THREE.PlaneGeometry( 1000, 1000, 1, 1 ); //plano 2
  const planeGeo = new THREE.PlaneGeometry( 1000, 1000, 32, 32 ); //plano 1
  planeBlack.rotateX( -Math.PI /2 );
  planeGeo.rotateX( -Math.PI /2 );
  var vertices = planeGeo.vertices;

  for( let i = 0; i < vertices.length; i++) {

    

  }

  planeGeo.faces.forEach( ( value ) => {

    const i = planeGeo.vertices[ value.a ];
    const j = planeGeo.vertices[ value.b ];
    const k = planeGeo.vertices[ value.c ];

    const maximo = Math.max( i.y, j.y, k.y );

   // if( maximo > 1 ) return value.color.set( "blue");
    value.color.set( "green" );

  } );

  planeGeo.verticesNeedUpdate = true;
  planeGeo.colorsNeedUpdate = true;

  const material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, wireframe: true});
  const material2 = new THREE.MeshBasicMaterial( { color: "black" } ); // para cambiar el color de la plataforma

  var mesh = new THREE.Mesh( planeGeo, material );

  group.add( new THREE.Mesh( planeBlack, material2 ) );
  group.add( mesh );
  scene.add( group );

}

function update(){

  requestAnimationFrame( update );
  render();

}

function render(){

  controls.update();
  
  camera.lookAt( cube.position )
  console.log( renderer.info.render.calls );
  renderer.render( scene, camera );
  

}
