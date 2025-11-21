import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp } from 'lucide-react';

export default function AdminPerformance() {
  const { deliveryBoys } = useAdmin();

  const sortedBoys = [...deliveryBoys].sort((a, b) => b.totalDeliveries - a.totalDeliveries);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Delivery Staff Performance Leaderboard</h2>
      </div>

      {sortedBoys.length === 0 ? (
        <p className="text-muted-foreground">No delivery boys to show performance</p>
      ) : (
        <div className="grid gap-4">
          {sortedBoys.map((boy, index) => (
            <Card key={boy.id} className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{boy.name}</h3>
                    {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    <Badge variant={boy.status === 'active' ? 'default' : 'secondary'}>
                      {boy.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{boy.email}</p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        <span className="font-semibold">{boy.totalDeliveries}</span> deliveries
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        Rating: <span className="font-semibold">{boy.rating.toFixed(1)}⭐</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
