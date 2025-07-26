import type { ASTNode } from "./node";

export class TitleNode implements ASTNode {
  readonly kind = "title";
  readonly #title: string;

  constructor(title: string) {
    this.#title = title;
  }

  get title(): string {
    return this.#title;
  }
}
