import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { Category } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Beef, Fish } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'chicken' as Category, label: 'Chicken', icon: Beef, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&h=100&fit=crop' },
  { name: 'mutton' as Category, label: 'Mutton', icon: Beef, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=100&h=100&fit=crop' },
  { name: 'fish' as Category, label: 'Fish', icon: Fish, image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=100&h=100&fit=crop' },
  { name: 'prawns' as Category, label: 'Prawns', icon: Fish, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=100&h=100&fit=crop' },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { addToCart, cartItemCount } = useCart();

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} />
      
      <main className="container px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        {!selectedCategory ? (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{category.label}</h3>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold capitalize">{selectedCategory}</h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline"
              >
                Back to Categories
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
