import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { cartItemCount } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: user?.password || '',
    address: user?.address || '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        phone: user.phone,
        password: user.password,
        address: user.address,
      });
    }
  }, [user]);

  const handleSave = () => {
    updateProfile(profile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartItemCount={cartItemCount} />
      
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
              <p className="text-muted-foreground">{profile.phone}</p>
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
              <Label>Phone Number</Label>
              <Input 
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                type="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                disabled={!isEditing}
              />
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

            <Button 
              variant="destructive" 
              className="w-full gap-2" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
