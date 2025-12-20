
export interface Issue {
  area: string;
  issue: string;
  status: string;
  risk: 'High' | 'Medium' | 'Critical';
}

export interface AssessmentItem {
  area: string;
  status: string;
  remarks: string;
  compliance: string;
}

export interface SolutionItem {
  subSystem: string;
  location: string;
  specs: string;
  compliance: string;
}

export interface PhaseTask {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export interface Phase {
  name: string;
  duration: string;
  tasks: PhaseTask[];
}

export interface Risk {
  category: string;
  effect: string;
  priority: 'High' | 'Medium' | 'Critical';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface BOQItem {
  category: string;
  description: string;
  unit: string;
  quantity: number;
}
