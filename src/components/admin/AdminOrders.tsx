import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminOrders() {
  const { orders, updateOrderStatus, assignOrderToDeliveryBoy, deliveryBoys } = useAdmin();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  const handleStatusChange = (orderId: string, status: 'pending' | 'delivered') => {
    updateOrderStatus(orderId, status);
    toast.success(`Order marked as ${status}`);
  };

  const handleAssignDeliveryBoy = (orderId: string, deliveryBoyId: string) => {
    assignOrderToDeliveryBoy(orderId, deliveryBoyId);
    toast.success('Order assigned to delivery boy');
  };

  const getDeliveryBoyName = (id?: string) => {
    if (!id) return 'Unassigned';
    const boy = deliveryBoys.find(b => b.id === id);
    return boy?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
        <div className="grid gap-4">
          {pendingOrders.length === 0 ? (
            <p className="text-muted-foreground">No pending orders</p>
          ) : (
            pendingOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {order.customerName}</p>
                    <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    <p className="text-sm text-muted-foreground">Payment: {order.paymentMethod || 'cash'}</p>
                  </div>
                  <Badge variant="secondary">{order.status}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.productName} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Total: ₹{order.total}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Delivery Boy</Label>
                    <Select 
                      value={order.deliveryBoyId || ''} 
                      onValueChange={(value) => handleAssignDeliveryBoy(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={getDeliveryBoyName(order.deliveryBoyId)} />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryBoys.filter(b => b.status === 'active').map((boy) => (
                          <SelectItem key={boy.id} value={boy.id}>
                            {boy.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" size="sm" onClick={() => handleStatusChange(order.id, 'delivered')}>
                    Mark as Delivered
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Delivered Orders</h2>
        <div className="grid gap-4">
          {deliveredOrders.length === 0 ? (
            <p className="text-muted-foreground">No delivered orders</p>
          ) : (
            deliveredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {order.customerName}</p>
                    <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    <p className="text-sm text-muted-foreground">Payment: {order.paymentMethod || 'cash'}</p>
                    <p className="text-sm text-muted-foreground">Delivered by: {getDeliveryBoyName(order.deliveryBoyId)}</p>
                  </div>
                  <Badge>{order.status}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.productName} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="font-semibold">Total: ₹{order.total}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
