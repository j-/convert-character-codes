import { z } from 'zod';
import { codePoint } from './common';

export const patternChar = /^.$/;

export const codecChar = z.codec(
  z.string().length(1).regex(patternChar),
  codePoint,
  {
    decode: (str) => str.charCodeAt(0),
    encode: (code) => String.fromCharCode(code),
  },
);
