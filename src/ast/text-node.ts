import type { ASTNode, ASTNodeType } from "./node";

export class TextNode implements ASTNode {
  readonly kind = "text";
  readonly #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  get text(): string {
    return this.#text;
  }
}
