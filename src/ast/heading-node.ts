import type { ASTNode, ASTNodeType } from "./node";

export class HeadingNode implements ASTNode {
  readonly kind: ASTNodeType = "heading";
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
