import { z } from 'zod';
import { codePoint } from './common';

export const patternCSS = /^\\([0-9A-Fa-f]{1,6})$/;

export const codecCSS = z.codec(
  z.string().trim().regex(patternCSS),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternCSS)![1], 0x10),
    encode: (code) => `\\${code.toString(0x10).toLowerCase()}`,
  },
);
