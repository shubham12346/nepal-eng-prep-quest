import { Question } from '../types/quiz';

export const sampleQuestions: Question[] = [
  {
    id: 'civil_001',
    question: 'What is the minimum grade of concrete recommended for reinforced concrete work?',
    options: ['M15', 'M20', 'M25', 'M30'],
    correctAnswer: 1,
    explanation: 'M20 grade concrete is the minimum grade recommended for reinforced concrete work as per IS codes.',
    difficulty: 'easy',
    subject: 'Civil Engineering',
    topic: 'Concrete Technology',
    isPremium: false
  },
  {
    id: 'civil_002',
    question: 'The maximum permissible deflection for a simply supported beam is:',
    options: ['L/250', 'L/300', 'L/350', 'L/400'],
    correctAnswer: 0,
    explanation: 'For simply supported beams, the maximum permissible deflection is L/250 where L is the effective span.',
    difficulty: 'medium',
    subject: 'Civil Engineering',
    topic: 'Structural Analysis',
    isPremium: false
  },
  {
    id: 'mech_001',
    question: 'In a four-stroke internal combustion engine, the power stroke occurs during:',
    options: ['Intake stroke', 'Compression stroke', 'Expansion stroke', 'Exhaust stroke'],
    correctAnswer: 2,
    explanation: 'The power stroke is the expansion stroke where the fuel-air mixture burns and pushes the piston down.',
    difficulty: 'easy',
    subject: 'Mechanical Engineering',
    topic: 'IC Engines',
    isPremium: false
  },
  {
    id: 'elec_001',
    question: 'Kirchhoff\'s Current Law (KCL) states that:',
    options: [
      'The sum of voltages in a closed loop is zero',
      'The sum of currents entering a node equals the sum leaving',
      'Voltage is proportional to current',
      'Power equals voltage times current'
    ],
    correctAnswer: 1,
    explanation: 'KCL states that the algebraic sum of currents entering a node equals the sum of currents leaving the node.',
    difficulty: 'easy',
    subject: 'Electrical Engineering',
    topic: 'Circuit Analysis',
    isPremium: false
  },
  {
    id: 'civil_003',
    question: 'The critical path in project management represents:',
    options: [
      'The shortest path through the project',
      'The most expensive path',
      'The longest path determining project duration',
      'The path with most resources'
    ],
    correctAnswer: 2,
    explanation: 'The critical path is the longest sequence of activities that determines the minimum project duration.',
    difficulty: 'medium',
    subject: 'Civil Engineering',
    topic: 'Project Management',
    isPremium: false
  },
  {
    id: 'mech_002',
    question: 'The efficiency of a Carnot engine depends on:',
    options: [
      'Working fluid type',
      'Engine size',
      'Temperature of hot and cold reservoirs',
      'Pressure of working fluid'
    ],
    correctAnswer: 2,
    explanation: 'Carnot engine efficiency depends only on the temperatures of the hot and cold reservoirs: η = 1 - Tc/Th',
    difficulty: 'medium',
    subject: 'Mechanical Engineering',
    topic: 'Thermodynamics',
    isPremium: false
  },
  {
    id: 'elec_002',
    question: 'In a transformer, the voltage ratio is directly proportional to:',
    options: ['Current ratio', 'Power ratio', 'Turns ratio', 'Resistance ratio'],
    correctAnswer: 2,
    explanation: 'In an ideal transformer, the voltage ratio equals the turns ratio: V1/V2 = N1/N2',
    difficulty: 'easy',
    subject: 'Electrical Engineering',
    topic: 'Transformers',
    isPremium: false
  },
  {
    id: 'comp_001',
    question: 'The time complexity of binary search algorithm is:',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.',
    difficulty: 'easy',
    subject: 'Computer Engineering',
    topic: 'Algorithms',
    isPremium: false
  },
  {
    id: 'civil_004',
    question: 'The factor of safety for steel structures as per IS codes is typically:',
    options: ['1.5', '1.75', '2.0', '2.25'],
    correctAnswer: 1,
    explanation: 'The factor of safety for steel structures is typically 1.75 as per Indian Standard codes.',
    difficulty: 'medium',
    subject: 'Civil Engineering',
    topic: 'Steel Structures',
    isPremium: false
  },
  {
    id: 'mech_003',
    question: 'Which of the following is NOT a type of gear?',
    options: ['Spur gear', 'Helical gear', 'Planetary gear', 'Hydraulic gear'],
    correctAnswer: 3,
    explanation: 'Hydraulic gear is not a type of mechanical gear. The others are common gear types used in mechanical systems.',
    difficulty: 'easy',
    subject: 'Mechanical Engineering',
    topic: 'Machine Design',
    isPremium: false
  }
];