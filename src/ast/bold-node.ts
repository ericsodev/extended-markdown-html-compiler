import type { ASTNode, ASTNodeType } from "./node";

export class BoldNode implements ASTNode {
  readonly kind: ASTNodeType = "bold";
  private text: string;

  constructor(text: string) {
    this.text = text;
  }
}
