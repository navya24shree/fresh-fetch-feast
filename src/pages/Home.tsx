import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import { Category } from '@/types/product';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const offers = [
  { id: 1, title: '20% OFF on Chicken', description: 'Valid on orders above ₹500', color: 'bg-gradient-to-r from-primary to-secondary' },
  { id: 2, title: 'Free Delivery', description: 'On orders above ₹1000', color: 'bg-gradient-to-r from-accent to-cyan-500' },
  { id: 3, title: 'Buy 1 Get 1 on Fish', description: 'Limited time offer', color: 'bg-gradient-to-r from-success to-emerald-500' },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const { addToCart, cartItemCount } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category') as Category | null;
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);


  const categories: { name: string; value: Category }[] = [
    { name: 'Chicken', value: 'chicken' },
    { name: 'Mutton', value: 'mutton' },
    { name: 'Fish', value: 'fish' },
    { name: 'Prawns', value: 'prawns' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
          />
          </div>
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter & Sort</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <RadioGroup value={sortBy} onValueChange={(value: 'price' | 'name') => setSortBy(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="name" id="name" />
                      <Label htmlFor="name">Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price" id="price" />
                      <Label htmlFor="price">Price</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <RadioGroup 
                    value={selectedCategory || 'all'} 
                    onValueChange={(value) => {
                      setSelectedCategory(value === 'all' ? null : value as Category);
                      setFilterOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chicken" id="filter-chicken" />
                      <Label htmlFor="filter-chicken">Chicken</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mutton" id="filter-mutton" />
                      <Label htmlFor="filter-mutton">Mutton</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fish" id="filter-fish" />
                      <Label htmlFor="filter-fish">Fish</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prawns" id="filter-prawns" />
                      <Label htmlFor="filter-prawns">Prawns</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Offers Carousel */}
        <div className="px-8">
          <Carousel className="w-full">
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem key={offer.id}>
                  <div className={`${offer.color} rounded-xl p-6 text-white`}>
                    <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-white/90">{offer.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Products'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
