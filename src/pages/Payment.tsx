import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, cartTotal, cartItemCount, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const { address, deliveryCharges } = location.state || { address: '', deliveryCharges: 0 };
  const totalAmount = cartTotal + deliveryCharges;

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} showBackButton />
      
      <main className="container px-4 py-6 space-y-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Payment Method</h1>
        
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charges:</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-primary">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Delivery Address</h3>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Select Payment Method</h3>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex-1 cursor-pointer">
                <div className="font-medium">UPI</div>
                <div className="text-sm text-muted-foreground">Pay using UPI apps</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div className="font-medium">Card</div>
                <div className="text-sm text-muted-foreground">Credit or Debit card</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                <div className="font-medium">Cash on Delivery</div>
                <div className="text-sm text-muted-foreground">Pay when you receive</div>
              </Label>
            </div>
          </RadioGroup>

          <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
            Place Order - ₹{totalAmount}
          </Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
