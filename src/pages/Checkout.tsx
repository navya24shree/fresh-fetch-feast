import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { MapPin, CreditCard, Wallet, Banknote } from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartTotal, cartItemCount, clearCart } = useCart();
  const { address, deliveryCharges } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const finalTotal = cartTotal + (deliveryCharges || 0);

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} showBackButton />
      
      <main className="container px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">Payment</h1>
        
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Delivery Address</h3>
                <p className="text-sm text-muted-foreground">{address || 'No address provided'}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>₹{deliveryCharges || 0}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">₹{finalTotal}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Select Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="upi" id="upi" />
                <Wallet className="h-5 w-5 text-primary" />
                <Label htmlFor="upi" className="cursor-pointer flex-1">UPI</Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <CreditCard className="h-5 w-5 text-primary" />
                <Label htmlFor="netbanking" className="cursor-pointer flex-1">Net Banking</Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="h-5 w-5 text-primary" />
                <Label htmlFor="cash" className="cursor-pointer flex-1">Cash on Delivery</Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleConfirmPayment}
        >
          Confirm Payment
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
