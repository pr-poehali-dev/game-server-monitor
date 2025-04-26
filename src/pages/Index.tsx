import { useState } from "react";
import Header from "@/components/Header";
import ServerList from "@/components/ServerList";
import GameFilter from "@/components/GameFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

// Временные данные для демонстрации
const mockedGames = [
  { id: "cs2", name: "CS2", count: 120 },
  { id: "minecraft", name: "Minecraft", count: 85 },
  { id: "gta5", name: "GTA 5", count: 67 },
  { id: "rust", name: "Rust", count: 43 },
  { id: "arma3", name: "Arma 3", count: 22 },
];

const mockedServers = [
  {
    id: "1",
    name: "☢ Мясной Фарш [DeathMatch] 128tick",
    game: "CS2",
    ip: "95.131.25.244:27015",
    players: 18,
    maxPlayers: 32,
    status: "online",
    location: "Москва",
    ping: 25,
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=320&q=80",
    premium: true,
  },
  {
    id: "2",
    name: "Vanilla Survival | No mods",
    game: "Minecraft",
    ip: "mc.gamehost.ru:25565",
    players: 54,
    maxPlayers: 100,
    status: "online",
    location: "Санкт-Петербург",
    ping: 42,
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=320&q=80",
    premium: false,
  },
  {
    id: "3",
    name: "RolePlay Server | x100 | PVP",
    game: "GTA 5",
    ip: "gta5.play.ru:30120",
    players: 198,
    maxPlayers: 200,
    status: "online",
    location: "Амстердам",
    ping: 78,
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?auto=format&fit=crop&w=320&q=80",
    premium: true,
  },
  {
    id: "4",
    name: "Выживание без вайпов",
    game: "Rust",
    ip: "rust.server.ru:28015",
    players: 12,
    maxPlayers: 150,
    status: "online",
    location: "Франкфурт",
    ping: 85,
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=320&q=80",
    premium: false,
  },
  {
    id: "5",
    name: "Хардкор RPG",
    game: "Arma 3",
    ip: "arma.host.ru:2302",
    players: 0,
    maxPlayers: 64,
    status: "offline",
    location: "Москва",
    ping: 0,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=320&q=80",
    premium: false,
  },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container py-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Боковая панель */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <h2 className="text-xl font-bold mb-4">Игры</h2>
              <GameFilter 
                games={mockedGames}
                selectedGame={selectedGame}
                onSelectGame={(game) => setSelectedGame(game === selectedGame ? null : game)}
              />
            </div>
            
            <div className="rounded-lg border bg-card p-4">
              <h2 className="text-xl font-bold mb-4">Добавить сервер</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Добавьте свой сервер в наш мониторинг бесплатно и получите больше игроков!
              </p>
              <Button className="w-full">Добавить сервер</Button>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="md:col-span-3">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск серверов..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <ServerList 
              servers={mockedServers.filter(server => 
                (!search || server.name.toLowerCase().includes(search.toLowerCase()) || 
                 server.ip.includes(search)) &&
                (!selectedGame || server.game.toLowerCase() === selectedGame.toLowerCase())
              )} 
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Мониторинг игровых серверов. Все права защищены.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Помощь
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Правила
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
