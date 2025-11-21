import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui/card';
import { DollarSign, CreditCard, Smartphone, Banknote } from 'lucide-react';

export default function AdminRevenue() {
  const { orders } = useAdmin();

  const revenueByMethod = orders.reduce((acc, order) => {
    const method = order.paymentMethod || 'cash';
    acc[method] = (acc[method] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const totalRevenue = Object.values(revenueByMethod).reduce((sum, val) => sum + val, 0);

  const paymentMethods = [
    { key: 'cash', label: 'Cash', icon: Banknote, color: 'text-green-500' },
    { key: 'card', label: 'Card', icon: CreditCard, color: 'text-blue-500' },
    { key: 'upi', label: 'UPI', icon: Smartphone, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Revenue Analytics by Payment Method</h2>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-4xl font-bold text-primary">₹{totalRevenue.toFixed(2)}</p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {paymentMethods.map((method) => {
          const revenue = revenueByMethod[method.key] || 0;
          const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
          const Icon = method.icon;

          return (
            <Card key={method.key} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-full bg-muted ${method.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">{method.label}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">₹{revenue.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No orders to analyze yet</p>
      )}
    </div>
  );
}
