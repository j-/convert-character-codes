import { z } from 'zod';

export const MAX_CODE_POINT = 0x10ffff;

export const codePoint = z.int().min(0).max(MAX_CODE_POINT);

export enum CharacterEncoding {
  AUTO_DETECT,
  BINARY,
  CHAR,
  CSS,
  DECIMAL,
  HEXADECIMAL,
  HTML_DECIMAL,
  HTML_ENTITY,
  HTML_HEXADECIMAL,
  JS_UNICODE,
  JS_LONG,
  JS_SHORT,
  OCTAL,
  UNICODE,
  URI_COMPONENT,
}

export type CharacterCodec = z.ZodCodec<z.ZodString, z.ZodInt> | z.ZodLazy<z.ZodCodec<z.ZodString, z.ZodInt>>;
