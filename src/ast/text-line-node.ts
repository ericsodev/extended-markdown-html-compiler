import type { BoldNode } from "./bold-node";
import type { ASTNode, ASTNodeType } from "./node";
import type { TextNode } from "./text-node";

export class TextLineNode implements ASTNode {
  readonly kind = "text";
  readonly #text: (TextNode | BoldNode)[];

  constructor(text: (TextNode | BoldNode)[]) {
    this.#text = text;
  }

  get text(): (TextNode | BoldNode)[] {
    return this.#text;
  }
}
