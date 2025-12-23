import { z } from 'zod';
import { codePoint } from './common';
import { codecChar } from './codec-char';

export const patternURIComponent = /^(?:%([0-9a-fA-F]+))+$/;

export const codecURIComponent = z.codec(
  z.string().trim().regex(patternURIComponent),
  codePoint,
  {
    decode: (str, ctx) => {
      try {
        return codecChar.decode(decodeURIComponent(str))
      } catch (err) {
        ctx.issues.push({
          code: 'custom',
          format: 'codecURIComponent',
          input: String(str),
          message: (err as Error).message,
        });
        return z.NEVER;
      }
    },
    encode: (code, ctx) => {
      try {
        return encodeURIComponent(codecChar.encode(code));
      } catch (err) {
        ctx.issues.push({
          code: 'custom',
          format: 'codecURIComponent',
          input: String(code),
          message: (err as Error).message,
        });
        return z.NEVER;
      }
    },
  },
);
