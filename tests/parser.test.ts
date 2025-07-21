import { Parser } from "../src/parser/parser";
import { Tokenizer } from "../src/parser/lexer";
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

describe("Test lexer and parser", () => {
  it("Should correctly tokenizer and parse for simple text", () => {
    const input = "Hello world";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);
    expect(result.kind).toBe("text");

    // Access the body to verify structure
    const body = (result as any).body;
    expect(body).toBeInstanceOf(SectionNode);
    expect(body.kind).toBe("section");

    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);
    expect(sections[0]).toBeInstanceOf(ParagraphNode);

    const textLines = (sections[0] as any).text;
    expect(textLines).toHaveLength(1);
    expect(textLines[0]).toBeInstanceOf(TextLineNode);

    const textNodes = (textLines[0] as any).text;
    expect(textNodes).toHaveLength(1);
    expect(textNodes[0]).toBeInstanceOf(TextNode);
    expect(textNodes[0]).toHaveProperty("text", "Hello world");
  });

  it("Should correctly tokenizer and parse for simple heading", () => {
    const input = "# My Heading";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    expect(body).toBeInstanceOf(SectionNode);

    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);
    expect(sections[0]).toBeInstanceOf(HeadingNode);
    expect(sections[0].kind).toBe("heading");
    expect(sections[0].level).toBe(1);

    const headingText = sections[0].text;
    expect(headingText).toBeInstanceOf(TextLineNode);

    const textNodes = (headingText as any).text;
    expect(textNodes).toHaveLength(1);
    expect(textNodes[0]).toBeInstanceOf(TextNode);
    expect(textNodes[0]).toHaveProperty("text", "My Heading");
  });

  it("Should correctly tokenizer and parse for text with bold", () => {
    const input = "This is *bold* text";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);
    expect(sections[0]).toBeInstanceOf(ParagraphNode);

    const textLines = (sections[0] as any).text;
    expect(textLines).toHaveLength(1);

    const textNodes = (textLines[0] as any).text;
    expect(textNodes).toHaveLength(3); // "This is ", BoldNode("bold"), " text"
    expect(textNodes[0]).toBeInstanceOf(TextNode);
    expect(textNodes[1]).toBeInstanceOf(BoldNode);
    expect(textNodes[1].kind).toBe("bold");
    expect(textNodes[2]).toBeInstanceOf(TextNode);
  });

  it("Should correctly tokenizer and parse for multiple headings", () => {
    const input = "# Level 1\n## Level 2\n### Level 3";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(3);

    // Check first heading
    expect(sections[0]).toBeInstanceOf(HeadingNode);
    expect(sections[0].level).toBe(1);

    // Check second heading
    expect(sections[1]).toBeInstanceOf(HeadingNode);
    expect(sections[1].level).toBe(2);

    // Check third heading
    expect(sections[2]).toBeInstanceOf(HeadingNode);
    expect(sections[2].level).toBe(3);
  });

  it("Should correctly tokenizer and parse for heading and paragraph", () => {
    const input = "# Title\nThis is a paragraph.";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(2);

    // Check heading
    expect(sections[0]).toBeInstanceOf(HeadingNode);
    expect(sections[0].level).toBe(1);

    // Check paragraph
    expect(sections[1]).toBeInstanceOf(ParagraphNode);
    const textLines = (sections[1] as any).text;
    expect(textLines).toHaveLength(1);

    const textNodes = (textLines[0] as any).text;
    expect(textNodes.length).toBeGreaterThan(0);
    expect(textNodes[0]).toBeInstanceOf(TextNode);
  });

  it("Should correctly tokenizer and parse for complex markdown", () => {
    const input =
      "# Main Title\nThis is a paragraph with *bold* text.\n## Subtitle\nAnother paragraph here.";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(4); // heading, paragraph, heading, paragraph

    // Check main title
    expect(sections[0]).toBeInstanceOf(HeadingNode);
    expect(sections[0].level).toBe(1);

    // Check first paragraph with bold text
    expect(sections[1]).toBeInstanceOf(ParagraphNode);
    const firstParagraphText = (sections[1] as any).text[0].text;
    const hasBoldNode = firstParagraphText.some(
      (node: any) => node instanceof BoldNode,
    );
    expect(hasBoldNode).toBe(true);

    // Check subtitle
    expect(sections[2]).toBeInstanceOf(HeadingNode);
    expect(sections[2].level).toBe(2);

    // Check second paragraph
    expect(sections[3]).toBeInstanceOf(ParagraphNode);
  });

  it("Should correctly tokenizer and parse for multiple bold sections", () => {
    const input = "Text with *first bold* and *second bold* sections.";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);

    const textNodes = (sections[0] as any).text[0].text;
    const boldNodes = textNodes.filter((node: any) => node instanceof BoldNode);
    expect(boldNodes).toHaveLength(2);
    expect(boldNodes[0].kind).toBe("bold");
    expect(boldNodes[1].kind).toBe("bold");
  });

  it("Should correctly tokenizer and parse for unclosed bold asterisk", () => {
    const input = "Text with *unclosed asterisk at end";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);

    const textNodes = (sections[0] as any).text[0].text;
    // Should all be TextNodes since asterisk is unclosed
    const allTextNodes = textNodes.every(
      (node: any) => node instanceof TextNode,
    );
    expect(allTextNodes).toBe(true);

    // Should contain the asterisk as part of text
    const combinedText = textNodes
      .map((node: any) => (node as any).text || node.literal)
      .join("");
    expect(combinedText).toContain("*");
  });

  it("Should correctly tokenizer and parse with empty lines", () => {
    const input = "# Title\n\nParagraph after empty line.";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(2); // heading and paragraph (empty line should be skipped)

    expect(sections[0]).toBeInstanceOf(HeadingNode);
    expect(sections[1]).toBeInstanceOf(ParagraphNode);
  });

  it("Should correctly tokenizer and parse for multiline document", () => {
    const input = `# Introduction
This is the first paragraph with *emphasis*.

## Section One
Another paragraph here.

### Subsection
Final paragraph with more *bold text* here.`;
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections.length).toBeGreaterThan(5); // At least 6 sections (3 headings, 3 paragraphs)

    // Check heading levels
    const headings = sections.filter(
      (section: any) => section instanceof HeadingNode,
    );
    expect(headings).toHaveLength(3);
    expect(headings[0].level).toBe(1);
    expect(headings[1].level).toBe(2);
    expect(headings[2].level).toBe(3);

    // Check that there are paragraphs with bold text
    const paragraphs = sections.filter(
      (section: any) => section instanceof ParagraphNode,
    );
    expect(paragraphs.length).toBeGreaterThan(0);

    const hasBoldInAnyParagraph = paragraphs.some((paragraph: any) => {
      const textNodes = (paragraph as any).text[0].text;
      return textNodes.some((node: any) => node instanceof BoldNode);
    });
    expect(hasBoldInAnyParagraph).toBe(true);
  });

  it("Should handle single asterisk without pair", () => {
    const input = "Start * middle end";
    const tokenizer = new Tokenizer(input);
    const tokens = tokenizer.tokenize();
    const parser = new Parser(tokens);

    const result = parser.parseDocument();

    expect(result).toBeInstanceOf(DocumentNode);

    const body = (result as any).body;
    const sections = (body as any).sections;
    expect(sections).toHaveLength(1);

    const textNodes = (sections[0] as any).text[0].text;
    // All should be TextNodes since asterisks don't form pairs
    const allTextNodes = textNodes.every(
      (node: any) => node instanceof TextNode,
    );
    expect(allTextNodes).toBe(true);

    // Should contain asterisks in the text content
    const hasAsterisks = textNodes.some((node: any) => {
      const nodeText = (node as any).text;
      return nodeText && nodeText.includes("*");
    });
    expect(hasAsterisks).toBe(true);
  });
});
