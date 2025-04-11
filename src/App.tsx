import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Bike } from './components/Bike';
import { CustomizationPanel } from './components/CustomizationPanel';
import { Header } from './components/Header';
import { useStore } from './store';
import { AuthPage } from './components/Authpage';
import {MainPage} from './components/mainpage'


function App() {
  const { cameraPosition } = useStore();

  // 👇 Manage simple login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // If user is not authenticated, show auth page
  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          <Canvas
            shadows
            camera={{ position: cameraPosition, fov: 50 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <color attach="background" args={['#111']} />
            <fog attach="fog" args={['#111', 10, 20]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow shadow-mapSize={2048} />
            <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
            <Environment preset="city" />
            <ContactShadows position={[0, -0.8, 0]} opacity={0.7} scale={10} blur={2.5} far={1} />
            <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
            <Bike />
          </Canvas>

          {/* Camera Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button onClick={() => useStore.setState({ cameraPosition: [5, 2, 5] })} className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm">Front</button>
            <button onClick={() => useStore.setState({ cameraPosition: [0, 2, 5] })} className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm">Side</button>
            <button onClick={() => useStore.setState({ cameraPosition: [0, 5, 0] })} className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm">Top</button>
          </div>
        </div>

        {/* Customization Panel */}
        <CustomizationPanel />
      </div>
    </div>
  );
}

export default App;