import { useEffect, useRef, useState } from 'react';
import { GameData } from '../types/types';
import WasmBoy from 'wasmboy';


interface GamePlayerProps {
  game: GameData;
  onBack: () => void;
}

const GamePlayer = ({ game, onBack }: GamePlayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWasmBoy = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize WasmBoy with the canvas
        if (!canvasRef.current) {
          throw new Error('Canvas not found');
        }

        await WasmBoy.config({
          canvas: canvasRef.current,
          isGbcEnabled: game.system === 'GBC',
          audioBatchProcessing: true,
          audioVolume: 0.5,
          saveStateCallback: async (saveState: Uint8Array) => {
            // TODO: Implement save state handling
            console.log('Save state created:', saveState);
          }
        });

        // Initialize WasmBoy
        await WasmBoy.initialize();

        // Load the ROM
        const response = await fetch(game.romUrl);
        const romBuffer = await response.arrayBuffer();
        await WasmBoy.loadROM(romBuffer);

        // Load saved state if it exists
        if (game.saveState) {
          await WasmBoy.loadState(game.saveState);
        }

        // Start the game
        await WasmBoy.play();
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load game');
        setIsLoading(false);
      }
    };

    initializeWasmBoy();

    // Cleanup function
    return () => {
      WasmBoy.pause();
      WasmBoy.reset();
    };
  }, [game]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          WasmBoy.inputSet(0, true); // Up
          break;
        case 'ArrowDown':
          WasmBoy.inputSet(1, true); // Down
          break;
        case 'ArrowLeft':
          WasmBoy.inputSet(2, true); // Left
          break;
        case 'ArrowRight':
          WasmBoy.inputSet(3, true); // Right
          break;
        case 'z':
          WasmBoy.inputSet(4, true); // A
          break;
        case 'x':
          WasmBoy.inputSet(5, true); // B
          break;
        case 'Enter':
          WasmBoy.inputSet(6, true); // Start
          break;
        case 'Shift':
          WasmBoy.inputSet(7, true); // Select
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          WasmBoy.inputSet(0, false);
          break;
        case 'ArrowDown':
          WasmBoy.inputSet(1, false);
          break;
        case 'ArrowLeft':
          WasmBoy.inputSet(2, false);
          break;
        case 'ArrowRight':
          WasmBoy.inputSet(3, false);
          break;
        case 'z':
          WasmBoy.inputSet(4, false);
          break;
        case 'x':
          WasmBoy.inputSet(5, false);
          break;
        case 'Enter':
          WasmBoy.inputSet(6, false);
          break;
        case 'Shift':
          WasmBoy.inputSet(7, false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative bg-gray-800 rounded-lg p-4 shadow-lg">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-2 left-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>

        {/* Game title */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">{game.title}</h2>

        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg">
            <div className="text-white">Loading game...</div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        {/* Game canvas */}
        <canvas
          ref={canvasRef}
          className="bg-black rounded"
          width={160}
          height={144}
          style={{ width: '480px', height: '432px', imageRendering: 'pixelated' }}
        />

        {/* Controls legend */}
        <div className="mt-4 text-gray-300 text-sm">
          <p>Controls:</p>
          <ul className="grid grid-cols-2 gap-2">
            <li>Arrow Keys: D-pad</li>
            <li>Z: A Button</li>
            <li>X: B Button</li>
            <li>Enter: Start</li>
            <li>Shift: Select</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;