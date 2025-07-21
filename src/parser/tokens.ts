type TokenType = "hash" | "string" | "asterisk" | "new line" | "space" | "eof";

export interface Token {
  kind: TokenType;
  literal: string;
}

export class HashToken implements Token {
  readonly kind = "hash";
  get literal() {
    return "#";
  }
}

export class StringToken implements Token {
  readonly kind = "string";
  #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  get literal() {
    return this.#text;
  }
}

export class AsteriskToken {
  readonly kind = "asterisk";
  get literal() {
    return "*";
  }
}

export class SpaceToken {
  readonly kind = "space";
  get literal() {
    return " ";
  }
}

export class LineBreakToken {
  readonly kind = "new line";
  get literal() {
    return "\n";
  }
}

export class EOFToken {
  readonly kind = "eof";
  get literal() {
    return "";
  }
}
