import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, BarChart2, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">
            GameServers
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Серверы
          </Link>
          <Link to="/stats" className="text-sm font-medium hover:text-primary transition-colors">
            Статистика
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            О проекте
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <BarChart2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="default">Добавить сервер</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
