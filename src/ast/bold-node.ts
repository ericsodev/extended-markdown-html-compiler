import type { ASTNode, ASTNodeType } from "./node";

export class BoldNode implements ASTNode {
  readonly kind = "bold";
  readonly #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  get text(): string {
    return this.#text;
  }
}
