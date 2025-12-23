import { z } from 'zod';
import { codePoint } from './common';

export const patternOctal = /^[0-8]+$/;

export const codecOctal = z.codec(
  z.string().trim().regex(patternOctal),
  codePoint,
  {
    decode: (str) => parseInt(str, 0o10),
    encode: (code) => code.toString(0o10),
  },
);
