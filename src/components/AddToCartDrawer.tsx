import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

interface AddToCartDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product, weight: number, unit: 'kg' | 'g') => void;
}

export function AddToCartDrawer({ product, isOpen, onClose, onAdd }: AddToCartDrawerProps) {
  const [weight, setWeight] = useState('1');
  const [unit, setUnit] = useState<'kg' | 'g'>('kg');

  if (!product) return null;

  const basePrice = product.price;
  const weightInKg = unit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 1000;
  const calculatedPrice = Math.round(basePrice * (weightInKg / 0.5));

  const handleAdd = () => {
    if (!weight || parseFloat(weight) <= 0) {
      toast.error('Please enter a valid weight');
      return;
    }
    onAdd(product, parseFloat(weight), unit);
    setWeight('1');
    setUnit('kg');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-auto">
        <SheetHeader>
          <SheetTitle>Add to Cart</SheetTitle>
          <SheetDescription>Select weight and unit</SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <p className="text-sm text-primary mt-1">Base: ₹{basePrice} per 500g</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Unit</Label>
              <RadioGroup value={unit} onValueChange={(value: 'kg' | 'g') => setUnit(value)}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kg" id="kg" />
                    <Label htmlFor="kg">Kilogram (kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="g" id="g" />
                    <Label htmlFor="g">Gram (g)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Enter Weight</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">₹{calculatedPrice}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                For {weight} {unit} at ₹{basePrice}/500g
              </p>
            </div>

            <Button className="w-full" size="lg" onClick={handleAdd}>
              Add to Cart - ₹{calculatedPrice}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
