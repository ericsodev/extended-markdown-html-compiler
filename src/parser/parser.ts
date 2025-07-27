import { BoldNode } from "../ast/bold-node";
import { DocumentNode } from "../ast/document-node";
import { HeadingNode } from "../ast/heading-node";
import { ParagraphNode } from "../ast/paragraph-node";
import { SectionNode } from "../ast/section-node";
import { TextLineNode } from "../ast/text-line-node";
import { TextNode } from "../ast/text-node";
import { TitleNode } from "../ast/title-node";
import { UriNode } from "../ast/uri-node";
import type { Token } from "./tokens";

export class Parser {
  private tokens: Token[];
  private currentPosition: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentPosition = 0;
  }

  public parseDocument(): DocumentNode {
    let title, uri;
    while (this.currentPosition < this.tokens.length) {
      const currentToken = this.currentToken();
      if (currentToken.kind === "eof") {
        break;
      } else if (currentToken.kind === "new line") {
        this.consumeToken();
        continue;
      }

      const command = this.peekToken(1);

      const isCommand =
        currentToken.kind === "slash" &&
        command?.kind === "string" &&
        this.peekToken(2)?.kind === "space";

      if (!isCommand) {
        break;
      }

      if (command.literal === "title") {
        title = this.parseTitleCommand();
      } else if (command.literal === "uri") {
        uri = this.parseUriCommand();
      } else {
        break;
      }
    }

    const section = this.parseSection();
    return DocumentNode.build({ body: section, title, uri });
  }

  private consumeHashes(): string {
    let result = "";
    while (this.currentToken().kind === "hash") {
      this.consumeToken();
      result += "#";
    }
    return result;
  }

  private parseHeadingNode(hashes: string): HeadingNode {
    let level = hashes.length;
    if (this.consumeToken().kind !== "space") {
      throw new Error("Expected space after hash while parsing heading node.");
    }

    const text = this.parseLine();
    return new HeadingNode(text, level);
  }
  private parseParagraph(): ParagraphNode {
    const line = this.parseLine();
    return new ParagraphNode([line]);
  }

  private parseTitleCommand(): TitleNode {
    if (this.currentToken().kind !== "slash") {
      throw new Error("Expected slash");
    }
    this.consumeToken();

    const command = this.currentToken();
    if (command.kind !== "string" && command.literal === "title") {
      throw new Error("Expected title");
    }
    this.consumeToken();

    if (this.currentToken().kind !== "space") {
      throw new Error("Expected space");
    }
    this.consumeToken();

    const title = this.parseLiteralText();

    return new TitleNode(title);
  }
  private parseUriCommand(): UriNode {
    if (this.currentToken().kind !== "slash") {
      throw new Error("Expected slash");
    }
    this.consumeToken();

    const command = this.currentToken();
    if (command.kind !== "string" && command.literal === "uri") {
      throw new Error("Expected uri");
    }
    this.consumeToken();

    if (this.currentToken().kind !== "space") {
      throw new Error("Expected space");
    }
    this.consumeToken();

    const uri = this.parseLiteralText();

    return new UriNode(uri);
  }

  private parseSection(): SectionNode {
    const sections: (ParagraphNode | HeadingNode)[] = [];
    while (this.currentPosition < this.tokens.length) {
      const currentToken = this.currentToken();
      if (currentToken.kind === "eof") {
        break;
      } else if (currentToken.kind === "new line") {
        this.consumeToken();
        continue;
      }

      const originalPosition = this.currentPosition;
      if (currentToken.kind === "hash") {
        const hashes = this.consumeHashes();
        if (this.currentToken().kind === "space" && hashes.length < 7) {
          // is a heading
          sections.push(this.parseHeadingNode(hashes));
        } else {
          // is just regular text, backtrack
          this.currentPosition = originalPosition;
          sections.push(this.parseParagraph());
        }
      } else {
        sections.push(this.parseParagraph());
      }
    }

    return new SectionNode(sections);
  }

  // parse up to a new line character or EOF
  private parseLine(): TextLineNode {
    const text: (TextNode | BoldNode)[] = [];
    while (
      this.currentToken().kind !== "new line" &&
      this.currentToken().kind !== "eof"
    ) {
      // Check bold
      if (this.currentToken().kind === "asterisk") {
        this.consumeToken();
        const parsedText = this.parseLiteralText();
        if (this.currentToken().kind === "asterisk") {
          this.consumeToken();
          // Is bold node
          text.push(new BoldNode(parsedText));
        } else {
          // Regular text
          text.push(new TextNode("*" + parsedText));
        }
        continue;
      }

      text.push(new TextNode(this.parseLiteralText()));
    }

    return new TextLineNode(text);
  }

  // Parses tokens until line break, asterisk, or eof
  private parseLiteralText(): string {
    let text: string = "";
    while (
      this.currentToken().kind !== "new line" &&
      this.currentToken().kind !== "eof" &&
      this.currentToken().kind !== "asterisk"
    ) {
      text += this.consumeToken().literal;
    }
    return text;
  }

  private peekToken(n = 1): Token | undefined {
    const token = this.tokens.at(this.currentPosition + n);
    return token;
  }

  private currentToken(): Token {
    const token = this.tokens.at(this.currentPosition);
    if (!token)
      throw new Error(
        `Out of bounds while accessing token at index '${this.currentPosition}'`,
      );
    return token;
  }

  private consumeToken(): Token {
    const token = this.tokens.at(this.currentPosition);
    if (!token)
      throw new Error(
        `Out of bounds while accessing token at index '${this.currentPosition}'`,
      );
    this.currentPosition++;
    return token;
  }
}
