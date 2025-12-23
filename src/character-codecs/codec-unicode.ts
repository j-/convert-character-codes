import { z } from 'zod';
import { codePoint } from './common';

export const patternUnicode = /^U\+([0-9A-Fa-f]{4,})$/;

export const codecUnicode = z.codec(
  z.string().trim().regex(patternUnicode),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternUnicode)![1], 0x10),
    encode: (code) => `U+${code.toString(0x10).toUpperCase().padStart(4, '0')}`,
  },
);
