export type Category = 'chicken' | 'mutton' | 'fish' | 'prawns';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  weight: string;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  image?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  deliveryAddress: string;
}
