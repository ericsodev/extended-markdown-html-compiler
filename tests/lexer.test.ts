import { Tokenizer } from "../src/parser/lexer";
import {
  AsteriskToken,
  EOFToken,
  HashToken,
  LineBreakToken,
  SpaceToken,
  StringToken,
  type Token,
} from "../src/parser/tokens";

describe("Test tokenizer", () => {
  test.each([
    ["word", [new StringToken("word")]],
    [
      "a sentence.",
      [new StringToken("a"), new SpaceToken(), new StringToken("sentence.")],
    ],
    [
      "# heading",
      [new HashToken(), new SpaceToken(), new StringToken("heading")],
    ],
    [
      "multiple\nlines",
      [
        new StringToken("multiple"),
        new LineBreakToken(),
        new StringToken("lines"),
      ],
    ],
  ])("Basic tests", (input, tokens) => {
    const expectedTokens = [...tokens, new EOFToken()];
    const tokenizer = new Tokenizer(input);
    const output = tokenizer.tokenize();

    expect(output).toEqual(expectedTokens);
  });
  test("Kitchen sink", () => {
    const input = "one two three four **foo** *bar* # four \n 5 six";
    const tokenizer = new Tokenizer(input);
    const output = tokenizer.tokenize();

    const expectedTokens: Token[] = [
      new StringToken("one"),
      new SpaceToken(),
      new StringToken("two"),
      new SpaceToken(),
      new StringToken("three"),
      new SpaceToken(),
      new StringToken("four"),
      new SpaceToken(),
      new AsteriskToken(),
      new AsteriskToken(),
      new StringToken("foo"),
      new AsteriskToken(),
      new AsteriskToken(),
      new SpaceToken(),
      new AsteriskToken(),
      new StringToken("bar"),
      new AsteriskToken(),
      new SpaceToken(),
      new HashToken(),
      new SpaceToken(),
      new StringToken("four"),
      new SpaceToken(),
      new LineBreakToken(),
      new SpaceToken(),
      new StringToken("5"),
      new SpaceToken(),
      new StringToken("six"),
      new EOFToken(),
    ];
    expect(output).toEqual(expectedTokens);
  });
});
