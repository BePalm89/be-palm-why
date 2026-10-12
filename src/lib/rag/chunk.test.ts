import { describe, it, expect } from "vitest";
import { chunkText } from "./chunk";

// Genera un testo di n parole: "w0 w1 w2 ..."
const words = (n: number) =>
  Array.from({ length: n }, (_, i) => `w${i}`).join(" ");

describe("chunkText", () => {
  it("restituisce [] per un testo vuoto", () => {
    expect(chunkText("")).toEqual([]);
    expect(chunkText("   \n  ")).toEqual([]);
  });

  it("restituisce un solo chunk se il testo è corto", () => {
    expect(chunkText("Ciao   mondo\n")).toEqual(["Ciao mondo"]);
  });

  it("nessun chunk supera maxWords", () => {
    const chunks = chunkText(words(1000), { maxWords: 300, overlapWords: 50 });
    for (const chunk of chunks) {
      expect(chunk.split(" ").length).toBeLessThanOrEqual(300);
    }
  });

  it("chunk consecutivi condividono overlapWords parole", () => {
    const chunks = chunkText(words(700), { maxWords: 300, overlapWords: 50 });
    const fineDelPrimo = chunks[0].split(" ").slice(-50);
    const inizioDelSecondo = chunks[1].split(" ").slice(0, 50);
    expect(inizioDelSecondo).toEqual(fineDelPrimo);
  });

  it("non perde nessuna parola", () => {
    const chunks = chunkText(words(1000), { maxWords: 300, overlapWords: 50 });
    const viste = new Set(chunks.flatMap((chunk) => chunk.split(" ")));
    expect(viste.size).toBe(1000);
    expect(chunks.at(-1)!.endsWith("w999")).toBe(true);
  });

  it("rifiuta overlapWords >= maxWords", () => {
    expect(() =>
      chunkText(words(10), { maxWords: 5, overlapWords: 5 })
    ).toThrow();
  });
});