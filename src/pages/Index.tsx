import { useState, useEffect } from "react";
import { ServerType } from "@/types/server";
import ServerList from "@/components/ServerList";
import GameFilter from "@/components/GameFilter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MagnifyingGlassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  const [servers, setServers] = useState<ServerType[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Имитация загрузки данных
  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    const mockData: ServerType[] = [
      {
        id: "1",
        name: "FunMC Classic",
        game: "minecraft",
        ip: "mc.funmc.ru:25565",
        players: 120,
        maxPlayers: 500,
        status: "online",
        location: "Россия",
        ping: 15,
        image: "https://images.unsplash.com/photo-1613535058043-406d51a10c8a?q=80&w=1000",
        premium: true,
      },
      {
        id: "2",
        name: "CS Masters",
        game: "cs2",
        ip: "cs.masters.ru:27015",
        players: 22,
        maxPlayers: 32,
        status: "online",
        location: "Россия",
        ping: 25,
      },
      {
        id: "3",
        name: "GTA Online - Role Play",
        game: "gta5",
        ip: "rp.gtaserver.ru:22005",
        players: 420,
        maxPlayers: 1000,
        status: "online",
        location: "Германия",
        ping: 45,
        premium: true,
      },
      {
        id: "4",
        name: "Minecraft Survival",
        game: "minecraft",
        ip: "survival.mcplay.ru:25565",
        players: 85,
        maxPlayers: 200,
        status: "online",
        location: "Россия",
        ping: 18,
      },
      {
        id: "5",
        name: "CS:GO DeathMatch",
        game: "cs2",
        ip: "dm.csgopro.ru:27016",
        players: 12,
        maxPlayers: 20,
        status: "online",
        location: "Россия",
        ping: 30,
      },
      {
        id: "6",
        name: "GTA RP City",
        game: "gta5",
        ip: "rp.gtacity.ru:22006",
        players: 150,
        maxPlayers: 500,
        status: "offline",
        location: "Россия",
        ping: 0,
      },
      {
        id: "7",
        name: "Gmod DarkRP",
        game: "gmod",
        ip: "darkrp.gmodserver.ru:27015",
        players: 45,
        maxPlayers: 100,
        status: "online",
        location: "Россия",
        ping: 22,
      },
      {
        id: "8",
        name: "Garry's Prop Hunt",
        game: "gmod",
        ip: "prophunt.gmod.ru:27016",
        players: 28,
        maxPlayers: 50,
        status: "online",
        location: "Германия",
        ping: 40,
        premium: true,
      },
      {
        id: "9",
        name: "Gmod TTT Server",
        game: "gmod",
        ip: "ttt.gmodserver.ru:27017",
        players: 15,
        maxPlayers: 32,
        status: "online",
        location: "Россия",
        ping: 35,
      }
    ];

    setServers(mockData);
  }, []);

  const games = [
    { id: "minecraft", name: "Minecraft", count: servers.filter(server => server.game === "minecraft").length },
    { id: "cs2", name: "Counter-Strike 2", count: servers.filter(server => server.game === "cs2").length },
    { id: "gta5", name: "GTA 5", count: servers.filter(server => server.game === "gta5").length },
    { id: "gmod", name: "Garry's Mod", count: servers.filter(server => server.game === "gmod").length },
  ];

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(selectedGame === gameId ? null : gameId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredServers = servers.filter(server => {
    const matchesGame = selectedGame ? server.game === selectedGame : true;
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          server.ip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGame && matchesSearch;
  });

  const totalServers = filteredServers.length;
  const onlineServers = filteredServers.filter(server => server.status === "online").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Мониторинг игровых серверов</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Левая колонка - фильтры */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Игры</h2>
              <GameFilter 
                games={games} 
                selectedGame={selectedGame} 
                onSelectGame={handleGameSelect} 
              />
            </div>
            
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Статистика</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Всего серверов:</span>
                  <Badge variant="secondary">{totalServers}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Онлайн:</span>
                  <Badge variant="success" className="bg-green-500 hover:bg-green-600">{onlineServers}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Оффлайн:</span>
                  <Badge variant="destructive">{totalServers - onlineServers}</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Ваш баланс</h2>
              <div className="text-2xl font-bold mb-3">0 ₽</div>
              <Button className="w-full">Пополнить</Button>
            </div>
          </div>
          
          {/* Правая колонка - серверы */}
          <div className="flex-1">
            <div className="mb-4 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск серверов..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <ServerList servers={filteredServers} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
