
import { GameData } from '../types/types';

const SAMPLE_GAMES: GameData[] = [
  {
    id: '1',
    title: 'Pokemon Red',
    system: 'GB',
    romUrl: '/roms/pokemon-red.gb',
    coverImage: '/covers/pokemon-red.jpg'
  },
  {
    id: '2',
    title: 'The Legend of Zelda: Link\'s Awakening',
    system: 'GB',
    romUrl: '/roms/zelda-links-awakening.gb',
    coverImage: '/covers/zelda-links-awakening.jpg'
  }
];

interface GameSelectionProps {
  onSelectGame: (game: GameData) => void;
}

const GameSelection = ({ onSelectGame }: GameSelectionProps) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Select a Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_GAMES.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectGame(game)}
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/api/placeholder/400/300"
                alt={game.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{game.title}</h3>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {game.system}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
