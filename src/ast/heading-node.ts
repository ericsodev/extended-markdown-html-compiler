import type { ASTNode } from "./node";
import type { TextLineNode } from "./text-line-node";

type HeadingLevel = number;

export class HeadingNode implements ASTNode {
  readonly kind = "heading";
  readonly #text: TextLineNode;
  readonly #level: HeadingLevel;

  constructor(text: TextLineNode, level: HeadingLevel) {
    this.#text = text;
    this.#level = level;
  }

  get level(): HeadingLevel {
    return this.#level;
  }

  get text(): TextLineNode {
    return this.#text;
  }
}
