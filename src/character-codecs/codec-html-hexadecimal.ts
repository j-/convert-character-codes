import { z } from 'zod';
import { codePoint } from './common';

export const patternHTMLHexadecimal = /^&#x([0-9A-Fa-f]+);$/;

export const codecHTMLHexadecimal = z.codec(
  z.string().trim().regex(patternHTMLHexadecimal),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternHTMLHexadecimal)![1], 0x10),
    encode: (code) => `&#x${code.toString(0x10).toLowerCase().padStart(4, '0')};`,
  },
);
