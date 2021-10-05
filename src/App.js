import * as THREE from "three";
import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import './App.css';
import './Styles/main.css';
import Header from './Components/Header';
import { BsArrowUpRight } from "react-icons/bs";
import './Aeonik Font/stylesheet.css';
import gsap from 'gsap';
import { tSDeclareFunction } from "@babel/types";
import Intro from "./Components/Intro";
import Cursor from "./Components/Cursor";


const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  glsl`
    precision mediump float;
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    void main() {
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 1.2;
      float noiseAmp = 0.1;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      vWave = pos.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  glsl`
    precision mediump float;
    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vWave;
    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUv + wave).rgb;
      gl_FragColor = vec4(texture, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  ]);

  return (
    <mesh>
      <planeBufferGeometry args={[1.4, 1.6, 16, 16]} />
      <waveShaderMaterial uColor={"red"} ref={ref} uTexture={image} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ fov: 14, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
};

const App = () => {

  useEffect(() => {

    gsap.to("body", 0, { css: { visibility: "visible" } });

    const tl = gsap.timeline();

    tl
      .from(".intro-text", 1.8, {
        opacity: 0,
        y: 200,
        skewY: 5,
        ease: "power4.out",
      })
      .to(".intro", 1.6, {
        y: '-100%',
        delay: 1.4,
        ease: "power4.out",
      })
      .from(".content-text, .content-desc, .button", 1.8, {
        opacity: 0,
        ease: "power4.out",
        delay: 0.1,
        skewY: 7,
        y: 100,
        stagger: {
          amount: 0.3
        }
      })
      .to(".scene-overlay", 1.6, {
        height: 0,
        ease: 'expo.inOut',
        delay: -2.5,
      })
      .fromTo(".nav-link, .nav-logo", 1.6, {
        opacity: 0,
      }, {
        opacity: 1,
        delay: -2,
        ease: "power4.in",
        stagger: {
          amount: 0.3
        }
      })


  }, []);

  return (
    <>
      <Cursor />
      <Intro />
      <Header />
      <div className="layOut-flex">
        <div className="container">
          <div className="layOut-wrap">
            <div className="layOut-content">
              <div className="content-sub content-text">
                Cleanser
              </div>
              <div className="content-title small content-text">
                OMEGA
              </div>
              <div className="content-title large content-text">
                COMPLEX
              </div>
              <div className="content-desc">
                A triple-action cleansing balm made with omegas 3, 6 and 9 to cleanse, soften and soothe while rinsing completely clean.
              </div>
              <a href="#" className="button">Shop Now
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 2C28 0.895431 27.1046 0 26 0H8C6.89543 0 6 0.895431 6 2C6 3.10457 6.89543 4 8 4H24V20C24 21.1046 24.8954 22 26 22C27.1046 22 28 21.1046 28 20V2ZM3.41421 27.4142L27.4142 3.41421L24.5858 0.585786L0.585786 24.5858L3.41421 27.4142Z" fill="#FFF8F2" />
                </svg></a>

            </div>
            <div className="layOut-scene">
              <div className="scene-overlay"></div>
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
