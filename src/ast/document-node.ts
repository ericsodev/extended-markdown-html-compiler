import type { ASTNode, ASTNodeType } from "./node";
import type { SectionNode } from "./section-node";
import type { TitleNode } from "./title-node";
import type { UriNode } from "./uri-node";

interface DocumentProps {
  title?: TitleNode;
  uri?: UriNode;
  body: SectionNode;
}

export class DocumentNode implements ASTNode {
  readonly kind = "document";
  #title?: TitleNode;
  #uri?: UriNode;
  #body: SectionNode;

  protected constructor(body: SectionNode, title?: TitleNode, uri?: UriNode) {
    this.#body = body;
    this.#title = title;
    this.#uri = uri;
  }

  get title(): TitleNode | undefined {
    return this.#title;
  }

  get uri(): UriNode | undefined {
    return this.#uri;
  }

  get body(): SectionNode {
    return this.#body;
  }
  static build({ title, uri, body }: DocumentProps): DocumentNode {
    return new DocumentNode(body, title, uri);
  }
}
