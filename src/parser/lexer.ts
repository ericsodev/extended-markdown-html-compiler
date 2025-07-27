import {
  AsteriskToken,
  EOFToken,
  HashToken,
  LineBreakToken,
  SpaceToken,
  StringToken,
  SlashToken,
  type Token,
} from "./tokens";

const SPECIAL_TOKENS = ["\n", "*", "#", " ", "/"];

export class Tokenizer {
  private readonly input: string;
  private currentPostion: number;
  constructor(input: string) {
    this.input = input;
    this.currentPostion = 0;
  }

  public tokenize(): Token[] {
    this.currentPostion = 0;
    const tokens: Token[] = [];

    while (this.currentPostion < this.input.length) {
      const currentCharacter = this.input[this.currentPostion];

      switch (currentCharacter) {
        case "#": {
          tokens.push(new HashToken());
          this.currentPostion++;
          break;
        }
        case "*": {
          tokens.push(new AsteriskToken());
          this.currentPostion++;
          break;
        }
        case "\n": {
          tokens.push(new LineBreakToken());
          this.currentPostion++;
          break;
        }
        case " ": {
          tokens.push(new SpaceToken());
          this.currentPostion++;
          break;
        }
        case "/": {
          tokens.push(new SlashToken());
          this.currentPostion++;
          break;
        }
        default: {
          // Continue parsing string until end
          const text = this.matchString();
          tokens.push(new StringToken(text));
        }
      }
    }
    tokens.push(new EOFToken());
    return tokens;
  }

  private matchString(): string {
    const startingPosition = this.currentPostion;
    let currentCharacter = this.input[this.currentPostion];

    do {
      this.currentPostion++;
      currentCharacter = this.input[this.currentPostion];
    } while (
      this.currentPostion < this.input.length &&
      currentCharacter &&
      !SPECIAL_TOKENS.includes(currentCharacter)
    );

    return this.input.substring(startingPosition, this.currentPostion);
  }
}
