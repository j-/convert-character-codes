import { z } from 'zod';
import { codePoint } from './common';

export const patternJSUnicode = /^\\u\{([0-9A-Fa-f]{1,6})\}$/;

export const codecJSUnicode = z.codec(
  z.string().trim().regex(patternJSUnicode),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternJSUnicode)![1], 0x10),
    encode: (code) => `\\u{${code.toString(0x10).toLowerCase()}}`,
  },
);
