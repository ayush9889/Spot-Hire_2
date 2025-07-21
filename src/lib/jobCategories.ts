export interface JobCategoryData {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  growth: string;
  averageSalary: string;
  description: string;
  slug: string;
  featured?: boolean;
  sector: 'blue-collar' | 'service' | 'skilled-trades' | 'hospitality' | 'retail' | 'transport' | 'healthcare' | 'education' | 'technology' | 'other';
}

export const jobCategories: JobCategoryData[] = [
  // Featured Blue-Collar Jobs (16 most popular)
  {
    id: '1',
    name: 'Electricians',
    icon: '⚡',
    jobCount: 1247,
    growth: '+18%',
    averageSalary: '₹15-25K',
    description: 'Electrical installation, maintenance, and repair jobs',
    slug: 'electricians',
    featured: true,
    sector: 'skilled-trades'
  },
  {
    id: '2',
    name: 'Plumbers',
    icon: '🔧',
    jobCount: 892,
    growth: '+22%',
    averageSalary: '₹12-20K',
    description: 'Plumbing installation, repair, and maintenance work',
    slug: 'plumbers',
    featured: true,
    sector: 'skilled-trades'
  },
  {
    id: '3',
    name: 'Delivery & Logistics',
    icon: '🚚',
    jobCount: 2156,
    growth: '+35%',
    averageSalary: '₹10-18K',
    description: 'Delivery partners, drivers, and logistics support',
    slug: 'delivery-logistics',
    featured: true,
    sector: 'transport'
  },
  {
    id: '4',
    name: 'Housekeeping & Cleaning',
    icon: '🧹',
    jobCount: 1789,
    growth: '+28%',
    averageSalary: '₹8-15K',
    description: 'Residential and commercial cleaning services',
    slug: 'housekeeping-cleaning',
    featured: true,
    sector: 'service'
  },
  {
    id: '5',
    name: 'Security Guards',
    icon: '🛡️',
    jobCount: 1234,
    growth: '+15%',
    averageSalary: '₹12-18K',
    description: 'Security services for residential and commercial properties',
    slug: 'security-guards',
    featured: true,
    sector: 'service'
  },
  {
    id: '6',
    name: 'Cooks & Chefs',
    icon: '👨‍🍳',
    jobCount: 987,
    growth: '+25%',
    averageSalary: '₹10-22K',
    description: 'Restaurant, home, and catering cooking positions',
    slug: 'cooks-chefs',
    featured: true,
    sector: 'hospitality'
  },
  {
    id: '7',
    name: 'Office Assistants',
    icon: '📋',
    jobCount: 756,
    growth: '+12%',
    averageSalary: '₹8-16K',
    description: 'Administrative support and office assistance roles',
    slug: 'office-assistants',
    featured: true,
    sector: 'other'
  },
  {
    id: '8',
    name: 'Drivers',
    icon: '🚗',
    jobCount: 1567,
    growth: '+20%',
    averageSalary: '₹12-25K',
    description: 'Personal, commercial, and delivery driving jobs',
    slug: 'drivers',
    featured: true,
    sector: 'transport'
  },
  {
    id: '9',
    name: 'Construction Workers',
    icon: '🏗️',
    jobCount: 1098,
    growth: '+30%',
    averageSalary: '₹10-20K',
    description: 'Construction, renovation, and building maintenance',
    slug: 'construction-workers',
    featured: true,
    sector: 'blue-collar'
  },
  {
    id: '10',
    name: 'Retail Sales',
    icon: '🛍️',
    jobCount: 1876,
    growth: '+16%',
    averageSalary: '₹8-18K',
    description: 'Shop assistants, cashiers, and sales representatives',
    slug: 'retail-sales',
    featured: true,
    sector: 'retail'
  },
  {
    id: '11',
    name: 'Beauty & Wellness',
    icon: '💄',
    jobCount: 634,
    growth: '+32%',
    averageSalary: '₹12-25K',
    description: 'Salon, spa, and beauty service professionals',
    slug: 'beauty-wellness',
    featured: true,
    sector: 'service'
  },
  {
    id: '12',
    name: 'Gardeners & Landscaping',
    icon: '🌱',
    jobCount: 445,
    growth: '+14%',
    averageSalary: '₹8-15K',
    description: 'Garden maintenance and landscaping services',
    slug: 'gardeners-landscaping',
    featured: true,
    sector: 'service'
  },
  {
    id: '13',
    name: 'Maids & Domestic Help',
    icon: '🏠',
    jobCount: 2145,
    growth: '+24%',
    averageSalary: '₹6-12K',
    description: 'Household cleaning and domestic assistance',
    slug: 'maids-domestic-help',
    featured: true,
    sector: 'service'
  },
  {
    id: '14',
    name: 'Mechanics & Auto Repair',
    icon: '🔧',
    jobCount: 987,
    growth: '+19%',
    averageSalary: '₹12-22K',
    description: 'Vehicle repair and maintenance services',
    slug: 'mechanics-auto-repair',
    featured: true,
    sector: 'skilled-trades'
  },
  {
    id: '15',
    name: 'Carpenters',
    icon: '🪚',
    jobCount: 765,
    growth: '+21%',
    averageSalary: '₹15-28K',
    description: 'Wood working, furniture making, and carpentry',
    slug: 'carpenters',
    featured: true,
    sector: 'skilled-trades'
  },
  {
    id: '16',
    name: 'Waiters & Restaurant Staff',
    icon: '🍽️',
    jobCount: 1432,
    growth: '+26%',
    averageSalary: '₹8-16K',
    description: 'Restaurant service and hospitality staff',
    slug: 'waiters-restaurant-staff',
    featured: true,
    sector: 'hospitality'
  },

  // Additional Blue-Collar & Service Jobs
  {
    id: '17',
    name: 'AC Technicians',
    icon: '❄️',
    jobCount: 456,
    growth: '+33%',
    averageSalary: '₹15-30K',
    description: 'Air conditioning installation and repair',
    slug: 'ac-technicians',
    sector: 'skilled-trades'
  },
  {
    id: '18',
    name: 'Painters',
    icon: '🎨',
    jobCount: 623,
    growth: '+17%',
    averageSalary: '₹10-20K',
    description: 'House and commercial painting services',
    slug: 'painters',
    sector: 'skilled-trades'
  },
  {
    id: '19',
    name: 'Welders',
    icon: '🔥',
    jobCount: 387,
    growth: '+23%',
    averageSalary: '₹12-25K',
    description: 'Metal welding and fabrication work',
    slug: 'welders',
    sector: 'skilled-trades'
  },
  {
    id: '20',
    name: 'Tile & Flooring Workers',
    icon: '🏠',
    jobCount: 298,
    growth: '+29%',
    averageSalary: '₹12-22K',
    description: 'Tile installation and flooring services',
    slug: 'tile-flooring-workers',
    sector: 'skilled-trades'
  },
  {
    id: '21',
    name: 'Pest Control',
    icon: '🐛',
    jobCount: 234,
    growth: '+31%',
    averageSalary: '₹8-18K',
    description: 'Pest control and fumigation services',
    slug: 'pest-control',
    sector: 'service'
  },
  {
    id: '22',
    name: 'Laundry & Dry Cleaning',
    icon: '👔',
    jobCount: 543,
    growth: '+14%',
    averageSalary: '₹6-14K',
    description: 'Laundry services and garment care',
    slug: 'laundry-dry-cleaning',
    sector: 'service'
  },
  {
    id: '23',
    name: 'Event Staff',
    icon: '🎪',
    jobCount: 789,
    growth: '+27%',
    averageSalary: '₹8-20K',
    description: 'Event management and party services',
    slug: 'event-staff',
    sector: 'service'
  },
  {
    id: '24',
    name: 'Pet Care Services',
    icon: '🐕',
    jobCount: 156,
    growth: '+45%',
    averageSalary: '₹10-25K',
    description: 'Pet grooming, walking, and boarding',
    slug: 'pet-care-services',
    sector: 'service'
  },
  {
    id: '25',
    name: 'Massage Therapists',
    icon: '💆',
    jobCount: 234,
    growth: '+38%',
    averageSalary: '₹15-35K',
    description: 'Therapeutic and relaxation massage services',
    slug: 'massage-therapists',
    sector: 'healthcare'
  },
  {
    id: '26',
    name: 'Fitness Trainers',
    icon: '💪',
    jobCount: 345,
    growth: '+42%',
    averageSalary: '₹12-30K',
    description: 'Personal training and fitness instruction',
    slug: 'fitness-trainers',
    sector: 'healthcare'
  },
  {
    id: '27',
    name: 'Tailors & Seamstresses',
    icon: '✂️',
    jobCount: 567,
    growth: '+16%',
    averageSalary: '₹8-18K',
    description: 'Clothing alteration and custom tailoring',
    slug: 'tailors-seamstresses',
    sector: 'service'
  },
  {
    id: '28',
    name: 'Babysitters & Nannies',
    icon: '👶',
    jobCount: 891,
    growth: '+35%',
    averageSalary: '₹8-20K',
    description: 'Child care and babysitting services',
    slug: 'babysitters-nannies',
    sector: 'service'
  },
  {
    id: '29',
    name: 'Elderly Care',
    icon: '👴',
    jobCount: 445,
    growth: '+55%',
    averageSalary: '₹10-25K',
    description: 'Senior citizen care and assistance',
    slug: 'elderly-care',
    sector: 'healthcare'
  },
  {
    id: '30',
    name: 'Tutors & Teachers',
    icon: '📚',
    jobCount: 1234,
    growth: '+28%',
    averageSalary: '₹12-35K',
    description: 'Private tutoring and teaching services',
    slug: 'tutors-teachers',
    sector: 'education'
  },

  // Retail & Customer Service
  {
    id: '31',
    name: 'Cashiers',
    icon: '💰',
    jobCount: 2345,
    growth: '+12%',
    averageSalary: '₹8-15K',
    description: 'Point of sale and cash handling',
    slug: 'cashiers',
    sector: 'retail'
  },
  {
    id: '32',
    name: 'Stock Clerks',
    icon: '📦',
    jobCount: 1567,
    growth: '+18%',
    averageSalary: '₹7-14K',
    description: 'Inventory management and stock handling',
    slug: 'stock-clerks',
    sector: 'retail'
  },
  {
    id: '33',
    name: 'Customer Service',
    icon: '🎧',
    jobCount: 1789,
    growth: '+22%',
    averageSalary: '₹10-20K',
    description: 'Customer support and service roles',
    slug: 'customer-service',
    sector: 'other'
  },
  {
    id: '34',
    name: 'Pharmacy Assistants',
    icon: '💊',
    jobCount: 456,
    growth: '+25%',
    averageSalary: '₹10-18K',
    description: 'Pharmacy support and medicine dispensing',
    slug: 'pharmacy-assistants',
    sector: 'healthcare'
  },
  {
    id: '35',
    name: 'Jewelry Store Staff',
    icon: '💎',
    jobCount: 234,
    growth: '+15%',
    averageSalary: '₹12-25K',
    description: 'Jewelry sales and customer service',
    slug: 'jewelry-store-staff',
    sector: 'retail'
  },

  // Food Service & Hospitality
  {
    id: '36',
    name: 'Baristas',
    icon: '☕',
    jobCount: 567,
    growth: '+31%',
    averageSalary: '₹8-16K',
    description: 'Coffee preparation and cafe service',
    slug: 'baristas',
    sector: 'hospitality'
  },
  {
    id: '37',
    name: 'Bakers',
    icon: '🥐',
    jobCount: 345,
    growth: '+19%',
    averageSalary: '₹10-20K',
    description: 'Bread, pastry, and dessert preparation',
    slug: 'bakers',
    sector: 'hospitality'
  },
  {
    id: '38',
    name: 'Kitchen Helpers',
    icon: '🍳',
    jobCount: 1234,
    growth: '+24%',
    averageSalary: '₹7-14K',
    description: 'Kitchen assistance and food preparation',
    slug: 'kitchen-helpers',
    sector: 'hospitality'
  },
  {
    id: '39',
    name: 'Hotel Housekeeping',
    icon: '🏨',
    jobCount: 987,
    growth: '+20%',
    averageSalary: '₹8-16K',
    description: 'Hotel room cleaning and maintenance',
    slug: 'hotel-housekeeping',
    sector: 'hospitality'
  },
  {
    id: '40',
    name: 'Bartenders',
    icon: '🍹',
    jobCount: 456,
    growth: '+26%',
    averageSalary: '₹12-25K',
    description: 'Beverage preparation and bar service',
    slug: 'bartenders',
    sector: 'hospitality'
  },

  // Transport & Logistics
  {
    id: '41',
    name: 'Cab Drivers',
    icon: '🚕',
    jobCount: 3456,
    growth: '+28%',
    averageSalary: '₹15-30K',
    description: 'Taxi and ride-sharing services',
    slug: 'cab-drivers',
    sector: 'transport'
  },
  {
    id: '42',
    name: 'Truck Drivers',
    icon: '🚛',
    jobCount: 2345,
    growth: '+22%',
    averageSalary: '₹18-35K',
    description: 'Commercial truck driving and freight',
    slug: 'truck-drivers',
    sector: 'transport'
  },
  {
    id: '43',
    name: 'Bus Drivers',
    icon: '🚌',
    jobCount: 789,
    growth: '+15%',
    averageSalary: '₹12-22K',
    description: 'Public and private bus transportation',
    slug: 'bus-drivers',
    sector: 'transport'
  },
  {
    id: '44',
    name: 'Auto Rickshaw Drivers',
    icon: '🛺',
    jobCount: 4567,
    growth: '+12%',
    averageSalary: '₹8-18K',
    description: 'Three-wheeler taxi services',
    slug: 'auto-rickshaw-drivers',
    sector: 'transport'
  },
  {
    id: '45',
    name: 'Bike Delivery',
    icon: '🏍️',
    jobCount: 5678,
    growth: '+45%',
    averageSalary: '₹12-25K',
    description: 'Motorcycle delivery and courier services',
    slug: 'bike-delivery',
    sector: 'transport'
  },

  // Healthcare & Medical Support
  {
    id: '46',
    name: 'Nursing Assistants',
    icon: '👩‍⚕️',
    jobCount: 567,
    growth: '+35%',
    averageSalary: '₹12-25K',
    description: 'Healthcare support and patient care',
    slug: 'nursing-assistants',
    sector: 'healthcare'
  },
  {
    id: '47',
    name: 'Hospital Attendants',
    icon: '🏥',
    jobCount: 789,
    growth: '+25%',
    averageSalary: '₹8-16K',
    description: 'Hospital cleaning and patient assistance',
    slug: 'hospital-attendants',
    sector: 'healthcare'
  },
  {
    id: '48',
    name: 'Medical Receptionists',
    icon: '📋',
    jobCount: 345,
    growth: '+22%',
    averageSalary: '₹10-18K',
    description: 'Medical office administration and scheduling',
    slug: 'medical-receptionists',
    sector: 'healthcare'
  },
  {
    id: '49',
    name: 'Lab Assistants',
    icon: '🧪',
    jobCount: 234,
    growth: '+28%',
    averageSalary: '₹12-22K',
    description: 'Laboratory support and sample processing',
    slug: 'lab-assistants',
    sector: 'healthcare'
  },
  {
    id: '50',
    name: 'Physiotherapy Assistants',
    icon: '🏃',
    jobCount: 156,
    growth: '+40%',
    averageSalary: '₹15-28K',
    description: 'Physical therapy support and rehabilitation',
    slug: 'physiotherapy-assistants',
    sector: 'healthcare'
  },

  // Manufacturing & Production
  {
    id: '51',
    name: 'Factory Workers',
    icon: '🏭',
    jobCount: 3456,
    growth: '+18%',
    averageSalary: '₹10-20K',
    description: 'Manufacturing and production line work',
    slug: 'factory-workers',
    sector: 'blue-collar'
  },
  {
    id: '52',
    name: 'Packaging Staff',
    icon: '📦',
    jobCount: 2345,
    growth: '+25%',
    averageSalary: '₹8-16K',
    description: 'Product packaging and wrapping services',
    slug: 'packaging-staff',
    sector: 'blue-collar'
  },
  {
    id: '53',
    name: 'Quality Control',
    icon: '✅',
    jobCount: 567,
    growth: '+22%',
    averageSalary: '₹12-25K',
    description: 'Product inspection and quality assurance',
    slug: 'quality-control',
    sector: 'blue-collar'
  },
  {
    id: '54',
    name: 'Machine Operators',
    icon: '⚙️',
    jobCount: 1234,
    growth: '+20%',
    averageSalary: '₹15-28K',
    description: 'Industrial machinery operation and maintenance',
    slug: 'machine-operators',
    sector: 'blue-collar'
  },
  {
    id: '55',
    name: 'Warehouse Workers',
    icon: '🏪',
    jobCount: 2789,
    growth: '+30%',
    averageSalary: '₹10-20K',
    description: 'Warehouse operations and inventory management',
    slug: 'warehouse-workers',
    sector: 'blue-collar'
  },

  // Technology & Digital Services
  {
    id: '56',
    name: 'Computer Repair',
    icon: '💻',
    jobCount: 456,
    growth: '+35%',
    averageSalary: '₹15-30K',
    description: 'Computer and laptop repair services',
    slug: 'computer-repair',
    sector: 'technology'
  },
  {
    id: '57',
    name: 'Mobile Repair',
    icon: '📱',
    jobCount: 789,
    growth: '+42%',
    averageSalary: '₹12-28K',
    description: 'Smartphone and tablet repair services',
    slug: 'mobile-repair',
    sector: 'technology'
  },
  {
    id: '58',
    name: 'CCTV Installation',
    icon: '📹',
    jobCount: 345,
    growth: '+38%',
    averageSalary: '₹15-32K',
    description: 'Security camera installation and maintenance',
    slug: 'cctv-installation',
    sector: 'technology'
  },
  {
    id: '59',
    name: 'Internet Technicians',
    icon: '🌐',
    jobCount: 567,
    growth: '+33%',
    averageSalary: '₹18-35K',
    description: 'Internet installation and network support',
    slug: 'internet-technicians',
    sector: 'technology'
  },
  {
    id: '60',
    name: 'Data Entry',
    icon: '⌨️',
    jobCount: 1234,
    growth: '+15%',
    averageSalary: '₹8-18K',
    description: 'Computer data entry and digital documentation',
    slug: 'data-entry',
    sector: 'technology'
  },

  // Agriculture & Outdoor Work
  {
    id: '61',
    name: 'Farm Workers',
    icon: '🚜',
    jobCount: 2345,
    growth: '+12%',
    averageSalary: '₹6-15K',
    description: 'Agricultural work and crop management',
    slug: 'farm-workers',
    sector: 'blue-collar'
  },
  {
    id: '62',
    name: 'Landscaping',
    icon: '🌿',
    jobCount: 567,
    growth: '+25%',
    averageSalary: '₹10-22K',
    description: 'Garden design and outdoor maintenance',
    slug: 'landscaping',
    sector: 'service'
  },
  {
    id: '63',
    name: 'Tree Services',
    icon: '🌳',
    jobCount: 234,
    growth: '+20%',
    averageSalary: '₹12-25K',
    description: 'Tree trimming and removal services',
    slug: 'tree-services',
    sector: 'service'
  },
  {
    id: '64',
    name: 'Irrigation Specialists',
    icon: '💧',
    jobCount: 156,
    growth: '+30%',
    averageSalary: '₹15-28K',
    description: 'Water systems and irrigation installation',
    slug: 'irrigation-specialists',
    sector: 'skilled-trades'
  },
  {
    id: '65',
    name: 'Greenhouse Workers',
    icon: '🏡',
    jobCount: 123,
    growth: '+35%',
    averageSalary: '₹8-18K',
    description: 'Plant cultivation and greenhouse management',
    slug: 'greenhouse-workers',
    sector: 'blue-collar'
  },

  // Entertainment & Media
  {
    id: '66',
    name: 'Photographers',
    icon: '📸',
    jobCount: 456,
    growth: '+28%',
    averageSalary: '₹15-40K',
    description: 'Event and portrait photography services',
    slug: 'photographers',
    sector: 'service'
  },
  {
    id: '67',
    name: 'Videographers',
    icon: '🎥',
    jobCount: 234,
    growth: '+35%',
    averageSalary: '₹20-50K',
    description: 'Video production and event filming',
    slug: 'videographers',
    sector: 'service'
  },
  {
    id: '68',
    name: 'Sound Technicians',
    icon: '🎵',
    jobCount: 123,
    growth: '+32%',
    averageSalary: '₹15-35K',
    description: 'Audio equipment and sound system setup',
    slug: 'sound-technicians',
    sector: 'service'
  },
  {
    id: '69',
    name: 'DJs',
    icon: '🎧',
    jobCount: 345,
    growth: '+25%',
    averageSalary: '₹10-30K',
    description: 'Music and entertainment for events',
    slug: 'djs',
    sector: 'service'
  },
  {
    id: '70',
    name: 'Balloon Decorators',
    icon: '🎈',
    jobCount: 89,
    growth: '+45%',
    averageSalary: '₹8-20K',
    description: 'Party decoration and balloon artistry',
    slug: 'balloon-decorators',
    sector: 'service'
  },

  // Personal Services
  {
    id: '71',
    name: 'Hair Stylists',
    icon: '💇',
    jobCount: 789,
    growth: '+22%',
    averageSalary: '₹12-25K',
    description: 'Hair cutting, styling, and treatment',
    slug: 'hair-stylists',
    sector: 'service'
  },
  {
    id: '72',
    name: 'Makeup Artists',
    icon: '💄',
    jobCount: 345,
    growth: '+38%',
    averageSalary: '₹15-35K',
    description: 'Makeup for events, weddings, and photography',
    slug: 'makeup-artists',
    sector: 'service'
  },
  {
    id: '73',
    name: 'Nail Technicians',
    icon: '💅',
    jobCount: 234,
    growth: '+42%',
    averageSalary: '₹10-22K',
    description: 'Manicure, pedicure, and nail art services',
    slug: 'nail-technicians',
    sector: 'service'
  },
  {
    id: '74',
    name: 'Spa Therapists',
    icon: '🧖',
    jobCount: 456,
    growth: '+35%',
    averageSalary: '₹15-30K',
    description: 'Wellness treatments and spa services',
    slug: 'spa-therapists',
    sector: 'service'
  },
  {
    id: '75',
    name: 'Personal Trainers',
    icon: '🏋️',
    jobCount: 567,
    growth: '+40%',
    averageSalary: '₹15-35K',
    description: 'Fitness coaching and personal training',
    slug: 'personal-trainers',
    sector: 'healthcare'
  },

  // Maintenance & Repair
  {
    id: '76',
    name: 'Building Maintenance',
    icon: '🏢',
    jobCount: 1234,
    growth: '+18%',
    averageSalary: '₹12-22K',
    description: 'Building upkeep and facility maintenance',
    slug: 'building-maintenance',
    sector: 'service'
  },
  {
    id: '77',
    name: 'Handymen',
    icon: '🔨',
    jobCount: 789,
    growth: '+25%',
    averageSalary: '₹15-25K',
    description: 'General repair and maintenance services',
    slug: 'handymen',
    sector: 'service'
  },
  {
    id: '78',
    name: 'Locksmiths',
    icon: '🔐',
    jobCount: 156,
    growth: '+20%',
    averageSalary: '₹15-30K',
    description: 'Lock installation and key cutting services',
    slug: 'locksmiths',
    sector: 'skilled-trades'
  },
  {
    id: '79',
    name: 'Glass Repair',
    icon: '🪟',
    jobCount: 234,
    growth: '+22%',
    averageSalary: '₹12-25K',
    description: 'Window and glass installation/repair',
    slug: 'glass-repair',
    sector: 'skilled-trades'
  },
  {
    id: '80',
    name: 'Roof Repair',
    icon: '🏠',
    jobCount: 345,
    growth: '+28%',
    averageSalary: '₹15-30K',
    description: 'Roofing installation and leak repairs',
    slug: 'roof-repair',
    sector: 'skilled-trades'
  },

  // Security & Safety
  {
    id: '81',
    name: 'Bouncers',
    icon: '🚪',
    jobCount: 234,
    growth: '+18%',
    averageSalary: '₹12-25K',
    description: 'Event security and crowd control',
    slug: 'bouncers',
    sector: 'service'
  },
  {
    id: '82',
    name: 'Fire Safety',
    icon: '🚒',
    jobCount: 123,
    growth: '+25%',
    averageSalary: '₹15-28K',
    description: 'Fire safety equipment and training',
    slug: 'fire-safety',
    sector: 'service'
  },
  {
    id: '83',
    name: 'Lifeguards',
    icon: '🏊',
    jobCount: 89,
    growth: '+30%',
    averageSalary: '₹10-20K',
    description: 'Swimming pool and water safety',
    slug: 'lifeguards',
    sector: 'service'
  },
  {
    id: '84',
    name: 'Parking Attendants',
    icon: '🅿️',
    jobCount: 456,
    growth: '+15%',
    averageSalary: '₹8-15K',
    description: 'Parking management and vehicle assistance',
    slug: 'parking-attendants',
    sector: 'service'
  },
  {
    id: '85',
    name: 'Night Watchmen',
    icon: '🌙',
    jobCount: 789,
    growth: '+12%',
    averageSalary: '₹10-18K',
    description: 'Overnight security and surveillance',
    slug: 'night-watchmen',
    sector: 'service'
  },

  // Textile & Garment
  {
    id: '86',
    name: 'Textile Workers',
    icon: '🧵',
    jobCount: 2345,
    growth: '+16%',
    averageSalary: '₹8-16K',
    description: 'Fabric production and textile manufacturing',
    slug: 'textile-workers',
    sector: 'blue-collar'
  },
  {
    id: '87',
    name: 'Embroidery Workers',
    icon: '🪡',
    jobCount: 567,
    growth: '+20%',
    averageSalary: '₹10-20K',
    description: 'Hand and machine embroidery work',
    slug: 'embroidery-workers',
    sector: 'skilled-trades'
  },
  {
    id: '88',
    name: 'Dry Cleaners',
    icon: '👗',
    jobCount: 345,
    growth: '+14%',
    averageSalary: '₹8-16K',
    description: 'Professional garment cleaning services',
    slug: 'dry-cleaners',
    sector: 'service'
  },
  {
    id: '89',
    name: 'Shoe Repair',
    icon: '👞',
    jobCount: 123,
    growth: '+12%',
    averageSalary: '₹6-15K',
    description: 'Footwear repair and cobbler services',
    slug: 'shoe-repair',
    sector: 'service'
  },
  {
    id: '90',
    name: 'Leather Workers',
    icon: '🧳',
    jobCount: 234,
    growth: '+18%',
    averageSalary: '₹10-22K',
    description: 'Leather goods manufacturing and repair',
    slug: 'leather-workers',
    sector: 'skilled-trades'
  },

  // Specialized Services
  {
    id: '91',
    name: 'Wedding Planners',
    icon: '💒',
    jobCount: 234,
    growth: '+35%',
    averageSalary: '₹20-50K',
    description: 'Wedding coordination and event planning',
    slug: 'wedding-planners',
    sector: 'service'
  },
  {
    id: '92',
    name: 'Catering Staff',
    icon: '🍽️',
    jobCount: 1234,
    growth: '+22%',
    averageSalary: '₹8-18K',
    description: 'Event catering and food service',
    slug: 'catering-staff',
    sector: 'hospitality'
  },
  {
    id: '93',
    name: 'Florists',
    icon: '🌺',
    jobCount: 156,
    growth: '+25%',
    averageSalary: '₹8-20K',
    description: 'Flower arrangement and decoration',
    slug: 'florists',
    sector: 'service'
  },
  {
    id: '94',
    name: 'Interior Decorators',
    icon: '🏡',
    jobCount: 345,
    growth: '+30%',
    averageSalary: '₹15-35K',
    description: 'Home and office interior decoration',
    slug: 'interior-decorators',
    sector: 'service'
  },
  {
    id: '95',
    name: 'Moving Services',
    icon: '📦',
    jobCount: 567,
    growth: '+28%',
    averageSalary: '₹10-22K',
    description: 'Household and office relocation services',
    slug: 'moving-services',
    sector: 'service'
  },
  {
    id: '96',
    name: 'Swimming Instructors',
    icon: '🏊',
    jobCount: 123,
    growth: '+40%',
    averageSalary: '₹15-30K',
    description: 'Swimming lessons and water sports training',
    slug: 'swimming-instructors',
    sector: 'education'
  },
  {
    id: '97',
    name: 'Yoga Instructors',
    icon: '🧘',
    jobCount: 456,
    growth: '+45%',
    averageSalary: '₹12-35K',
    description: 'Yoga classes and meditation instruction',
    slug: 'yoga-instructors',
    sector: 'healthcare'
  },
  {
    id: '98',
    name: 'Music Teachers',
    icon: '🎼',
    jobCount: 234,
    growth: '+25%',
    averageSalary: '₹15-35K',
    description: 'Musical instrument and vocal training',
    slug: 'music-teachers',
    sector: 'education'
  },
  {
    id: '99',
    name: 'Art Teachers',
    icon: '🎨',
    jobCount: 189,
    growth: '+30%',
    averageSalary: '₹12-30K',
    description: 'Drawing, painting, and art instruction',
    slug: 'art-teachers',
    sector: 'education'
  },
  {
    id: '100',
    name: 'Dance Instructors',
    icon: '💃',
    jobCount: 345,
    growth: '+35%',
    averageSalary: '₹15-35K',
    description: 'Dance lessons and choreography training',
    slug: 'dance-instructors',
    sector: 'education'
  },
  {
    id: '101',
    name: 'Language Tutors',
    icon: '🗣️',
    jobCount: 567,
    growth: '+38%',
    averageSalary: '₹15-40K',
    description: 'Foreign language instruction and translation',
    slug: 'language-tutors',
    sector: 'education'
  },
  {
    id: '102',
    name: 'Computer Trainers',
    icon: '💻',
    jobCount: 234,
    growth: '+42%',
    averageSalary: '₹18-40K',
    description: 'Computer skills and software training',
    slug: 'computer-trainers',
    sector: 'technology'
  },
  {
    id: '103',
    name: 'Driving Instructors',
    icon: '🚗',
    jobCount: 456,
    growth: '+20%',
    averageSalary: '₹12-28K',
    description: 'Driving lessons and vehicle training',
    slug: 'driving-instructors',
    sector: 'education'
  },
  {
    id: '104',
    name: 'Tour Guides',
    icon: '🗺️',
    jobCount: 189,
    growth: '+25%',
    averageSalary: '₹10-25K',
    description: 'Tourist guidance and local area expertise',
    slug: 'tour-guides',
    sector: 'service'
  },
  {
    id: '105',
    name: 'House Sitters',
    icon: '🏠',
    jobCount: 123,
    growth: '+50%',
    averageSalary: '₹8-20K',
    description: 'Home security and property management',
    slug: 'house-sitters',
    sector: 'service'
  }
];

export const getFeaturedCategories = (): JobCategoryData[] => {
  return jobCategories.filter(category => category.featured);
};

export const getAllCategories = (): JobCategoryData[] => {
  return jobCategories;
};

export const getCategoriesBySector = (sector: string): JobCategoryData[] => {
  return jobCategories.filter(category => category.sector === sector);
};

export const searchCategories = (query: string): JobCategoryData[] => {
  const lowercaseQuery = query.toLowerCase();
  return jobCategories.filter(category =>
    category.name.toLowerCase().includes(lowercaseQuery) ||
    category.description.toLowerCase().includes(lowercaseQuery)
  );
}; 