import React, { useState } from 'react';
import {
  Briefcase, Shield, ShoppingCart, Factory, Book, Truck,
  Users, ArrowRight, Heart, TrendingUp, Globe, Lock, Settings,
  Zap, Star,  ChevronRight, Cloud, BarChart, Terminal,
} from 'lucide-react';

interface DropdownItem {
  title: string;
  description: string;
  icon: React.ComponentType;
  link: string;
  badge?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

interface Category {
  title: string;
  description: string;
  icon: React.ComponentType;
  items: DropdownItem[];
}

const SolutionsDropdown: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Industry Solutions');
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);

  const categories: Category[] = [
    {
      title: 'Industry Solutions',
      description: 'Tailored solutions for various industries',
      icon: Briefcase,
      items: [
        {
          title: 'Healthcare & Medical',
          description: 'Innovative solutions for healthcare providers',
          icon: Heart,
          link: '/solutions/healthcare',
          isNew: true,
        },
        {
          title: 'Finance & Banking',
          description: 'Secure and efficient financial solutions',
          icon: Shield,
          link: '/solutions/finance',
        },
        {
          title: 'E-commerce & Retail',
          description: 'Boost your online sales and customer experience',
          icon: ShoppingCart,
          link: '/solutions/ecommerce',
        },
        {
          title: 'Manufacturing',
          description: 'Optimize your manufacturing processes',
          icon: Factory,
          link: '/solutions/manufacturing',
        },
        {
          title: 'Education',
          description: 'Enhance learning experiences with technology',
          icon: Book,
          link: '/solutions/education',
        },
        {
          title: 'Logistics & Supply Chain',
          description: 'Streamline your logistics and supply chain',
          icon: Truck,
          link: '/solutions/logistics',
        },
      ],
    },
    {
      title: 'Business Functions',
      description: 'Solutions for various business functions',
      icon: Users,
      items: [
        {
          title: 'Customer Service',
          description: 'Improve customer satisfaction and support',
          icon: Users,
          link: '/solutions/customer-service',
        },
        {
          title: 'Sales & Marketing',
          description: 'Boost your sales and marketing efforts',
          icon: TrendingUp,
          link: '/solutions/sales-marketing',
        },
        {
          title: 'Human Resources',
          description: 'Streamline your HR processes',
          icon: Users,
          link: '/solutions/human-resources',
        },
        {
          title: 'Operations Management',
          description: 'Optimize your operations',
          icon: Settings,
          link: '/solutions/operations-management',
        },
        {
          title: 'Research & Development',
          description: 'Innovate and develop new products',
          icon: Zap,
          link: '/solutions/research-development',
        },
        {
          title: 'Risk Management',
          description: 'Manage and mitigate risks',
          icon: Shield,
          link: '/solutions/risk-management',
        },
      ],
    },
    {
      title: 'Enterprise Scale',
      description: 'Solutions for businesses of all sizes',
      icon: Globe,
      items: [
        {
          title: 'Startups',
          description: 'Solutions for early-stage companies',
          icon: Zap,
          link: '/solutions/startups',
        },
        {
          title: 'Small Business',
          description: 'Solutions for small businesses',
          icon: Briefcase,
          link: '/solutions/small-business',
        },
        {
          title: 'Mid-Market',
          description: 'Solutions for mid-sized companies',
          icon: Briefcase,
          link: '/solutions/mid-market',
        },
        {
          title: 'Enterprise',
          description: 'Solutions for large enterprises',
          icon: Briefcase,
          link: '/solutions/enterprise',
        },
        {
          title: 'Global Corporation',
          description: 'Solutions for global corporations',
          icon: Globe,
          link: '/solutions/global-corporation',
        },
        {
          title: 'Government',
          description: 'Solutions for government agencies',
          icon: Shield,
          link: '/solutions/government',
        },
      ],
    },
    {
      title: 'Special Solutions',
      description: 'Specialized solutions for unique needs',
      icon: Star,
      items: [
        {
          title: 'Digital Transformation',
          description: 'Transform your business with digital solutions',
          icon: TrendingUp,
          link: '/solutions/digital-transformation',
        },
        {
          title: 'Process Automation',
          description: 'Automate your business processes',
          icon: Settings,
          link: '/solutions/process-automation',
        },
        {
          title: 'Data Analytics',
          description: 'Gain insights from your data',
          icon: BarChart,
          link: '/solutions/data-analytics',
        },
        {
          title: 'Cloud Integration',
          description: 'Integrate your systems with the cloud',
          icon: Cloud,
          link: '/solutions/cloud-integration',
        },
        {
          title: 'Security & Compliance',
          description: 'Ensure security and compliance',
          icon: Lock,
          link: '/solutions/security-compliance',
        },
        {
          title: 'Custom Solutions',
          description: 'Tailored solutions for your unique needs',
          icon: Briefcase,
          link: '/solutions/custom-solutions',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-x-0 top-16 bg-white dark:bg-gray-800 shadow-xl border-t border-gray-200 dark:border-gray-700 transition-all duration-300 z-50">
      <div className="container mx-auto p-6">
        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-6">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            {categories.map(cat => (
              <option key={cat.title} value={cat.title}>{cat.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Categories Navigation - Desktop */}
          <div className="hidden lg:block col-span-3 border-r border-gray-200 dark:border-gray-700">
            {categories.map((category) => (
              <div
                key={category.title}
                className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer
                  transition-all duration-200 ${
                    activeCategory === category.title
                      ? 'bg-primary-50 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                onMouseEnter={() => setActiveCategory(category.title)}
              >
                {React.createElement(category.icon as React.ComponentType<{ className?: string }>, { className: "w-6 h-6 text-primary-600 dark:text-white" })}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-gray-400 dark:text-white" />
              </div>
            ))}
          </div>

          {/* Solutions Grid */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories
                .find(cat => cat.title === activeCategory)
                ?.items.map((solution) => (
                  <a
                    key={solution.title}
                    href={solution.link}
                    className="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                      transition-all duration-200 relative"
                    onMouseEnter={() => setHoveredSolution(solution.title)}
                    onMouseLeave={() => setHoveredSolution(null)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {React.createElement(solution.icon as React.ComponentType<{ className: string }>, { className: "w-6 h-6 text-primary-600 dark:text-white" })}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900 dark:text-white 
                            group-hover:text-primary-600">
                            {solution.title}
                          </h4>
                          {solution.isNew && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium 
                              text-primary-600 bg-primary-50 rounded-full dark:text-white">
                              NEW
                            </span>
                          )}
                          {solution.isPopular && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium 
                              text-amber-600 bg-amber-50 rounded-full">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {solution.description}
                        </p>
                        {solution.badge && (
                          <span className="mt-2 inline-block px-2 py-1 text-xs 
                            font-medium text-gray-600 bg-gray-100 rounded">
                            {solution.badge}
                          </span>
                        )}
                        {hoveredSolution === solution.title && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 
                            to-transparent rounded-lg transition-opacity duration-200" />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>

          {/* Right Sidebar - Stats & Featured */}
          <div className="hidden lg:block col-span-3 space-y-6">
            {/* Usage Statistics */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Platform Statistics
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-white">Total Users</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1M+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-white">Active Projects</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    250K+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-white">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured New Solutions */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 
              dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Featured Solutions
              </h4>
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 
                    rounded-lg p-3 transition-transform hover:scale-105"
                >
                  <Terminal className="w-8 h-8 text-primary-600 dark:text-white" />
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      AI Code Assistant
                    </h5>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      4.9 · 100K+ users
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 
                    rounded-lg p-3 transition-transform hover:scale-105"
                >
                  <BarChart className="w-8 h-8 text-primary-600  dark:text-white" />
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Data Visualizer
                    </h5>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      4.7 · 80K+ users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 
          flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <button className="flex items-center space-x-2 text-primary-600 
              hover:text-primary-700 font-medium dark:text-white dark:hover:text-primary-400">
              <span>See All Solutions</span>
              <ArrowRight className="w-4 h-4 dark:text-white" />
            </button>
            <div className="hidden lg:block h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
              50+ solutions available
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-300">
              Documentation
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-300">
              API Access
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-300">
              Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsDropdown;