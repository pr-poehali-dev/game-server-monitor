import ServerCard from "@/components/ServerCard";
import { ServerType } from "@/types/server";

interface ServerListProps {
  servers: ServerType[];
}

const ServerList = ({ servers }: ServerListProps) => {
  // Сортировка серверов: сначала премиум, затем по количеству игроков
  const sortedServers = [...servers].sort((a, b) => {
    if (a.premium && !b.premium) return -1;
    if (!a.premium && b.premium) return 1;
    
    // Сортировка по онлайн/оффлайн статусу
    if (a.status === "online" && b.status === "offline") return -1;
    if (a.status === "offline" && b.status === "online") return 1;
    
    // Если оба сервера премиум или оба не премиум, сортируем по количеству игроков
    return b.players - a.players;
  });

  if (servers.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-lg border">
        <h3 className="text-lg font-medium">Серверы не найдены</h3>
        <p className="text-muted-foreground mt-2">
          Попробуйте изменить параметры поиска или выбрать другую игру
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedServers.map((server) => (
        <ServerCard 
          key={server.id} 
          {...server} 
        />
      ))}
    </div>
  );
};

export default ServerList;
