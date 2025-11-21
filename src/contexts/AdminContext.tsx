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
  deliveryBoyId?: string;
  paymentMethod: 'cash' | 'card' | 'upi';
}

interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalDeliveries: number;
  rating: number;
  status: 'active' | 'inactive';
}

interface AdminContextType {
  offers: Offer[];
  products: Product[];
  orders: Order[];
  deliveryBoys: DeliveryBoy[];
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: 'pending' | 'delivered') => void;
  assignOrderToDeliveryBoy: (orderId: string, deliveryBoyId: string) => void;
  addDeliveryBoy: (deliveryBoy: Omit<DeliveryBoy, 'id' | 'totalDeliveries' | 'rating'>) => void;
  updateDeliveryBoy: (id: string, deliveryBoy: Partial<DeliveryBoy>) => void;
  deleteDeliveryBoy: (id: string) => void;
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

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>(() => {
    const saved = localStorage.getItem('deliveryBoys');
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

  useEffect(() => {
    localStorage.setItem('deliveryBoys', JSON.stringify(deliveryBoys));
  }, [deliveryBoys]);

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
    setOrders(prev => prev.map(o => {
      if (o.id === id && status === 'delivered' && o.deliveryBoyId) {
        // Update delivery boy stats
        setDeliveryBoys(prevBoys => prevBoys.map(boy => 
          boy.id === o.deliveryBoyId 
            ? { ...boy, totalDeliveries: boy.totalDeliveries + 1 }
            : boy
        ));
      }
      return o.id === id ? { ...o, status } : o;
    }));
  };

  const assignOrderToDeliveryBoy = (orderId: string, deliveryBoyId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, deliveryBoyId } : o));
  };

  const addDeliveryBoy = (deliveryBoy: Omit<DeliveryBoy, 'id' | 'totalDeliveries' | 'rating'>) => {
    const newDeliveryBoy = { 
      ...deliveryBoy, 
      id: Date.now().toString(),
      totalDeliveries: 0,
      rating: 5.0
    };
    setDeliveryBoys(prev => [...prev, newDeliveryBoy]);
  };

  const updateDeliveryBoy = (id: string, deliveryBoy: Partial<DeliveryBoy>) => {
    setDeliveryBoys(prev => prev.map(db => db.id === id ? { ...db, ...deliveryBoy } : db));
  };

  const deleteDeliveryBoy = (id: string) => {
    setDeliveryBoys(prev => prev.filter(db => db.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      offers,
      products,
      orders,
      deliveryBoys,
      addOffer,
      updateOffer,
      deleteOffer,
      updateProduct,
      addOrder,
      updateOrderStatus,
      assignOrderToDeliveryBoy,
      addDeliveryBoy,
      updateDeliveryBoy,
      deleteDeliveryBoy,
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
