import { CreditPack } from '../types';

export const creditPacks: CreditPack[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 5,
    price: 49,
    originalPrice: 55,
    savings: 'Save ₹6',
    features: [
      '5 worker contact reveals',
      'Basic profile access',
      'Phone & WhatsApp contacts',
      'Valid for 6 months',
      'Email support'
    ]
  },
  {
    id: 'value',
    name: 'Value',
    credits: 15,
    price: 129,
    originalPrice: 147,
    popular: true,
    savings: 'Save ₹18',
    features: [
      '15 worker contact reveals',
      'Priority profile access',
      'Phone & WhatsApp contacts',
      'Email notifications',
      'Valid for 1 year',
      'Priority support',
      'Bulk search filters'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 50,
    price: 399,
    originalPrice: 490,
    savings: 'Save ₹91',
    features: [
      '50 worker contact reveals',
      'Premium profile access',
      'Phone & WhatsApp contacts',
      'Priority customer support',
      'Advanced search filters',
      'Valid for 2 years',
      'Bulk hiring tools',
      'Analytics dashboard'
    ]
  },
  {
    id: 'agency',
    name: 'Agency',
    credits: 150,
    price: 999,
    originalPrice: 1470,
    savings: 'Save ₹471',
    features: [
      '150 worker contact reveals',
      'Bulk hiring support',
      'Dedicated account manager',
      'Custom search preferences',
      'Priority listings',
      'Multi-user access',
      'Valid for 3 years',
      'API access',
      'White-label options'
    ]
  }
];

export const getPackById = (id: string): CreditPack | undefined => {
  return creditPacks.find(pack => pack.id === id);
};

export const getPopularPack = (): CreditPack | undefined => {
  return creditPacks.find(pack => pack.popular);
};

export const calculateSavings = (pack: CreditPack): number => {
  return (pack.originalPrice || pack.price) - pack.price;
};

export const getPricePerCredit = (pack: CreditPack): number => {
  return Math.round(pack.price / pack.credits);
}; 