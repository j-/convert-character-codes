import { CharacterEncoding } from './common';

export const mapCodecNameByIdentifier = new Map([
  [CharacterEncoding.BINARY, 'BINARY'],
  [CharacterEncoding.CHAR, 'CHAR'],
  [CharacterEncoding.CSS, 'CSS'],
  [CharacterEncoding.DECIMAL, 'DECIMAL'],
  [CharacterEncoding.HEXADECIMAL, 'HEXADECIMAL'],
  [CharacterEncoding.HTML_DECIMAL, 'HTML_DECIMAL'],
  [CharacterEncoding.HTML_ENTITY, 'HTML_ENTITY'],
  [CharacterEncoding.HTML_HEXADECIMAL, 'HTML_HEXADECIMAL'],
  [CharacterEncoding.JS_UNICODE, 'JS_UNICODE'],
  [CharacterEncoding.JS_LONG, 'JS_LONG'],
  [CharacterEncoding.JS_SHORT, 'JS_SHORT'],
  [CharacterEncoding.OCTAL, 'OCTAL'],
  [CharacterEncoding.UNICODE, 'UNICODE'],
  [CharacterEncoding.URI_COMPONENT, 'URI_COMPONENT'],
]);

export const getCodecName = (encoding: CharacterEncoding) => {
  return mapCodecNameByIdentifier.get(encoding)!;
};
