'use client'

import { Button, useDisclosure, Checkbox, Textarea } from '@heroui/react';
import CodeBlock from '../CodeBlock';
import { firaCode } from '../../fonts/fonts';
import { ArrowRightLeft, Braces, CodeXml, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [plainText, setPlainText] = useState('')
  const [b64Text, setB64Text] = useState('')

  const handleCopy = async (content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      toast.success("Copied!");
    }
  };

  useEffect(() => {
    if (isUrlSafe) {
      /* convert current b64 to url-safe */
      setB64Text(B64.base64ToUrlSafe(b64Text))
      return;
    }
    /* convert url-safe b64 to normal */
    setB64Text(B64.urlSafeToBase64(b64Text))
    return;
    /* eslint-disable-next-line */
  }, [isUrlSafe])

  const onChange = (content: string, side: 'plain' | 'b64') => {
    switch (side) {
      case 'b64': {
        setB64Text(content)

        /* if URL-SAFE */
        if (isUrlSafe) {
          const b64 = B64.urlSafeToBase64(content)
          setPlainText(B64.base64Decode(b64))
          return;
        }

        setPlainText(B64.base64Decode(content))
        break;
      }

      case 'plain': {
        setPlainText(content)

        /* if URL-SAFE */
        if (isUrlSafe) {
          const b64 = B64.base64Encode(content)
          setB64Text(B64.base64ToUrlSafe(b64))
          return;
        }

        setB64Text(B64.base64Encode(content))
        break;
      }
    }
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-y-2 w-full h-full mb-3'>
        <div className='relative'>
          <div className='flex items-center justify-between pt-1 pb-2'>
            <h1 className={`${firaCode.className} font-light text-sm`}># Plain Text</h1>
            <div className={`flex items-center gap-x-4 text-sm justify-center ${firaCode.className}`}>
              <span>TXT</span>
              <ArrowRightLeft size={18} strokeWidth={1.5} />
              <span>B64 {isUrlSafe ? '(URL-SAFE)' : null}</span>
            </div>
          </div>
          <Textarea
            placeholder='type in plain text...'
            value={plainText}
            onValueChange={(content) => onChange(content, 'plain')}
            variant='faded'
            classNames={{
              input: `${firaCode.className} font-light`
            }}
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
            isIconOnly>
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>
        <div className='relative'>
          <h1 className={`${firaCode.className} font-light text-sm pt-1 pb-2`}># Base64 Text {isUrlSafe ? '(URL-SAFE)' : null}</h1>
          <Textarea
            placeholder='type in base64...'
            value={b64Text}
            onValueChange={(content) => onChange(content, 'b64')}
            variant='faded'
            classNames={{
              input: `${firaCode.className} font-light`
            }}
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
            isIconOnly>
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-x-4'>
          <Checkbox
            disableAnimation
            size='sm'
            onValueChange={setIsUrlSafe}
            isSelected={isUrlSafe}
            className={`${firaCode.className} font-light text-sm`}
          >{`URL-safe Base64`}</Checkbox>
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <Button
          variant='bordered'
          startContent={<CodeXml strokeWidth={1.5} size={18} />}
          className={`${firaCode.className} text-xs font-light uppercase`}
          onPress={onOpen}>Code Snippets</Button>
        <Button
          onPress={() => {
            window.open(
              "https://github.com/Danushka-Madushan/Portfolio/tree/main/app/kit-engines/B64.ts",
              "_blank",
              "noopener,noreferrer"
            )
          }}
          isIconOnly
          size='sm'
          variant='bordered'
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
  )
}

export default B64Kit
