import { z } from 'zod';
import { codePoint } from './common';

export const patternJSLong = /^\\u([0-9A-Fa-f]{4})$/;

export const codecJSLong = z.codec(
  z.string().trim().regex(patternJSLong),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternJSLong)![1], 0x10),
    encode: (code) => `\\u${code.toString(0x10).toLowerCase().padStart(4, '0')}`,
  },
);
