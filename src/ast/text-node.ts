import type { ASTNode, ASTNodeType } from "./node";

export class TextNode implements ASTNode {
  readonly kind: ASTNodeType = "text";
  private readonly text: string;
}
