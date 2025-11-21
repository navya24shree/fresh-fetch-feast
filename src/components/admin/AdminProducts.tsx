import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Product } from '@/types/product';

export default function AdminProducts() {
  const { products, updateProduct } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      updateProduct(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      toast.success('Product updated successfully');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Products</h2>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            {editingId === product.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Selling Price (₹)</Label>
                    <Input
                      type="number"
                      value={editForm.price || 0}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <Input
                      value={editForm.weight || ''}
                      onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editForm.inStock}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, inStock: checked })}
                    />
                    <Label>In Stock</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category} • {product.weight} • ₹{product.price}
                    </p>
                    <p className="text-sm">
                      {product.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                  </div>
                </div>
                <Button onClick={() => handleEdit(product)}>Edit</Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
