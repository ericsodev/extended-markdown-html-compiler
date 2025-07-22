import type { ASTNode, ASTNodeType } from "./node";
import type { SectionNode } from "./section-node";

export class DocumentNode implements ASTNode {
  readonly kind = "document";
  #body: SectionNode;

  constructor(body: SectionNode) {
    this.#body = body;
  }

  get body(): SectionNode {
    return this.#body;
  }
}
