export type ASTNodeType =
  | "document"
  | "section"
  | "paragraph"
  | "bold"
  | "text"
  | "heading"
  | "title"
  | "uri";

export interface ASTNode {
  readonly kind: ASTNodeType;
}
