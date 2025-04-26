export interface ServerType {
  id: string;
  name: string;
  game: string;
  ip: string;
  players: number;
  maxPlayers: number;
  status: "online" | "offline";
  location: string;
  ping: number;
  image?: string;
  premium?: boolean;
}
