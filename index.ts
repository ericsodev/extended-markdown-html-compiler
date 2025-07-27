import { HTMLCompiler } from "./src/compiler/html-compiler";
import { Tokenizer } from "./src/parser/lexer";
import { Parser } from "./src/parser/parser";
const inPath = Bun.argv[2];
const outPath = Bun.argv[3];

if (!inPath) {
  throw new Error("Missing input path");
}

if (!outPath) {
  throw new Error("Missing output path");
}

const input = await Bun.file(inPath).text();

const tokenizer = new Tokenizer(input);
const tokens = tokenizer.tokenize();
const parser = new Parser(tokens);
const document = parser.parseDocument();
const compiler = new HTMLCompiler(document);

const html = compiler.compile();

Bun.write(Bun.file(outPath), html);

