import Stack from '@mui/material/Stack';
import { memo } from 'react';
import { CharacterEncoding } from './character-codecs';
import { TextFieldCharacterEncodingOutput } from './TextFieldCharacterEncodingOutput';

const encodings = [
  CharacterEncoding.UNICODE,
  CharacterEncoding.CHAR,
  CharacterEncoding.HEXADECIMAL,
  CharacterEncoding.DECIMAL,
  CharacterEncoding.OCTAL,
  CharacterEncoding.BINARY,
  CharacterEncoding.JS_UNICODE,
  CharacterEncoding.JS_LONG,
  CharacterEncoding.JS_SHORT,
  CharacterEncoding.CSS,
  CharacterEncoding.HTML_HEXADECIMAL,
  CharacterEncoding.HTML_DECIMAL,
  CharacterEncoding.HTML_ENTITY,
  CharacterEncoding.URI_COMPONENT,
] as const;

export type EncodingOutputsProps = {
  codePoint: number | null;
  setCodePoint: (newCodePoint: number) => void;
};

export const EncodingOutputs = memo<
  EncodingOutputsProps
>(({
  codePoint,
  setCodePoint,
}) => (
  <Stack gap={1}>
    {encodings.map((encoding) => (
      <TextFieldCharacterEncodingOutput
        key={encoding}
        encoding={encoding}
        codePoint={codePoint}
        setCodePoint={setCodePoint}
      />
    ))}
  </Stack>
));
