import { codecBinary } from './codec-binary';
import { codecChar } from './codec-char';
import { codecCSS } from './codec-css';
import { codecDecimal } from './codec-decimal';
import { codecHexadecimal } from './codec-hexadecimal';
import { codecHTMLDecimal } from './codec-html-decimal';
import { codecHTMLEntity } from './codec-html-entity';
import { codecHTMLHexadecimal } from './codec-html-hexadecimal';
import { codecJSLong } from './codec-js-long';
import { codecJSShort } from './codec-js-short';
import { codecJSUnicode } from './codec-js-unicode';
import { codecOctal } from './codec-octal';
import { codecUnicode } from './codec-unicode';
import { codecURIComponent } from './codec-uri-component';
import { CharacterEncoding } from './common';

export const mapCodecByIdentifier = new Map([
  [CharacterEncoding.BINARY, codecBinary],
  [CharacterEncoding.CHAR, codecChar],
  [CharacterEncoding.CSS, codecCSS],
  [CharacterEncoding.DECIMAL, codecDecimal],
  [CharacterEncoding.HEXADECIMAL, codecHexadecimal],
  [CharacterEncoding.HTML_DECIMAL, codecHTMLDecimal],
  [CharacterEncoding.HTML_ENTITY, codecHTMLEntity],
  [CharacterEncoding.HTML_HEXADECIMAL, codecHTMLHexadecimal],
  [CharacterEncoding.JS_UNICODE, codecJSUnicode],
  [CharacterEncoding.JS_LONG, codecJSLong],
  [CharacterEncoding.JS_SHORT, codecJSShort],
  [CharacterEncoding.OCTAL, codecOctal],
  [CharacterEncoding.UNICODE, codecUnicode],
  [CharacterEncoding.URI_COMPONENT, codecURIComponent],
]);

export const getCodecByIdentifier = (encoding: CharacterEncoding) => {
  return mapCodecByIdentifier.get(encoding)!;
};
