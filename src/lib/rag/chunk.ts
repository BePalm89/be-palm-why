export type ChunkOptions = {
    maxWords?: number;
    overlapWords?: number;
  };
  
  /**
   * Divide un testo in pezzi di al massimo `maxWords` parole.
   * Pezzi consecutivi condividono `overlapWords` parole, così un concetto
   * tagliato a metà compare intero in almeno uno dei due.
   */
  export function chunkText(
    text: string,
    { maxWords = 300, overlapWords = 50 }: ChunkOptions = {}
  ): string[] {
    if (overlapWords >= maxWords) {
      throw new Error("overlapWords deve essere minore di maxWords");
    }
  
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    if (words.length <= maxWords) return [words.join(" ")];
  
    const step = maxWords - overlapWords;
    const chunks: string[] = [];
  
    for (let start = 0; start < words.length; start += step) {
      const end = Math.min(start + maxWords, words.length);
      chunks.push(words.slice(start, end).join(" "));
      if (end === words.length) break;
    }
  
    return chunks;
  }