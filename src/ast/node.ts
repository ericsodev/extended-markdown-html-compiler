export type ASTNodeType =
  | "document"
  | "section"
  | "paragraph"
  | "bold"
  | "text"
  | "heading";

export interface ASTNode {
  readonly kind: ASTNodeType;
}
