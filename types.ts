export interface Farm {
  id: number;
  title: string;
  location: string;
  size: string; // e.g., "5 एकर"
  price: string;
  image: string;
  description: string;
  waterSource: string;
  roadAccess: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface InquiryForm {
  name: string;
  mobile: string;
  village: string;
  type: 'BUY' | 'SELL';
  details?: string; // For selling: acres, price expectation
}

export enum PageRoute {
  HOME = '/',
  BUY = '/buy',
  SELL = '/sell',
  ABOUT = '/about',
  CONTACT = '/contact',
  FARM_DETAIL = '/farm/:id'
}