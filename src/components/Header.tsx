import { ArrowLeft, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartItemCount: number;
  showBackButton?: boolean;
}

export function Header({ cartItemCount, showBackButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FreshMeat Market
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Cart and Profile buttons removed - now in bottom nav */}
        </div>
      </div>
    </header>
  );
}
