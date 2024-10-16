import { useState } from 'react';
import { User, GameData } from './types/types';
import LoginForm from './components/LoginForm';
import GameSelection from './components/GameSelection';
import GamePlayer from './components/GamePlayer';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleGameSelect = (game: GameData) => {
    setSelectedGame(game);
  };

  const handleBackToSelection = () => {
    setSelectedGame(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (selectedGame) {
    return <GamePlayer game={selectedGame} onBack={handleBackToSelection} />;
  }

  return <GameSelection onSelectGame={handleGameSelect} />;
};

export default App;