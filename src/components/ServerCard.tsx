import { ServerType } from "@/types/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  server: ServerType;
}

const ServerCard = ({ server }: ServerCardProps) => {
  // Определение иконки игры
  const getGameIcon = (game: string) => {
    switch (game) {
      case "minecraft":
        return "🧊";
      case "cs2":
        return "🔫";
      case "gta5":
        return "🚗";
      case "gmod":
        return "🔧";
      default:
        return "🎮";
    }
  };

  // Определение цвета статуса
  const getStatusColor = (status: "online" | "offline") => {
    return status === "online" ? "bg-green-500" : "bg-red-500";
  };

  // Отображение количества игроков
  const renderPlayerCount = () => {
    const percentage = (server.players / server.maxPlayers) * 100;
    
    let colorClass = "text-green-500";
    if (percentage > 85) {
      colorClass = "text-orange-500";
    } else if (percentage > 95) {
      colorClass = "text-red-500";
    }

    return (
      <span className={colorClass}>
        {server.players}/{server.maxPlayers}
      </span>
    );
  };

  return (
    <Card className={cn(
      "transition-all duration-300 overflow-hidden",
      server.premium ? "border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-transparent" : ""
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Левая часть - изображение */}
          <div className="hidden sm:block w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0">
            {server.image ? (
              <img src={server.image} alt={server.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {getGameIcon(server.game)}
              </div>
            )}
          </div>
          
          {/* Центральная часть - информация */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg truncate">
                {server.name}
              </h3>
              {server.premium && (
                <StarIcon className="h-4 w-4 text-yellow-400" fill="currentColor" />
              )}
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">
              IP: <span className="font-mono">{server.ip}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full", getStatusColor(server.status))}></div>
                <span className="capitalize">{server.status}</span>
              </div>
              
              <div>
                Игроки: {renderPlayerCount()}
              </div>
              
              <div>
                Пинг: <span className={server.ping < 30 ? "text-green-500" : server.ping < 70 ? "text-orange-500" : "text-red-500"}>
                  {server.status === "online" ? `${server.ping} мс` : "—"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Правая часть - действия */}
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              {server.location}
            </Badge>
            
            <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
              {server.game === "minecraft" && "Minecraft"}
              {server.game === "cs2" && "Counter-Strike 2"}
              {server.game === "gta5" && "GTA 5"}
              {server.game === "gmod" && "Garry's Mod"}
            </Badge>
            
            {!server.premium && (
              <Button variant="outline" size="sm" className="text-xs mt-1">
                Поднять в топ
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerCard;
