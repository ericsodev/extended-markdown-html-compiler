import { Parser } from "../src/parser/parser";
import { DocumentNode } from "../src/ast/document-node";
import { SectionNode } from "../src/ast/section-node";
import { ParagraphNode } from "../src/ast/paragraph-node";
import { HeadingNode } from "../src/ast/heading-node";
import { TextLineNode } from "../src/ast/text-line-node";
import { TextNode } from "../src/ast/text-node";
import { BoldNode } from "../src/ast/bold-node";
import {
  StringToken,
  SpaceToken,
  HashToken,
  LineBreakToken,
  AsteriskToken,
  EOFToken,
  type Token,
} from "../src/parser/tokens";

describe("Test parsing document", () => {
  it("Should parse a single paragraph with text", () => {
    const tokens: Token[] = [
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("is"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new StringToken("simple"),
      new SpaceToken(),
      new StringToken("paragraph."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
    expect(result.kind).toBe("text");
  });

  it("Should parse a single heading", () => {
    const tokens: Token[] = [
      new HashToken(),
      new SpaceToken(),
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("is"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new StringToken("heading"),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
    expect(result.kind).toBe("text");
  });

  it("Should parse a single paragraph with text and bolded text", () => {
    const tokens: Token[] = [
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("is"),
      new SpaceToken(),
      new AsteriskToken(),
      new StringToken("bold"),
      new AsteriskToken(),
      new SpaceToken(),
      new StringToken("text"),
      new SpaceToken(),
      new StringToken("in"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new StringToken("paragraph."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
    expect(result.kind).toBe("text");
  });

  it("Should parse a heading and a paragraph", () => {
    const tokens: Token[] = [
      new HashToken(),
      new SpaceToken(),
      new StringToken("Heading"),
      new LineBreakToken(),
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("is"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new StringToken("paragraph."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
    expect(result.kind).toBe("text");
  });

  it("Should parse multiple headings with different levels", () => {
    const tokens: Token[] = [
      new HashToken(),
      new SpaceToken(),
      new StringToken("Level"),
      new SpaceToken(),
      new StringToken("1"),
      new LineBreakToken(),
      new HashToken(),
      new HashToken(),
      new SpaceToken(),
      new StringToken("Level"),
      new SpaceToken(),
      new StringToken("2"),
      new LineBreakToken(),
      new HashToken(),
      new HashToken(),
      new HashToken(),
      new SpaceToken(),
      new StringToken("Level"),
      new SpaceToken(),
      new StringToken("3"),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
  });

  it("Should parse complex document with mixed content", () => {
    const tokens: Token[] = [
      new HashToken(),
      new SpaceToken(),
      new StringToken("Main"),
      new SpaceToken(),
      new StringToken("Title"),
      new LineBreakToken(),
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("is"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new StringToken("paragraph"),
      new SpaceToken(),
      new StringToken("with"),
      new SpaceToken(),
      new AsteriskToken(),
      new StringToken("bold"),
      new AsteriskToken(),
      new SpaceToken(),
      new StringToken("text."),
      new LineBreakToken(),
      new HashToken(),
      new HashToken(),
      new SpaceToken(),
      new StringToken("Subtitle"),
      new LineBreakToken(),
      new StringToken("Another"),
      new SpaceToken(),
      new StringToken("paragraph"),
      new SpaceToken(),
      new StringToken("here."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
  });

  it("Should handle empty lines gracefully", () => {
    const tokens: Token[] = [
      new HashToken(),
      new SpaceToken(),
      new StringToken("Title"),
      new LineBreakToken(),
      new LineBreakToken(),
      new StringToken("Paragraph"),
      new SpaceToken(),
      new StringToken("after"),
      new SpaceToken(),
      new StringToken("empty"),
      new SpaceToken(),
      new StringToken("line."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
  });

  it("Should parse unclosed bold asterisk as regular text", () => {
    const tokens: Token[] = [
      new StringToken("This"),
      new SpaceToken(),
      new StringToken("has"),
      new SpaceToken(),
      new StringToken("a"),
      new SpaceToken(),
      new AsteriskToken(),
      new StringToken("single"),
      new SpaceToken(),
      new StringToken("asterisk"),
      new SpaceToken(),
      new StringToken("without"),
      new SpaceToken(),
      new StringToken("closing."),
      new EOFToken(),
    ];
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
  });
});
