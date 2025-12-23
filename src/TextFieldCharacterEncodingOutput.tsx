import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { memo, useEffect, useMemo, useState } from 'react';
import {
  CharacterEncoding,
  getCodecByIdentifier,
  getCodecName,
  getEntitiesForCodePoint,
} from './character-codecs';

export type TextFieldCharacterEncodingOutputProps = {
  codePoint: number | null;
  setCodePoint: (newCodePoint: number) => void;
  encoding: CharacterEncoding;
};

export const TextFieldCharacterEncodingOutput = memo<
  TextFieldCharacterEncodingOutputProps
>(({
  codePoint,
  setCodePoint,
  encoding,
}) => {
  const [overriddenValue, setOverriddenValue] = useState<string | null>(null);
  
  const codecName = useMemo(() => {
    return getCodecName(encoding);
  }, [encoding]);

  const codec = useMemo(() => {
    return getCodecByIdentifier(encoding);
  }, [encoding]);

  const result = useMemo(() => {
    if (codePoint == null) return null;
    return codec.safeEncode(codePoint);
  }, [codePoint, codec]);

  const displayValue = useMemo(() => {
    if (!codePoint) return null;
    if (!result || !result.data) return null;
    if (encoding === CharacterEncoding.HTML_ENTITY) {
      return Array.from(getEntitiesForCodePoint(codePoint)).join('\u2003');
    }
    return result.data;
  }, [codePoint, result, encoding]);
  
  return (
    <FormControl fullWidth>
      <TextField
        label={codecName}
        variant="outlined"
        size="small"
        value={
          overriddenValue != null ? overriddenValue :
          displayValue != null ? displayValue :
          ''
        }
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            // readOnly: true,
          },
        }}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setOverriddenValue(value);

          const result = codec.safeDecode(value);
          if (result.success) {
            setCodePoint(result.data);
          }
        }}
        onBlur={() => {
          setOverriddenValue(null);
        }}
      />
    </FormControl>
  );
});
