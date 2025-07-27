export const documentWithTitle = `/title this is the title


# Heading
this is some text
`;
export const documentWithUri = `/uri this is the uri


# Heading
this i s some text`;
export const documentWithTitleAndUri = `/title this is the title
/uri this is the uri


# Heading
this is some text
`;

export const documentWithSlashes = `
//title this is escaped as regular text

# Heading
this is some text with a /
/title this should be treated as regular text
/uri this should be treated as regular text
`;
