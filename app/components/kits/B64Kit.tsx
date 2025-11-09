'use client'

import { Button, useDisclosure, Checkbox, Textarea } from '@heroui/react';
import CodeBlock from '../CodeBlock';
import { firaCode } from '../../fonts/fonts';
import { ArrowRightLeft, Braces, CodeXml, Copy } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  CSHARP_CODE_SNIPPET,
  GO_CODE_SNIPPET,
  JAVA_CODE_SNIPPET,
  JS_CODE_SNIPPET_SERVER,
  JS_CODE_SNIPPET_WEB,
  PYTHON_CODE_SNIPPET,
  TS_CODE_SNIPPET_SERVER,
  TS_CODE_SNIPPET_WEB
} from '@/app/snippets/base64';
import { B64 } from '@/app/kit-engines/B64';
import toast from 'react-hot-toast';
import { copyToClipboard } from '@/app/utils/clip';

const B64Kit = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [plainText, setPlainText] = useState('');
  const [b64Text, setB64Text] = useState('');

  /* Memoized styles to avoid recreating strings on each render */
  const headerClassName = useMemo(() => `${firaCode.className} font-light text-sm`, []);
  const textareaInputClasses = useMemo(() => ({ input: `${firaCode.className} font-light` }), []);
  const switchLabelClassName = useMemo(() => `${firaCode.className} font-light text-sm pt-1 pb-2`, []);
  const buttonClassName = useMemo(() => `${firaCode.className} text-xs font-light uppercase`, []);

  const handleCopy = useCallback(async (content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      toast.success("Copied!");
    }
  }, []);

  const handleUrlSafeToggle = useCallback((value: boolean) => {
    setIsUrlSafe(value);
    
    if (!b64Text) return;

    /* Convert existing base64 text based on new URL-safe state */
    setB64Text(value ? B64.base64ToUrlSafe(b64Text) : B64.urlSafeToBase64(b64Text));
  }, [b64Text]);

  const handleTextChange = useCallback((content: string, side: 'plain' | 'b64') => {
    if (side === 'plain') {
      setPlainText(content);
      const encoded = B64.base64Encode(content);
      setB64Text(isUrlSafe ? B64.base64ToUrlSafe(encoded) : encoded);
    } else {
      setB64Text(content);
      const normalB64 = isUrlSafe ? B64.urlSafeToBase64(content) : content;
      setPlainText(B64.base64Decode(normalB64));
    }
  }, [isUrlSafe]);

  const handleGithubOpen = useCallback(() => {
    window.open(
      "https://github.com/Danushka-Madushan/Portfolio/tree/main/app/kit-engines/B64.ts",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const urlSafeLabel = useMemo(() => isUrlSafe ? '(URL-SAFE)' : null, [isUrlSafe]);

  return (
    <div className='w-full p-4'>
      <div className='flex flex-col gap-y-2 w-full h-full mb-3'>
        {/* Plain Text Input */}
        <div className='relative'>
          <div className='flex items-center justify-between pt-1 pb-2'>
            <h1 className={headerClassName}># Plain Text</h1>
            <div className={`flex items-center gap-x-4 text-sm justify-center ${firaCode.className}`}>
              <span>TXT</span>
              <ArrowRightLeft size={18} strokeWidth={1.5} />
              <span>B64 {urlSafeLabel}</span>
            </div>
          </div>
          <Textarea
            placeholder='type in plain text...'
            value={plainText}
            onValueChange={(content) => handleTextChange(content, 'plain')}
            variant='faded'
            classNames={textareaInputClasses}
            className='relative'
            radius='sm'
            minRows={8}
            maxRows={8}
          />
          <Button
            onPress={() => handleCopy(plainText)}
            className='absolute right-2 bottom-2'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label='Copy plain text'
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>

        {/* Base64 Input */}
        <div className='relative'>
          <h1 className={switchLabelClassName}># Base64 Text {urlSafeLabel}</h1>
          <Textarea
            placeholder='type in base64...'
            value={b64Text}
            onValueChange={(content) => handleTextChange(content, 'b64')}
            variant='faded'
            classNames={textareaInputClasses}
            radius='sm'
            minRows={8}
            maxRows={8}
          />
          <Button
            onPress={() => handleCopy(b64Text)}
            className='absolute right-2 bottom-2'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label='Copy base64 text'
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-x-4'>
          <Checkbox
            disableAnimation
            size='sm'
            onValueChange={handleUrlSafeToggle}
            isSelected={isUrlSafe}
            className={headerClassName}
          >
            URL-safe Base64
          </Checkbox>
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <Button
            variant='bordered'
            startContent={<CodeXml strokeWidth={1.5} size={18} />}
            className={buttonClassName}
            onPress={onOpen}
          >
            Code Snippets
          </Button>
          <Button
            onPress={handleGithubOpen}
            isIconOnly
            size='sm'
            variant='bordered'
            aria-label='View source code on GitHub'
          >
            <Braces size={16} strokeWidth={1.5} />
          </Button>
        </div>
        <CodeBlock
          JsCodeStringServer={JS_CODE_SNIPPET_SERVER}
          TsCodeStringServer={TS_CODE_SNIPPET_SERVER}
          JsCodeStringWeb={JS_CODE_SNIPPET_WEB}
          TsCodeStringWeb={TS_CODE_SNIPPET_WEB}
          CSCodeString={CSHARP_CODE_SNIPPET}
          JavaCodeString={JAVA_CODE_SNIPPET}
          PyCodeString={PYTHON_CODE_SNIPPET}
          GoCodeString={GO_CODE_SNIPPET}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
};

export default B64Kit;
