declare namespace cuid2 {
  type initInput = {
    counter?: number;
    length?: number;
    fingerprint?: string;
  };
  export function createId(): string;
  export function init(input?: initInput): () => string;
  export function getConstants(): { defaultLength: number; bigLength: number };
}

export = cuid2;
