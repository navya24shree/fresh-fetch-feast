import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={0} showBackButton />
      
      <main className="container px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        
        <Card className="p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/')}>
              Start Shopping
            </Button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
