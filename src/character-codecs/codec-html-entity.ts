import { z } from 'zod';
import { codePoint } from './common';
import { mapCodePointByEntity, mapEntityByCodePoint } from './html-entity-names';

export const patternHTMLEntity = /^&([0-9a-zA-Z]+);$/;

export const codecHTMLEntity = z.codec(
  z.string().trim().regex(patternHTMLEntity),
  codePoint,
  {
    decode: (str, ctx) => {
      const code = mapCodePointByEntity.get(str);
      if (code) return code;
      ctx.issues.push({
        code: "invalid_format",
        format: "codecHTMLEntity",
        input: str,
        message: 'No HTML entity found for this code point.',
      });
      return z.NEVER;
    },
    encode: (code, ctx) => {
      const entity = mapEntityByCodePoint.get(code);
      if (entity) return entity;
      ctx.issues.push({
        code: "invalid_format",
        format: "codecHTMLEntity",
        input: code.toString(),
        message: 'No code point found for this HTML entity.',
      });
      return z.NEVER;
    },
  },
);
