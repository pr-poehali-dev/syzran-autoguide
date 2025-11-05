import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Car = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.6, 2.4]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, -0.2]}>
        <boxGeometry args={[1.1, 0.5, 1.2]} />
        <meshStandardMaterial color="#1e40af" opacity={0.7} transparent />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.5, 0.1, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.5, 0.1, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.5, 0.1, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <pointLight position={[0.7, 0.4, 1.3]} intensity={2} distance={5} color="#ffffff" />
      <pointLight position={[-0.7, 0.4, 1.3]} intensity={2} distance={5} color="#ffffff" />
    </group>
  );
};

const Road = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 200]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, i * 10 - 100]}>
          <planeGeometry args={[0.3, 4]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      ))}
    </group>
  );
};

const Building = ({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const CityEnvironment = () => {
  return (
    <>
      <Building position={[-15, 3, 0]} size={[8, 6, 12]} color="#64748b" />
      <Building position={[15, 4, -10]} size={[10, 8, 15]} color="#475569" />
      <Building position={[-18, 5, -30]} size={[12, 10, 20]} color="#334155" />
      <Building position={[17, 3.5, -50]} size={[9, 7, 14]} color="#1e293b" />
      <Building position={[-16, 4, -70]} size={[11, 8, 18]} color="#475569" />
      <Building position={[14, 2.5, 20]} size={[7, 5, 10]} color="#64748b" />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
    </>
  );
};

const SpeedCamera = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#525252" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const TrafficLight = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 5]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[0, 5.5, 0.11]}>
        <circleGeometry args={[0.1]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 5.2, 0.11]}>
        <circleGeometry args={[0.1]} />
        <meshStandardMaterial color="#eab308" />
      </mesh>
      <mesh position={[0, 4.9, 0.11]}>
        <circleGeometry args={[0.1]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  );
};

const GameScene = ({ carPosition, carRotation }: { carPosition: [number, number, number]; carRotation: [number, number, number] }) => {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <CityEnvironment />
      <Road />
      
      <SpeedCamera position={[8, 0, -20]} />
      <SpeedCamera position={[-8, 0, -60]} />
      <TrafficLight position={[6, 0, -40]} />
      <TrafficLight position={[-6, 0, -80]} />
      
      <Car position={carPosition} rotation={carRotation} />
      
      <PerspectiveCamera makeDefault position={[0, 8, 15]} />
    </>
  );
};

const Index = () => {
  const [carPosition, setCarPosition] = useState<[number, number, number]>([0, 0.3, 0]);
  const [carRotation, setCarRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

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
        newSpeed = Math.min(newSpeed + 0.5, 20);
      } else if (keys['s'] || keys['arrowdown']) {
        newSpeed = Math.max(newSpeed - 0.5, -10);
      } else {
        newSpeed *= 0.95;
        if (Math.abs(newSpeed) < 0.1) newSpeed = 0;
      }

      if (keys['a'] || keys['arrowleft']) {
        ry += 0.05;
      }
      if (keys['d'] || keys['arrowright']) {
        ry -= 0.05;
      }

      z -= newSpeed * Math.cos(ry) * 0.1;
      x -= newSpeed * Math.sin(ry) * 0.1;

      if (x > 6) x = 6;
      if (x < -6) x = -6;

      setCarPosition([x, y, z]);
      setCarRotation([rx, ry, rz]);
      setSpeed(newSpeed);

      if (newSpeed !== 0) {
        setScore(prev => prev + Math.abs(newSpeed) * 0.1);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, speed, carPosition, carRotation]);

  return (
    <div className="min-h-screen bg-secondary relative">
      {!gameStarted ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
          <Card className="p-8 max-w-md text-center space-y-6 shadow-2xl">
            <div className="text-6xl mb-4">🚗</div>
            <h1 className="text-4xl font-bold">Сызрань Драйв</h1>
            <p className="text-muted-foreground text-lg">
              3D симулятор вождения по городу Сызрань
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">W / ↑</Badge>
                <span className="text-sm">Газ</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">S / ↓</Badge>
                <span className="text-sm">Тормоз</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">A / ←</Badge>
                <span className="text-sm">Влево</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">D / →</Badge>
                <span className="text-sm">Вправо</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg gap-2"
              onClick={() => setGameStarted(true)}
            >
              <Icon name="Play" size={24} />
              Начать игру
            </Button>
          </Card>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <Card className="p-4 bg-black/70 text-white border-primary">
              <div className="flex items-center gap-3">
                <Icon name="Gauge" size={24} className="text-primary" />
                <div>
                  <div className="text-xs text-gray-400">Скорость</div>
                  <div className="text-2xl font-bold">
                    {Math.abs(Math.round(speed * 5))} км/ч
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-black/70 text-white border-yellow-500">
              <div className="flex items-center gap-3">
                <Icon name="Trophy" size={24} className="text-yellow-500" />
                <div>
                  <div className="text-xs text-gray-400">Очки</div>
                  <div className="text-2xl font-bold">
                    {Math.round(score)}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <Card className="p-3 bg-black/70 text-white">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Камера</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Светофор</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <Card className="p-3 bg-black/80 text-white border-0">
              <div className="flex gap-4 items-center text-xs">
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-white border-white/50">W</Badge>
                  <span>Газ</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-white border-white/50">A</Badge>
                  <Badge variant="outline" className="text-white border-white/50">D</Badge>
                  <span>Поворот</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-white border-white/50">S</Badge>
                  <span>Тормоз</span>
                </div>
              </div>
            </Card>
          </div>

          <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
            <GameScene carPosition={carPosition} carRotation={carRotation} />
            <OrbitControls 
              enabled={false}
              target={[carPosition[0], carPosition[1], carPosition[2] - 5]}
              position={[carPosition[0], carPosition[1] + 5, carPosition[2] + 10]}
            />
          </Canvas>
        </>
      )}
    </div>
  );
};

export default Index;
