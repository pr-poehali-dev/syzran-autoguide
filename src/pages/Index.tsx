import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sky, Environment } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const RealisticCar = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.7, 4.2]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      <mesh position={[0, 1, 0.3]} castShadow>
        <boxGeometry args={[1.7, 0.7, 2.2]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.3}
          roughness={0.4}
          opacity={0.3}
          transparent
        />
      </mesh>
      
      <mesh position={[0, 0.3, 2.2]} castShadow>
        <boxGeometry args={[1.8, 0.4, 0.3]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-0.7, 0.2, 1.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.2, 1.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 0.2, -1.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.2, -1.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>
      
      <mesh position={[-0.7, 0.2, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.2, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.7, 0.2, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.2, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      <pointLight position={[0.8, 0.5, 2.3]} intensity={15} distance={25} color="#ffffff" castShadow />
      <pointLight position={[-0.8, 0.5, 2.3]} intensity={15} distance={25} color="#ffffff" castShadow />
      
      <mesh position={[0.9, 0.5, -2.1]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.9, 0.5, -2.1]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const DetailedRoad = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 500]} />
        <meshStandardMaterial color="#2c2c34" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0.01, 0]} receiveShadow>
        <planeGeometry args={[4, 500]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.01, 0]} receiveShadow>
        <planeGeometry args={[4, 500]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.8} />
      </mesh>
      
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, i * 10 - 250]}>
          <planeGeometry args={[0.3, 5]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.2} />
        </mesh>
      ))}
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6.8, 0.02, 0]}>
        <planeGeometry args={[0.15, 500]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6.8, 0.02, 0]}>
        <planeGeometry args={[0.15, 500]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const DetailedBuilding = ({ 
  position, 
  size, 
  color,
  windowsLit = true 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color: string;
  windowsLit?: boolean;
}) => {
  const windowsX = Math.floor(size[0] / 1.5);
  const windowsY = Math.floor(size[1] / 2);
  
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      
      {Array.from({ length: windowsX }).map((_, x) =>
        Array.from({ length: windowsY }).map((_, y) => {
          const isLit = windowsLit && Math.random() > 0.3;
          return (
            <mesh
              key={`window-${x}-${y}`}
              position={[
                (x - windowsX / 2) * 1.5 + 0.75,
                (y - windowsY / 2) * 2 + 1,
                size[2] / 2 + 0.01
              ]}
            >
              <planeGeometry args={[0.8, 1.2]} />
              <meshStandardMaterial
                color={isLit ? "#fef3c7" : "#1e293b"}
                emissive={isLit ? "#fef3c7" : "#000000"}
                emissiveIntensity={isLit ? 0.8 : 0}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

const CityOfSyzran = () => {
  return (
    <>
      <DetailedBuilding position={[-18, 6, 0]} size={[12, 12, 15]} color="#475569" />
      <DetailedBuilding position={[18, 8, -20]} size={[14, 16, 18]} color="#334155" />
      <DetailedBuilding position={[-20, 10, -50]} size={[16, 20, 22]} color="#1e293b" />
      <DetailedBuilding position={[19, 7, -80]} size={[13, 14, 20]} color="#475569" />
      <DetailedBuilding position={[-17, 9, -110]} size={[15, 18, 19]} color="#64748b" />
      <DetailedBuilding position={[21, 5, -140]} size={[11, 10, 16]} color="#334155" />
      
      <DetailedBuilding position={[18, 5, 30]} size={[12, 10, 14]} color="#64748b" windowsLit={false} />
      <DetailedBuilding position={[-19, 7, 50]} size={[13, 14, 17]} color="#475569" />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[300, 500]} />
        <meshStandardMaterial color="#166534" roughness={0.95} />
      </mesh>
      
      {Array.from({ length: 15 }).map((_, i) => (
        <group key={`tree-${i}`} position={[
          (i % 2 === 0 ? -12 : 12) + (Math.random() - 0.5) * 2,
          0,
          i * 30 - 150
        ]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.5, 0]} castShadow>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </>
  );
};

const StreetLight = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.12, 6]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#fef3c7" 
          emissive="#fef3c7" 
          emissiveIntensity={1.5}
        />
      </mesh>
      <pointLight position={[0, 3, 0]} intensity={25} distance={15} color="#fef3c7" castShadow />
    </group>
  );
};

const CameraFollow = ({ target }: { target: [number, number, number] }) => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  
  useFrame(() => {
    if (camera.current) {
      const targetPosition = new THREE.Vector3(target[0], target[1] + 4, target[2] + 12);
      camera.current.position.lerp(targetPosition, 0.05);
      camera.current.lookAt(target[0], target[1] + 1, target[2] - 3);
    }
  });
  
  return <PerspectiveCamera ref={camera} makeDefault position={[0, 4, 12]} fov={65} />;
};

const GameScene = ({ carPosition, carRotation }: { carPosition: [number, number, number]; carRotation: [number, number, number] }) => {
  return (
    <>
      <Sky 
        sunPosition={[50, 10, 100]} 
        turbidity={8}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      <fog attach="fog" args={['#0a192f', 50, 150]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      <hemisphereLight args={['#87ceeb', '#3b4d61', 0.6]} />
      
      <CityOfSyzran />
      <DetailedRoad />
      
      {Array.from({ length: 20 }).map((_, i) => (
        <StreetLight key={`light-${i}`} position={[-10, 3, i * 25 - 200]} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <StreetLight key={`light-r-${i}`} position={[10, 3, i * 25 - 200]} />
      ))}
      
      <RealisticCar position={carPosition} rotation={carRotation} />
      
      <CameraFollow target={carPosition} />
      
      <Environment preset="night" />
    </>
  );
};

const Index = () => {
  const [carPosition, setCarPosition] = useState<[number, number, number]>([0, 0.4, 0]);
  const [carRotation, setCarRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      const keys = keysPressed.current;
      let newSpeed = speed;
      let [x, y, z] = carPosition;
      let [rx, ry, rz] = carRotation;

      if (keys['w'] || keys['arrowup']) {
        newSpeed = Math.min(newSpeed + 0.3, 25);
      } else if (keys['s'] || keys['arrowdown']) {
        newSpeed = Math.max(newSpeed - 0.5, -8);
      } else {
        newSpeed *= 0.97;
        if (Math.abs(newSpeed) < 0.1) newSpeed = 0;
      }

      const turnSpeed = 0.03 * (Math.abs(newSpeed) / 10);
      
      if ((keys['a'] || keys['arrowleft']) && Math.abs(newSpeed) > 0.5) {
        ry += turnSpeed;
      }
      if ((keys['d'] || keys['arrowright']) && Math.abs(newSpeed) > 0.5) {
        ry -= turnSpeed;
      }

      z -= newSpeed * Math.cos(ry) * 0.08;
      x -= newSpeed * Math.sin(ry) * 0.08;

      if (x > 6) x = 6;
      if (x < -6) x = -6;

      setCarPosition([x, y, z]);
      setCarRotation([rx, ry, rz]);
      setSpeed(newSpeed);
      
      if (newSpeed > 0) {
        setDistance(prev => prev + Math.abs(newSpeed) * 0.01);
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameStarted, speed, carPosition, carRotation]);

  const handleMobileControl = (direction: string, isPressed: boolean) => {
    keysPressed.current[direction] = isPressed;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative">
      {!gameStarted ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
          <Card className="p-8 max-w-lg w-full text-center space-y-6 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30">
            <div className="text-7xl mb-4">🏙️</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Виртуальный Сызрань
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Реалистичный 3D-симулятор вождения по ночному городу Сызрань
            </p>
            
            <div className="bg-slate-800/50 p-6 rounded-xl text-left space-y-3 border border-slate-700">
              <div className="text-center text-sm text-gray-400 mb-3 font-semibold">
                {isMobile ? 'СЕНСОРНОЕ УПРАВЛЕНИЕ' : 'УПРАВЛЕНИЕ'}
              </div>
              {!isMobile ? (
                <>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-500/20 border-blue-400 text-blue-300 px-3 py-1">W / ↑</Badge>
                    <span className="text-gray-300">Разогнаться</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-red-500/20 border-red-400 text-red-300 px-3 py-1">S / ↓</Badge>
                    <span className="text-gray-300">Затормозить</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-yellow-500/20 border-yellow-400 text-yellow-300 px-3 py-1">A / ←</Badge>
                    <span className="text-gray-300">Повернуть влево</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-yellow-500/20 border-yellow-400 text-yellow-300 px-3 py-1">D / →</Badge>
                    <span className="text-gray-300">Повернуть вправо</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-300 text-center">
                  Используйте кнопки управления на экране
                </p>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20">
              <p className="text-sm text-gray-300">
                ✨ Ночной город с освещением<br/>
                🏢 Детализированные здания<br/>
                🚗 Реалистичная физика автомобиля<br/>
                📱 Работает на ПК и мобильных устройствах
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full text-xl gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-6 shadow-xl"
              onClick={() => setGameStarted(true)}
            >
              <Icon name="Play" size={28} />
              Начать поездку
            </Button>
          </Card>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10 space-y-3">
            <Card className="p-4 bg-black/80 backdrop-blur-sm text-white border-blue-500/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <Icon name="Gauge" size={28} className="text-blue-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase">Скорость</div>
                  <div className="text-3xl font-bold text-blue-300">
                    {Math.abs(Math.round(speed * 6))} км/ч
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-black/80 backdrop-blur-sm text-white border-cyan-500/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={28} className="text-cyan-400" />
                <div>
                  <div className="text-xs text-gray-400 uppercase">Пройдено</div>
                  <div className="text-3xl font-bold text-cyan-300">
                    {distance.toFixed(1)} км
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <Card className="p-4 bg-black/80 backdrop-blur-sm text-white border-slate-500/50">
              <div className="space-y-2 text-sm">
                <div className="text-xs text-gray-400 uppercase mb-2">Легенда</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/50"></div>
                  <span>Фонари</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                  <span>Ваш автомобиль</span>
                </div>
              </div>
            </Card>
          </div>

          {isMobile && (
            <div className="absolute bottom-4 left-0 right-0 z-10 px-4">
              <div className="flex justify-between items-center max-w-lg mx-auto gap-4">
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="h-16 w-16 bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm border-2 border-blue-400/50 shadow-xl"
                    onTouchStart={() => handleMobileControl('w', true)}
                    onTouchEnd={() => handleMobileControl('w', false)}
                  >
                    <Icon name="ChevronUp" size={32} />
                  </Button>
                  <Button
                    size="lg"
                    className="h-16 w-16 bg-red-600/80 hover:bg-red-700/80 backdrop-blur-sm border-2 border-red-400/50 shadow-xl"
                    onTouchStart={() => handleMobileControl('s', true)}
                    onTouchEnd={() => handleMobileControl('s', false)}
                  >
                    <Icon name="ChevronDown" size={32} />
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="h-16 w-16 bg-yellow-600/80 hover:bg-yellow-700/80 backdrop-blur-sm border-2 border-yellow-400/50 shadow-xl"
                    onTouchStart={() => handleMobileControl('a', true)}
                    onTouchEnd={() => handleMobileControl('a', false)}
                  >
                    <Icon name="ChevronLeft" size={32} />
                  </Button>
                  <Button
                    size="lg"
                    className="h-16 w-16 bg-yellow-600/80 hover:bg-yellow-700/80 backdrop-blur-sm border-2 border-yellow-400/50 shadow-xl"
                    onTouchStart={() => handleMobileControl('d', true)}
                    onTouchEnd={() => handleMobileControl('d', false)}
                  >
                    <Icon name="ChevronRight" size={32} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Canvas 
            shadows 
            gl={{ 
              antialias: true,
              alpha: false,
              powerPreference: "high-performance"
            }}
          >
            <GameScene carPosition={carPosition} carRotation={carRotation} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={0.5} />
            </EffectComposer>
          </Canvas>
        </>
      )}
    </div>
  );
};

export default Index;
