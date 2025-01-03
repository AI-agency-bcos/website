import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  badge?: string;
  isNew?: boolean;
  isPopular?: boolean;
  usageStats?: string;

}

export interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
  items: MenuItem[];
}
