import z from 'zod';
import { CharacterEncoding, codePoint } from './common';
import { getCodecByIdentifier } from './get-codec-by-identifier';
import { getPatternByIdentifier } from './get-pattern-by-identifier';

const encodingsInOrderOfPrecedence = [
  CharacterEncoding.UNICODE,
  CharacterEncoding.CSS,
  CharacterEncoding.HEXADECIMAL,
  CharacterEncoding.DECIMAL,
  CharacterEncoding.OCTAL,
  CharacterEncoding.BINARY,
  CharacterEncoding.HTML_ENTITY,
  CharacterEncoding.HTML_HEXADECIMAL,
  CharacterEncoding.HTML_DECIMAL,
  CharacterEncoding.JS_UNICODE,
  CharacterEncoding.JS_LONG,
  CharacterEncoding.JS_SHORT,
  CharacterEncoding.URI_COMPONENT,
  CharacterEncoding.CHAR,
] as const;

const identifiers = z.union(
  encodingsInOrderOfPrecedence.map((id) => z.literal(id))
);

export const codecDetectEncoding = z.codec(
  z.string(),
  z.tuple([identifiers, codePoint]).readonly(),
  {
    // decode: (input, ctx) => {
    //   for (const id of encodingsInOrderOfPrecedence) {
    //     const schema = getCodecByIdentifier(id);
    //     const { success, data } = schema.safeParse(input);
    //     if (success) {
    //       return [id, data] as const;
    //     }
    //   }
    //   ctx.issues.push({
    //     code: 'custom',
    //     format: 'codecDetectEncoding',
    //     input: String(input),
    //     message: 'No candidate schema matched this input.',
    //   });
    //   return z.NEVER;
    // },

    decode: (input, ctx) => {
      for (const id of encodingsInOrderOfPrecedence) {
        const pattern = getPatternByIdentifier(id);
        if (!pattern.test(input)) continue;
        
        const schema = getCodecByIdentifier(id);
        const { success, data } = schema.safeParse(input);
        if (!success) continue;

        return [id, data] as const;
      }
      
      ctx.issues.push({
        code: 'custom',
        format: 'codecDetectEncoding',
        input: String(input),
        message: 'No candidate schema matched this input.',
      });
      return z.NEVER;
    },

    encode: (input, ctx) => {
      ctx.issues.push({
        code: 'custom',
        format: 'codecDetectEncoding',
        input: String(input),
        message: 'encode() is not supported for this classifier (no canonical input).',
      });
      return z.NEVER;
    },
  },
);
