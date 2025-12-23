import { z } from 'zod';
import { codePoint } from './common';

export const patternBinary = /^[01]+$/;

export const codecBinary = z.codec(
  z.string().trim().regex(patternBinary),
  codePoint,
  {
    decode: (str) => parseInt(str, 0b10),
    encode: (code) => code.toString(0b10),
  },
);
