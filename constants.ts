import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'qubits',
    title: 'Qubits & Superposition',
    description: 'The fundamental building block of quantum information. Learn about |0⟩, |1⟩, and the space in between.',
    category: 'Basics',
    difficulty: 'Beginner',
    status: 'coming-soon',
    icon: 'Binary'
  },
  {
    id: 'quantum-gates',
    title: 'Single-Qubit Gates',
    description: 'Manipulate quantum states using rotations on the Bloch Sphere. Explore X, Y, Z, and the powerful Hadamard gate.',
    category: 'Gates',
    difficulty: 'Beginner',
    status: 'available',
    icon: 'Activity'
  },
  {
    id: 'quantum-systems',
    title: 'Quantum Systems',
    description: 'How quantum states evolve over time and interact with their environment.',
    category: 'Systems',
    difficulty: 'Intermediate',
    status: 'coming-soon',
    icon: 'Layers'
  },
  {
    id: 'entanglement',
    title: 'Entanglement',
    description: 'Spooky action at a distance. Learn how two qubits can become inextricably linked.',
    category: 'Advanced',
    difficulty: 'Advanced',
    status: 'coming-soon',
    icon: 'Link'
  }
];
