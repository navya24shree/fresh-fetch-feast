import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    mobile: '+91 9876543210',
    email: 'john@example.com',
    age: '28',
    gender: 'Male',
    address: '123 Main Street, City, State - 400001',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={0} showBackButton />
      
      <main className="container px-4 py-6 space-y-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Profile</h1>
        
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Mobile</Label>
              <Input 
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input 
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Input 
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input 
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <Button className="w-full" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
