import type { HeadingNode } from "./heading-node";
import type { ASTNode, ASTNodeType } from "./node";
import type { ParagraphNode } from "./paragraph-node";

export class SectionNode implements ASTNode {
  readonly kind: ASTNodeType = "section";
  private sections: (ParagraphNode | HeadingNode)[];

  constructor(sections: (ParagraphNode | HeadingNode)[]) {
    this.sections = sections;
  }
}
