import type { ASTNode, ASTNodeType } from "./node";
import type { SectionNode } from "./section-node";

export class DocumentNode implements ASTNode {
  readonly kind: ASTNodeType = "text";
  private sections: SectionNode[];

  constructor(sections: SectionNode[]) {
    this.sections = sections;
  }
}
