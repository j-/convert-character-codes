import { z } from 'zod';
import { codePoint } from './common';

export const patternDecimal = /^[0-9]+$/;

export const codecDecimal = z.codec(
  z.string().trim().regex(patternDecimal),
  codePoint,
  {
    decode: (str) => parseInt(str, 10),
    encode: (code) => code.toString(10),
  },
);
