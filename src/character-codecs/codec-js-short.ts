import { z } from 'zod';
import { codePoint } from './common';

export const patternJSShort = /^\\x([0-9A-Fa-f]{2})$/;

export const codecJSShort = z.codec(
  z.string().trim().regex(patternJSShort),
  codePoint.max(0x100),
  {
    decode: (str) => parseInt(str.match(patternJSShort)![1], 0x10),
    encode: (code) => `\\x${code.toString(0x10).toLowerCase().padStart(2, '0')}`,
  },
);
