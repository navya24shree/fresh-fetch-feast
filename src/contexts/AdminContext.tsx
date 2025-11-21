import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

interface Offer {
  id: string;
  name: string;
  photo: string;
  discount: number;
  date: string;
}

interface Order {
  id: string;
  customerName: string;
  items: Array<{ productId: string; productName: string; quantity: number; price: number }>;
  total: number;
  date: string;
  status: 'pending' | 'delivered';
}

interface AdminContextType {
  offers: Offer[];
  products: Product[];
  orders: Order[];
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: 'pending' | 'delivered') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('offers');
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOffer = (offer: Omit<Offer, 'id'>) => {
    const newOffer = { ...offer, id: Date.now().toString() };
    setOffers(prev => [...prev, newOffer]);
  };

  const updateOffer = (id: string, offer: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...offer } : o));
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: `ORD${Date.now()}` };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: 'pending' | 'delivered') => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <AdminContext.Provider value={{
      offers,
      products,
      orders,
      addOffer,
      updateOffer,
      deleteOffer,
      updateProduct,
      addOrder,
      updateOrderStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
