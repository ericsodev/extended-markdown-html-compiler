import type { ASTNode, ASTNodeType } from "./node";
import type { TextLineNode } from "./text-line-node";

export class ParagraphNode implements ASTNode {
  readonly kind = "paragraph";
  #text: TextLineNode[];

  constructor(text: TextLineNode[]) {
    this.#text = text;
  }

  get text(): TextLineNode[] {
    return this.#text;
  }
}
