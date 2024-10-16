declare module 'wasmboy' {
    export interface WasmBoyConfig {
      canvas: HTMLCanvasElement;
      isGbcEnabled?: boolean;
      audioBatchProcessing?: boolean;
      audioVolume?: number;
      saveStateCallback?: (saveState: Uint8Array) => Promise<void>;
    }
  
    const WasmBoy: {
      config: (options: WasmBoyConfig) => Promise<void>;
      initialize: () => Promise<void>;
      loadROM: (romBuffer: ArrayBuffer) => Promise<void>;
      loadState: (saveState: any) => Promise<void>;
      play: () => Promise<void>;
      pause: () => void;
      reset: () => void;
      inputSet: (button: number, pressed: boolean) => void;
    };
  
    export default WasmBoy;
  }