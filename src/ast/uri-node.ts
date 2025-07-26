import type { ASTNode } from "./node";

export class UriNode implements ASTNode {
  readonly kind = "uri";
  readonly #uri: string;

  constructor(uri: string) {
    this.#uri = uri;
  }

  get uri(): string {
    return this.#uri;
  }
}
