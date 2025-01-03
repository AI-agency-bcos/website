import {
  Building2, ShoppingCart, GraduationCap, Users, LineChart,
  Shield, Workflow, Database, Cloud, Settings,
  ArrowRight
} from 'lucide-react';

const SolutionsDropdown = () => {
  // Trim categories to show only top 4 items per category
  const categories = [
    {
      title: 'Industry Solutions',
      description: 'AI solutions tailored for specific industries',
      icon: Building2,
      items: [
        {
          title: 'Healthcare & Medical',
          description: 'AI-powered diagnostics and patient care optimization',
          icon: Building2,
          link: '/solutions/healthcare',
          badge: 'HIPAA Compliant',
          isPopular: true
        },
        {
          title: 'Finance & Banking',
          description: 'Fraud detection and risk assessment',
          icon: ShoppingCart,
          link: '/solutions/finance',
          badge: 'PCI DSS'
        },
        {
          title: 'Education & E-Learning',
          description: 'Personalized learning paths',
          icon: GraduationCap,
          link: '/solutions/education',
          isNew: true
        },
      ]
    },
    {
      title: 'Business Functions',
      description: 'AI solutions for various business functions',
      icon: Workflow,
      items: [
        {
          title: 'Customer Service',
          description: 'AI-powered support and chatbots',
          icon: Users,
          Badge: '24/7 Support',
          link: '/solutions/customer-service'
        },
        {
          title: 'Sales & Marketing',
          description: 'AI-driven sales automation',
          icon: LineChart,
          badge : 'CRM Integration',
          link: '/solutions/sales-marketing'
        },
        {
          title: 'Human Resources',
          description: 'AI for HR management',
          icon: Users,
          link: '/solutions/human-resources'
        },
        {
          title: 'Operations',
          description: 'AI for business operations',
          icon: Settings,
          link: '/solutions/operations'
        }
      ]
    },
    {
      title: 'Enterprise Scale',
      description: 'AI solutions for different enterprise scales',
      icon: Database,
      items: [
        {
          title: 'Startups',
          description: 'AI solutions for early-stage startups',
          icon: Database,
          link: '/solutions/startups'
        },
        {
          title: 'SMB',
          description: 'AI solutions for small businesses',
          icon: Database,
          link: '/solutions/small-business'
        },
        {
          title: 'Enterprise',
          description: 'AI solutions for large enterprises',
          icon: Database,
          link: '/solutions/enterprise'
        },
        {
          title: 'Government',
          description: 'AI solutions for government agencies',
          icon: Database,
          link: '/solutions/government'
        }
      ]
    },
    {
      title: 'Special Solutions',
      description: 'Specialized AI solutions',
      icon: Cloud,
      items: [
        {
          title: 'Digital Transformation',
          description: 'AI for digital transformation',
          icon: Cloud,
          link: '/solutions/digital-transformation'
        },
        {
          title: 'Process Automation',
          description: 'AI for process automation',
          icon: Workflow,
          link: '/solutions/process-automation'
        },
        {
          title: 'Data Analytics',
          description: 'AI for advanced analytics',
          icon: LineChart,
          link: '/solutions/data-analytics'
        },
        {
          title: 'Security & Compliance',
          description: 'AI for security',
          icon: Shield,
          link: '/solutions/security-compliance'
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-x-0 top-16 bg-white dark:bg-gray-800 shadow-xl border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center  space-x-3">
                <category.icon className="w-6 h-6 text-gray-900 dark:text-white " />
                <div>
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <br/>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {category.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <item.icon className="w-5 h-5 mt-1 text-gray-900 dark:text-white" />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary-600">
                          {item.title}
                        </h5>
                        {item.isNew && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                            NEW
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-amber-600 bg-amber-50 rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                      {item.badge && (
                        <span className="mt-2 inline-block px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
              <span>See All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              50+ solutions available
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Documentation
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              API Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsDropdown;