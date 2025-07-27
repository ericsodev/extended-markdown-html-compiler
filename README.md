# ts-md-html

This is a proof-of-concept for generating HTML files using an extended markdown syntax to create linkable documents.


## Usage

This tool converts Markdown files to HTML using a custom parser and compiler.

### Prerequisites

- [Bun](https://bun.sh/) runtime installed

### Command Line Usage

```bash
bun run index.ts <input-file> <output-file>
```

**Parameters:**
- `<input-file>` - Path to the Markdown file you want to convert
- `<output-file>` - Path where the generated HTML file will be saved

**Example:**
```bash
bun run index.ts document.md output.html
```

This will:
1. Read the Markdown content from `document.md`
2. Parse the Markdown into tokens
3. Build a document structure
4. Compile the document to HTML
5. Write the HTML output to `output.html`
