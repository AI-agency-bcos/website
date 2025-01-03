import { BLOG_CATEGORIES } from './constants';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';

export const blogPosts = [
  {
    id: '1',
    title: 'The Future of AI in Business',
    excerpt: 'Discover how artificial intelligence is transforming modern business operations.',
    content: '',
    image: image1,
    category: BLOG_CATEGORIES.AI_TRENDS,
    author: 'Sarah Johnson',
    readTime: 5,
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Machine Learning Best Practices',
    excerpt: 'Learn the essential practices for implementing machine learning in your projects.',
    content: '',
    image: image2,
    category: BLOG_CATEGORIES.MACHINE_LEARNING,
    author: 'Michael Chen',
    readTime: 8,
    date: '2024-03-14'
  },
  {
    id: '3',
    title: 'AI Ethics and Responsibility',
    excerpt: 'Understanding the importance of ethical considerations in AI development.',
    content: '',
    image: image3,
    category: BLOG_CATEGORIES.AI_ETHICS,
    author: 'Emma Davis',
    readTime: 6,
    date: '2024-03-13'
  }
];