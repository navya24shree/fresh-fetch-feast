import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import AdminOffers from '@/components/admin/AdminOffers';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminProfile from '@/components/admin/AdminProfile';
import AdminDeliveryBoys from '@/components/admin/AdminDeliveryBoys';
import AdminPerformance from '@/components/admin/AdminPerformance';
import AdminRevenue from '@/components/admin/AdminRevenue';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="offers" className="w-full">
          <TabsList className="grid w-full grid-cols-7 overflow-x-auto">
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="offers" className="mt-6">
            <AdminOffers />
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="delivery" className="mt-6">
            <AdminDeliveryBoys />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <AdminPerformance />
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <AdminRevenue />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <AdminProfile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
