import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Header = () => {
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          Nextory
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            BookTok Trends
          </Link>
          <Link to="/comparison" className="text-foreground hover:text-primary transition-colors">
            Why Nextory
          </Link>
          <Link to="/kids" className="text-foreground hover:text-primary transition-colors">
            For Kids
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Search className="h-5 w-5" />
            <span className="sr-only">Sök</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hidden sm:flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Mina sidor</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Meny</span>
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;