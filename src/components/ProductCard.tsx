import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AddToCartDrawer } from './AddToCartDrawer';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddWithWeight = (product: Product, weight: number, unit: 'kg' | 'g') => {
    onAddToCart(product);
    toast.success(`Added ${weight}${unit} of ${product.name} to cart`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.weight}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <Button 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsDrawerOpen(true);
            }}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
        <AddToCartDrawer
          product={product}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onAdd={handleAddWithWeight}
        />
      </div>
    </Card>
  );
}
