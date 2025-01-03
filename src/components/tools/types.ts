import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: 'content' | 'media' | 'analysis' | 'ml';
}