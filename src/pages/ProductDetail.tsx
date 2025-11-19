import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '@/data/products';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${quantity}x ${product.name} added to cart!`);
    navigate('/');
  };

  const handleBuyNow = () => {
    toast.success('Redirecting to checkout...');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={0} showBackButton />
      
      <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="aspect-video w-full bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Badge variant="secondary" className="ml-2">
                  {product.category}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">{product.weight}</p>
            </div>

            <div className="flex items-center justify-between py-4 border-y">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 gap-2" 
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
