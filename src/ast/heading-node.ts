import type { ASTNode, ASTNodeType } from "./node";
import type { TextLineNode } from "./text-line-node";

type HeadingLevel = number;

export class HeadingNode implements ASTNode {
  readonly kind: ASTNodeType = "heading";
  readonly text: TextLineNode;
  readonly level: HeadingLevel;

  constructor(text: TextLineNode, level: HeadingLevel) {
    this.text = text;
    this.level = level;
  }
}
