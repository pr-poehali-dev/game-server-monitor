import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Game {
  id: string;
  name: string;
  count: number;
}

interface GameFilterProps {
  games: Game[];
  selectedGame: string | null;
  onSelectGame: (gameId: string) => void;
}

const GameFilter = ({ games, selectedGame, onSelectGame }: GameFilterProps) => {
  return (
    <div className="space-y-2">
      {games.map((game) => (
        <button
          key={game.id}
          className={cn(
            "flex justify-between items-center w-full p-2 rounded-md text-left transition-colors",
            selectedGame === game.id
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50"
          )}
          onClick={() => onSelectGame(game.id)}
        >
          <span className="font-medium">{game.name}</span>
          <Badge variant="outline">{game.count}</Badge>
        </button>
      ))}
    </div>
  );
};

export default GameFilter;
