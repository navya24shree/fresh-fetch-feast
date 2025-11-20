import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartItemCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(3); // Mock distance in km

  const handleConfirm = () => {
    if (!address) {
      toast.error('Please enter your address');
      return;
    }
    
    const deliveryCharges = distance > 5 ? 50 : 0;
    setShowAddressDialog(false);
    navigate('/payment', { 
      state: { 
        address, 
        deliveryCharges 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} showBackButton />
      
      <main className="container px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <Card className="p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.weight}</p>
                      <p className="text-lg font-bold text-primary mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total Items:</span>
                  <span>{cartItemCount}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={() => setShowAddressDialog(true)}
                >
                  Confirm Order
                </Button>
              </div>
            </Card>
          </>
        )}
      </main>

      <BottomNav />

      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance from shop (km)</Label>
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {distance > 5 ? '₹50 delivery charges will be added' : 'Free delivery'}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirm}>
              Confirm & Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
