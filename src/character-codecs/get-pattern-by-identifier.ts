import { patternBinary } from './codec-binary';
import { patternChar } from './codec-char';
import { patternCSS } from './codec-css';
import { patternDecimal } from './codec-decimal';
import { patternHexadecimal } from './codec-hexadecimal';
import { patternHTMLDecimal } from './codec-html-decimal';
import { patternHTMLEntity } from './codec-html-entity';
import { patternHTMLHexadecimal } from './codec-html-hexadecimal';
import { patternJSLong } from './codec-js-long';
import { patternJSShort } from './codec-js-short';
import { patternJSUnicode } from './codec-js-unicode';
import { patternOctal } from './codec-octal';
import { patternUnicode } from './codec-unicode';
import { patternURIComponent } from './codec-uri-component';
import { CharacterEncoding } from './common';

export const mapPatternByIdentifier = new Map([
  [CharacterEncoding.BINARY, patternBinary],
  [CharacterEncoding.CHAR, patternChar],
  [CharacterEncoding.CSS, patternCSS],
  [CharacterEncoding.DECIMAL, patternDecimal],
  [CharacterEncoding.HEXADECIMAL, patternHexadecimal],
  [CharacterEncoding.HTML_DECIMAL, patternHTMLDecimal],
  [CharacterEncoding.HTML_ENTITY, patternHTMLEntity],
  [CharacterEncoding.HTML_HEXADECIMAL, patternHTMLHexadecimal],
  [CharacterEncoding.JS_UNICODE, patternJSUnicode],
  [CharacterEncoding.JS_LONG, patternJSLong],
  [CharacterEncoding.JS_SHORT, patternJSShort],
  [CharacterEncoding.OCTAL, patternOctal],
  [CharacterEncoding.UNICODE, patternUnicode],
  [CharacterEncoding.URI_COMPONENT, patternURIComponent],
]);

export const getPatternByIdentifier = (encoding: CharacterEncoding) => {
  return mapPatternByIdentifier.get(encoding)!;
};
