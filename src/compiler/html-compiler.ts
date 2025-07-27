import type { BoldNode } from "../ast/bold-node";
import type { DocumentNode } from "../ast/document-node";
import type { HeadingNode } from "../ast/heading-node";
import type { ParagraphNode } from "../ast/paragraph-node";
import type { SectionNode } from "../ast/section-node";
import type { TextLineNode } from "../ast/text-line-node";
import type { TextNode } from "../ast/text-node";
import type { TitleNode } from "../ast/title-node";
import type { UriNode } from "../ast/uri-node";

export class HTMLCompiler {
  #html: string;
  constructor(private document: DocumentNode) {
    this.#html = "";
  }

  protected append(str: string): void {
    this.#html += str;
  }

  protected appendSingleTag(tagName: string): void {
    this.#html += `<${tagName} />`;
  }

  protected appendOpeningTag(tagName: string): void {
    this.#html += `<${tagName}>`;
  }

  protected appendClosingTag(tagName: string): void {
    this.#html += `</${tagName}>`;
  }

  public compile(): string {
    this.visitDocumentNode(this.document);

    return this.#html;
  }

  private visitDocumentNode(documentNode: DocumentNode): void {
    this.appendOpeningTag("html");
    this.appendOpeningTag("head");
    if (documentNode.title) {
      this.visitTitleNode(documentNode.title);
    }

    this.appendClosingTag("head");

    this.appendOpeningTag("body");
    this.visitSectionNode(documentNode.body);

    this.appendClosingTag("body");
    this.appendClosingTag("html");
  }

  private visitTitleNode(titleNode: TitleNode): void {
    this.appendOpeningTag("title");
    this.append(titleNode.title);
    this.appendClosingTag("title");
  }

  private visitSectionNode(sectionNode: SectionNode): void {
    for (const section of sectionNode.sections) {
      if (section.kind === "paragraph") {
        this.visitParagraphNode(section);
      } else {
        this.visitHeadingNode(section);
      }
    }
  }
  private visitParagraphNode(paragraphNode: ParagraphNode): void {
    this.appendOpeningTag("p");
    for (const child of paragraphNode.text) {
      this.visitTextLineNode(child);
      this.appendSingleTag("br");
    }
    this.appendClosingTag("p");
  }
  private visitHeadingNode(headingNode: HeadingNode): void {
    const tagName = `h${headingNode.level}`;
    this.appendOpeningTag(tagName);
    this.visitTextLineNode(headingNode.text);
    this.appendClosingTag(tagName);
  }

  private visitTextLineNode(textNode: TextLineNode): void {
    for (const childNode of textNode.text) {
      if (childNode.kind === "text") {
        this.visitTextNode(childNode);
      } else {
        this.visitBoldNode(childNode);
      }
    }
  }
  private visitTextNode(textNode: TextNode): void {
    this.append(textNode.text);
  }
  private visitBoldNode(boldNode: BoldNode): void {
    this.appendOpeningTag("strong");
    this.append(boldNode.text);
    this.appendClosingTag("strong");
  }
}
