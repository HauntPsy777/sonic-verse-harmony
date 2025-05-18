
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  audioData?: Uint8Array;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ audioData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0x9B87F5, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x9B87F5,
      wireframe: true
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.005;
        sphereRef.current.rotation.y += 0.005;
      }
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Update visualization with audio data
  useEffect(() => {
    if (!sphereRef.current || !audioData) return;

    // Calculate average frequency
    const average = audioData.reduce((acc, val) => acc + val, 0) / audioData.length;
    
    // Use audio data to modify the sphere
    if (average > 0) {
      const scale = 1 + (average / 255) * 0.3;
      sphereRef.current.scale.set(scale, scale, scale);
    }

    // Update particle colors based on audio frequency
    if (particlesRef.current && particlesRef.current.material instanceof THREE.PointsMaterial) {
      const material = particlesRef.current.material;
      
      // Change color based on frequency ranges
      if (average < 50) {
        material.color.setHex(0x00F5FF); // Neon blue for low frequencies
      } else if (average < 100) {
        material.color.setHex(0x9B87F5); // Neon purple for mid frequencies
      } else {
        material.color.setHex(0xFF00FF); // Neon pink for high frequencies
      }
    }
  }, [audioData]);

  return <div ref={containerRef} className="canvas-container" />;
};

export default ThreeScene;
