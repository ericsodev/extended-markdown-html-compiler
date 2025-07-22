import type { HeadingNode } from "./heading-node";
import type { ASTNode } from "./node";
import type { ParagraphNode } from "./paragraph-node";

export class SectionNode implements ASTNode {
  readonly kind = "section";
  #sections: (ParagraphNode | HeadingNode)[];

  constructor(sections: (ParagraphNode | HeadingNode)[]) {
    this.#sections = sections;
  }

  get sections(): (ParagraphNode | HeadingNode)[] {
    return this.#sections;
  }
}
