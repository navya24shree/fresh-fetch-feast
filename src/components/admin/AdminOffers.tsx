import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOffers() {
  const { offers, addOffer, deleteOffer } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    discount: 0,
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.photo || !formData.discount || !formData.date) {
      toast.error('Please fill all fields');
      return;
    }
    addOffer(formData);
    setFormData({ name: '', photo: '', discount: 0, date: '' });
    setShowForm(false);
    toast.success('Offer added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Offers</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Offer Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="date">Valid Until</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Offer</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-4">
            <img src={offer.photo} alt={offer.name} className="w-full h-32 object-cover rounded mb-3" />
            <h3 className="font-semibold">{offer.name}</h3>
            <p className="text-sm text-muted-foreground">Discount: {offer.discount}%</p>
            <p className="text-sm text-muted-foreground">Valid until: {offer.date}</p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-3 w-full"
              onClick={() => {
                deleteOffer(offer.id);
                toast.success('Offer deleted');
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
