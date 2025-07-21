import type { BoldTextNode } from "./bold-text-node";
import type { ASTNode, ASTNodeType } from "./node";
import type { TextNode } from "./text-node";

export class TextLineNode implements ASTNode {
  readonly kind: ASTNodeType = "text";
  private readonly text: (TextNode | BoldTextNode)[];

  constructor(text: (TextNode | BoldTextNode)[]) {
    this.text = text;
  }
}
