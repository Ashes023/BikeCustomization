import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useStore } from '../store';
import * as THREE from 'three';

// This is a simplified electric bike model using primitive shapes
export const Bike: React.FC = () => {
  const { 
    frameColor, 
    wheelColor, 
    handlebarColor, 
    seatColor,
    batteryColor,
    motorColor,
    wheelSize,
    frameType,
    handlebarType,
    seatType,
    batteryType,
    motorPower
  } = useStore();
  
  const group = useRef<THREE.Group>(null);
  
  // Scale factor based on wheel size
  const wheelScale = wheelSize / 29;
  
  // Frame geometry based on frame type
  const getFrameGeometry = () => {
    switch (frameType) {
      case 'Mountain':
        return { 
          topTubeAngle: -0.1,
          seatStayLength: 1.2,
          bottomBracketDrop: -0.2,
          frameThickness: 0.06
        };
      case 'City':
        return { 
          topTubeAngle: -0.15,
          seatStayLength: 1.0,
          bottomBracketDrop: -0.1,
          frameThickness: 0.05
        };
      case 'Folding':
        return { 
          topTubeAngle: -0.2,
          seatStayLength: 0.9,
          bottomBracketDrop: -0.15,
          frameThickness: 0.04
        };
      case 'Cargo':
        return { 
          topTubeAngle: -0.05,
          seatStayLength: 1.3,
          bottomBracketDrop: -0.05,
          frameThickness: 0.07
        };
      default:
        return { 
          topTubeAngle: -0.1,
          seatStayLength: 1.0,
          bottomBracketDrop: -0.1,
          frameThickness: 0.05
        };
    }
  };
  
  // Handlebar geometry based on handlebar type
  const getHandlebarGeometry = () => {
    switch (handlebarType) {
      case 'Cruiser':
        return { 
          width: 0.8,
          height: 0.15,
          sweep: 0.2
        };
      case 'Flat':
        return { 
          width: 0.7,
          height: 0,
          sweep: 0
        };
      case 'Riser':
        return { 
          width: 0.75,
          height: 0.1,
          sweep: 0.05
        };
      case 'Bullhorn':
        return { 
          width: 0.7,
          height: 0.05,
          sweep: 0.2
        };
      default:
        return { 
          width: 0.7,
          height: 0,
          sweep: 0
        };
    }
  };
  
  // Seat geometry based on seat type
  const getSeatGeometry = () => {
    switch (seatType) {
      case 'Sport':
        return { 
          width: 0.2,
          length: 0.4,
          height: 0.05
        };
      case 'Comfort':
        return { 
          width: 0.3,
          length: 0.5,
          height: 0.08
        };
      case 'Cruiser':
        return { 
          width: 0.35,
          length: 0.55,
          height: 0.1
        };
      case 'Ergonomic':
        return { 
          width: 0.28,
          length: 0.48,
          height: 0.09
        };
      default:
        return { 
          width: 0.25,
          length: 0.45,
          height: 0.06
        };
    }
  };
  
  // Battery geometry based on battery type
  const getBatteryGeometry = () => {
    switch (batteryType) {
      case 'Integrated':
        return { 
          position: [0.1, 0.3, 0],
          size: [0.5, 0.1, 0.15]
        };
      case 'External':
        return { 
          position: [0.3, 0.1, 0],
          size: [0.4, 0.2, 0.15]
        };
      case 'Dual':
        return { 
          position: [0.2, 0.2, 0],
          size: [0.3, 0.15, 0.2]
        };
      case 'Removable':
        return { 
          position: [0.3, 0.0, 0],
          size: [0.35, 0.18, 0.16]
        };
      default:
        return { 
          position: [0.2, 0.2, 0],
          size: [0.4, 0.15, 0.15]
        };
    }
  };
  
  // Motor size based on power
  const getMotorSize = () => {
    const baseSize = 0.15;
    const powerFactor = motorPower / 500;
    return baseSize * (0.8 + (powerFactor * 0.4));
  };
  
  const frameGeometry = getFrameGeometry();
  const handlebarGeometry = getHandlebarGeometry();
  const seatGeometry = getSeatGeometry();
  const batteryGeometry = getBatteryGeometry();
  const motorSize = getMotorSize();
  
  // Subtle animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
  });
  
  return (
    <group ref={group} position={[0, 0, 0]} scale={[0.7, 0.7, 0.7]}>
      {/* Frame */}
      <group>
        {/* Bottom Tube */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[frameGeometry.frameThickness, frameGeometry.frameThickness, 1.5, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[frameGeometry.frameThickness, frameGeometry.frameThickness, 1.5, 16]} />
            <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
          </mesh>
        </mesh>
        
        {/* Top Tube */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]} rotation={[0, 0, frameGeometry.topTubeAngle]}>
          <cylinderGeometry args={[frameGeometry.frameThickness, frameGeometry.frameThickness, 1.2, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
        </mesh>
        
        {/* Seat Tube */}
        <mesh castShadow receiveShadow position={[0.6, 0.3, 0]} rotation={[0, 0, Math.PI / 2 - 0.2]}>
          <cylinderGeometry args={[frameGeometry.frameThickness, frameGeometry.frameThickness, frameGeometry.seatStayLength, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
        </mesh>
        
        {/* Head Tube */}
        <mesh castShadow receiveShadow position={[-0.6, 0.3, 0]} rotation={[0, 0, Math.PI / 2 + 0.1]}>
          <cylinderGeometry args={[frameGeometry.frameThickness + 0.01, frameGeometry.frameThickness + 0.01, 0.4, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
        </mesh>
        
        {/* Chain Stay */}
        <mesh castShadow receiveShadow position={[0.5, frameGeometry.bottomBracketDrop, 0.1]} rotation={[0, 0.3, 0]}>
          <cylinderGeometry args={[frameGeometry.frameThickness - 0.02, frameGeometry.frameThickness - 0.02, 0.8, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh castShadow receiveShadow position={[0.5, frameGeometry.bottomBracketDrop, -0.1]} rotation={[0, -0.3, 0]}>
          <cylinderGeometry args={[frameGeometry.frameThickness - 0.02, frameGeometry.frameThickness - 0.02, 0.8, 16]} />
          <meshStandardMaterial color={frameColor.color} metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Front Wheel */}
      <group position={[-0.8, -0.3, 0]} scale={[wheelScale, wheelScale, wheelScale]}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.4, 0.05, 16, 32]} />
          <meshStandardMaterial color={wheelColor.color} metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`spoke-front-${i}`} castShadow receiveShadow rotation={[0, 0, (Math.PI * i) / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Hub */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Rear Wheel */}
      <group position={[0.8, -0.3, 0]} scale={[wheelScale, wheelScale, wheelScale]}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.4, 0.05, 16, 32]} />
          <meshStandardMaterial color={wheelColor.color} metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`spoke-rear-${i}`} castShadow receiveShadow rotation={[0, 0, (Math.PI * i) / 4]}>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Hub */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Electric Motor (Rear Hub) */}
      <group position={[0.8, -0.3, 0.1]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[motorSize, motorSize, 0.15, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={motorColor.color} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Motor Details */}
        <mesh castShadow receiveShadow position={[0, 0, 0.08]}>
          <cylinderGeometry args={[motorSize * 0.7, motorSize * 0.7, 0.02, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Power Cable */}
        <mesh castShadow receiveShadow position={[0, 0.1, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
      
      {/* Battery Pack */}
      <group position={batteryGeometry.position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={batteryGeometry.size} />
          <meshStandardMaterial color={batteryColor.color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Battery Details */}
        <mesh castShadow receiveShadow position={[0, batteryGeometry.size[1]/2 + 0.01, 0]}>
          <boxGeometry args={[batteryGeometry.size[0] * 0.8, 0.02, batteryGeometry.size[2] * 0.8]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Battery Indicator */}
        <mesh castShadow receiveShadow position={[batteryGeometry.size[0]/2 - 0.05, batteryGeometry.size[1]/2 + 0.02, 0]}>
          <boxGeometry args={[0.05, 0.01, 0.05]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      </group>
      
      {/* Controller Box (under the frame) */}
      <mesh castShadow receiveShadow position={[0.1, -0.1, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.15]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Handlebar */}
      <group position={[-0.6, 0.5, 0]}>
        {/* Stem */}
        <mesh castShadow receiveShadow position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
          <meshStandardMaterial color={handlebarColor.color} metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Handlebar */}
        <mesh castShadow receiveShadow position={[0, 0.2 + handlebarGeometry.height, 0]}>
          <cylinderGeometry args={[0.03, 0.03, handlebarGeometry.width, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={handlebarColor.color} metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Handlebar Grips */}
        <mesh castShadow receiveShadow position={[0, 0.2 + handlebarGeometry.height, handlebarGeometry.width/2 - 0.1]}>
          <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.9} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.2 + handlebarGeometry.height, -handlebarGeometry.width/2 + 0.1]}>
          <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.9} />
        </mesh>
        
        {/* Control Display */}
        <mesh castShadow receiveShadow position={[0, 0.25 + handlebarGeometry.height, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.05]} />
          <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.25 + handlebarGeometry.height, 0.001]}>
          <boxGeometry args={[0.12, 0.06, 0.01]} />
          <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Throttle */}
        <mesh castShadow receiveShadow position={[0, 0.2 + handlebarGeometry.height, handlebarGeometry.width/2 - 0.15]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
      
      {/* Seat */}
      <group position={[0.6, 0.8, 0]}>
        {/* Seat Post */}
        <mesh castShadow receiveShadow position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Seat */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[seatGeometry.length, seatGeometry.height, seatGeometry.width]} />
          <meshStandardMaterial color={seatColor.color} metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
      
      {/* Pedals and Crankset */}
      <group position={[0.1, -0.3, 0]}>
        {/* Chainring */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Crank Arms */}
        <mesh castShadow receiveShadow position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0, -0.05]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Pedals */}
        <mesh castShadow receiveShadow position={[0.15, -0.15, 0.07]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.05]} />
          <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.15, 0.15, -0.07]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.05]} />
          <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
      
      {/* Lights */}
      <mesh castShadow receiveShadow position={[-0.8, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.03, 0.05, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.8, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.02, 0.04, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};