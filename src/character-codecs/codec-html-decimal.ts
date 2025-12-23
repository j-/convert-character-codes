import { z } from 'zod';
import { codePoint } from './common';

export const patternHTMLDecimal = /^&#([0-9]+);$/;

export const codecHTMLDecimal = z.codec(
  z.string().trim().regex(patternHTMLDecimal),
  codePoint,
  {
    decode: (str) => parseInt(str.match(patternHTMLDecimal)![1], 10),
    encode: (code) => `&#${code};`,
  },
);
