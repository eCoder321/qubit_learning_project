import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { RotateCcw } from 'lucide-react';
import Tooltip from './Tooltip';

const SpinningCoin: React.FC<{ isSpinning: boolean; result: 'heads' | 'tails' | null }> = ({ isSpinning, result }) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      if (isSpinning) {
        group.current.rotation.y += delta * 35;
        group.current.rotation.x = Math.PI / 4; 
      } else if (result) {
        // Smoothly orient to show the result face
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, result === 'heads' ? 0 : Math.PI, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.1);
      }
    }
  });

  return (
    <group ref={group}>
      {/* Edge */}
      <Cylinder args={[1.15, 1.15, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Heads Face (1) */}
      <Cylinder args={[1.09, 1.09, 0.21, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Text position={[0, 0, 0.12]} fontSize={0.6} color="white" rotation={[0, 0, 0]}>1</Text>
      
      {/* Tails Face (0) */}
      <Cylinder args={[1.09, 1.09, 0.21, 32]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Text position={[0, 0, -0.12]} fontSize={0.6} color="black" rotation={[0, Math.PI, 0]}>0</Text>
    </group>
  );
};

const QubitModule: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isSpinning, setIsSpinning] = useState(true); // Start spinning
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [measurements, setMeasurements] = useState({ heads: 0, tails: 0 });
  const [history, setHistory] = useState<('heads' | 'tails')[]>([]);
  const [classicalState, setClassicalState] = useState<'0' | '1'>('0');

  const handleMeasure = () => {
    if (!isSpinning) return; // Already measured
    
    setIsSpinning(false);
    const outcome = (Math.random() > 0.5 ? 'heads' : 'tails') as 'heads' | 'tails';
    setResult(outcome);
    setMeasurements(prev => ({ ...prev, [outcome]: prev[outcome] + 1 }));
    setHistory(prev => [outcome, ...prev].slice(0, 10));
  };

  const handleSpinAgain = () => {
    setIsSpinning(true);
    setResult(null);
  };

  const resetStats = () => {
    setMeasurements({ heads: 0, tails: 0 });
    setHistory([]);
    setResult(null);
    setIsSpinning(true);
  };

  const data = [
    { name: 'Heads', value: measurements.heads },
    { name: 'Tails', value: measurements.tails },
  ];
  const COLORS = ['#fbbf24', '#e2e8f0'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans">
      <button onClick={onBack} className="mb-4 text-sky-400 hover:text-sky-300">← Back to Journey</button>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">What is a Qubit?</h1>
        <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl">
          A qubit is the fundamental unit of quantum information. Unlike a classical bit that can only be 0 or 1, a qubit can exist in a <Tooltip text="Plain English: It means the qubit is in a state that is a weighted sum of both 0 and 1 at the same time, rather than being just one or the other.">linear combination</Tooltip> of both states simultaneously.
        </p>

        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Classical Side */}
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-8 text-white">Classical Bit</h2>
            <div 
              className={`w-32 h-32 rounded-full flex items-center justify-center font-bold text-4xl cursor-pointer transition-all duration-300 ${
                classicalState === '0' ? 'bg-slate-200 text-slate-800' : 'bg-sky-500 text-white'
              }`}
              onClick={() => setClassicalState(prev => prev === '0' ? '1' : '0')}
            >
              {classicalState}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400 max-w-xs">
              Click the coin to flip it. A classical bit is definite and static—it is either 0 or 1.
            </p>
          </div>

          {/* Quantum Side + Experiment */}
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-8 text-white">Quantum Bit (Qubit)</h2>
            <div className="w-32 h-32 mb-6">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <SpinningCoin isSpinning={isSpinning} result={result} />
              </Canvas>
            </div>
            <p className="text-center text-sm text-slate-400 max-w-xs mb-8">
              A qubit in superposition is like a spinning coin—a blur of both states until measured.
            </p>

            {/* Experiment Controls */}
            <div className="w-full pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Measurement</h3>
                <button onClick={resetStats} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={isSpinning ? handleMeasure : handleSpinAgain}
                  className="px-8 py-3 bg-sky-600 hover:bg-sky-700 rounded-full font-bold transition-colors w-full"
                >
                  {isSpinning ? 'Measure Qubit' : 'Spin Again'}
                </button>

                <div className="w-full h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* History Log */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">History</h4>
                <div className="flex gap-1 font-mono text-xs flex-wrap">
                  {history.map((h, i) => (
                    <span key={i} className={`px-2 py-1 rounded ${h === 'heads' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'}`}>
                      {h === 'heads' ? 'H' : 'T'}
                    </span>
                  ))}
                  {history.length === 0 && <span className="text-slate-600 italic">No measurements...</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QubitModule;
