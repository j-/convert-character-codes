import Warning from '@mui/icons-material/Warning';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect, useId, useMemo, useState, type FC } from 'react';
import { useDebounce } from 'use-debounce';
import type { ZodSafeParseResult } from 'zod';
import {
  CharacterEncoding,
  codecDetectEncoding,
  entityNames,
  getCodecName,
} from './character-codecs';
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

export const App: FC = () => {
  const id = useId();
  const listId = `App-${id}-list`;
  const [input, setInput] = useState('?');
  const [debouncedInput] = useDebounce(input, 100);
  
  const [decoded, setDecoded] = useState<
    ZodSafeParseResult<readonly [CharacterEncoding, number]> | null
  >(null);

  useEffect(() => {
    codecDetectEncoding
      .safeParseAsync(debouncedInput)
      .then(setDecoded);
  }, [debouncedInput]);

  const encoding = useMemo(() => {
    if (!decoded || !decoded.success) return null;
    return decoded.data[0];
  }, [decoded]);
  
  const codePoint = useMemo(() => {
    if (!decoded ||!decoded.success) return null;
    return decoded.data[1];
  }, [decoded]);
  
  return (
    <Stack mx="auto" px={2} my={4} gap={4} maxWidth="60ch">
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Input"
          variant="outlined"
          value={input}
          onChange={(e) => {
            setInput(e.currentTarget.value);
          }}
          helperText={
            encoding ?
              `Interpreted as ${getCodecName(encoding)}` :
              <>&zwj;</>
          }
          slotProps={{
            htmlInput: {
              list: input.charAt(0) === '&' ? listId : undefined,
            },
            input: {
              endAdornment: decoded?.success ? null : (
                <InputAdornment position="end">
                  <Warning />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      
      <Stack gap={1}>
        {encodings.map((encoding) => (
          <TextFieldCharacterEncodingOutput
            key={encoding}
            encoding={encoding}
            codePoint={codePoint}
            setCodePoint={(newCodePoint) => {
              setDecoded({
                success: true,
                data: [encoding, newCodePoint],
              });
            }}
          />
        ))}
      </Stack>

      <datalist id={listId}>
        {entityNames.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
    </Stack>
  );
};
