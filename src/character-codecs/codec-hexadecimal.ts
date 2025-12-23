import { z } from 'zod';
import { codePoint } from './common';

export const patternHexadecimal = /^[0-9a-fA-F]+$/;

export const codecHexadecimal = z.codec(
  z.string().trim().regex(patternHexadecimal),
  codePoint,
  {
    decode: (str) => parseInt(str, 0x10),
    encode: (code) => code.toString(0x10),
  },
);
