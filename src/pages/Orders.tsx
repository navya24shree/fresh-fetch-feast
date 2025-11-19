import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockOrders = [
  {
    id: 'ORD001',
    items: ['Chicken Breast', 'Mutton Curry Cut'],
    total: 998,
    date: '2024-01-15',
    status: 'delivered' as const,
  },
  {
    id: 'ORD002',
    items: ['Fresh Pomfret', 'King Prawns'],
    total: 1198,
    date: '2024-01-18',
    status: 'confirmed' as const,
  },
];

export default function Orders() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={0} showBackButton />
      
      <main className="container px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                  {order.status}
                </Badge>
              </div>
              
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm">• {item}</p>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-lg font-semibold">Total: ₹{order.total}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
