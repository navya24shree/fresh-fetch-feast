import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDeliveryBoys() {
  const { deliveryBoys, addDeliveryBoy, updateDeliveryBoy, deleteDeliveryBoy } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleAdd = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    addDeliveryBoy(formData);
    toast.success('Delivery boy added successfully');
    setIsAddDialogOpen(false);
    setFormData({ name: '', phone: '', email: '', status: 'active' });
  };

  const handleUpdate = () => {
    if (!editingId) return;

    updateDeliveryBoy(editingId, formData);
    toast.success('Delivery boy updated successfully');
    setEditingId(null);
    setFormData({ name: '', phone: '', email: '', status: 'active' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this delivery boy?')) {
      deleteDeliveryBoy(id);
      toast.success('Delivery boy deleted successfully');
    }
  };

  const startEdit = (boy: any) => {
    setEditingId(boy.id);
    setFormData({
      name: boy.name,
      phone: boy.phone,
      email: boy.email,
      status: boy.status,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Delivery Boys Management</h2>
        <Dialog open={isAddDialogOpen || editingId !== null} onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingId(null);
            setFormData({ name: '', phone: '', email: '', status: 'active' });
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Delivery Boy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Delivery Boy' : 'Add New Delivery Boy'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? 'Update' : 'Add'} Delivery Boy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {deliveryBoys.length === 0 ? (
          <p className="text-muted-foreground">No delivery boys added yet</p>
        ) : (
          deliveryBoys.map((boy) => (
            <Card key={boy.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{boy.name}</h3>
                    <Badge variant={boy.status === 'active' ? 'default' : 'secondary'}>
                      {boy.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Phone: {boy.phone}</p>
                  <p className="text-sm text-muted-foreground">Email: {boy.email}</p>
                  <div className="mt-2 flex gap-4">
                    <p className="text-sm">Deliveries: <span className="font-semibold">{boy.totalDeliveries}</span></p>
                    <p className="text-sm">Rating: <span className="font-semibold">{boy.rating.toFixed(1)}⭐</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => startEdit(boy)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(boy.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
