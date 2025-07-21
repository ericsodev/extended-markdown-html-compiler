import type { BoldNode } from "./bold-node";
import type { ASTNode, ASTNodeType } from "./node";
import type { TextNode } from "./text-node";

export class ParagraphNode implements ASTNode {
  readonly kind: ASTNodeType = "paragraph";
  private text: (TextNode | BoldNode)[];

  constructor(text: (TextNode | BoldNode)[]) {
    this.text = text;
  }
}
