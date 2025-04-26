import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, Globe, ArrowUp, Shield } from "lucide-react";
import { ServerType } from "@/types/server";
import { cn } from "@/lib/utils"; // Добавлен импорт функции cn

const ServerCard = ({
  name,
  game,
  ip,
  players,
  maxPlayers,
  status,
  location,
  ping,
  image,
  premium
}: ServerType) => {
  const playerPercentage = Math.round((players / maxPlayers) * 100);
  
  return (
    <div className={cn(
      "rounded-lg border bg-card p-4 transition-all hover:shadow-md relative overflow-hidden",
      premium && "border-primary/30"
    )}>
      {premium && (
        <div className="absolute top-0 right-0">
          <Badge variant="default" className="rounded-none rounded-bl-md">
            <Shield className="h-3 w-3 mr-1" /> PREMIUM
          </Badge>
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt={game} className="h-full w-full object-cover" />
            ) : (
              <Globe className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          
          <div>
            <h3 className="font-medium line-clamp-1">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={status === "online" ? "default" : "destructive"} className="text-xs">
                {status === "online" ? "Онлайн" : "Оффлайн"}
              </Badge>
              <span className="text-xs text-muted-foreground">{game}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground">{location}</div>
          <div className="text-xs font-medium mt-1 select-all">{ip}</div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">
              {players}/{maxPlayers}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Пинг: <span className={ping < 50 ? "text-green-400" : ping < 100 ? "text-yellow-400" : "text-red-400"}>
              {ping} мс
            </span>
          </div>
        </div>
        <Progress value={playerPercentage} className="h-1.5" />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <Button variant="secondary" size="sm">Подробнее</Button>
        {!premium && (
          <Button variant="outline" size="sm" className="text-xs">
            <ArrowUp className="h-3 w-3 mr-1" /> 
            Поднять в топ
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServerCard;
