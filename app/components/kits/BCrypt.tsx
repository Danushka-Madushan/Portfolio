'use client'

import { firaCode, jetBransMono } from '@/app/fonts/fonts'
import { BCrypter } from '@/app/kit-engines/BCrypter'
import { copyToClipboard } from '@/app/utils/clip'
import { Button, Chip, Input, Textarea, useDisclosure } from '@heroui/react'
import { ArrowLeftRight, ArrowRightLeft, Braces, CodeXml, Copy } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CodeBlock from '../CodeBlock'
import {
  CSHARP_CODE_SNIPPET,
  GO_CODE_SNIPPET,
  JAVA_CODE_SNIPPET,
  JS_CODE_SNIPPET_SERVER,
  JS_CODE_SNIPPET_WEB,
  PYTHON_CODE_SNIPPET,
  TS_CODE_SNIPPET_SERVER,
  TS_CODE_SNIPPET_WEB
} from '@/app/snippets/bcrypt'

const BCrypt = () => {
  const [method, setMethod] = useState<'Hash' | 'Compare'>('Hash')
  const [txtBox1val, setTxtBox1val] = useState('')
  const [txtBox2val, setTxtBox2val] = useState('')
  const [salt, setSalt] = useState(10)
  const [isMatching, setIsMatching] = useState<boolean | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onAction = useCallback(async () => {
    if (!txtBox1val || txtBox1val.length === 0) {
      setTxtBox2val('')
      return;
    };
    if (salt > 15) {
      setSalt(15)
    }

    /** 
     * if amount of salt rounds are larger than 15,
     * the application starts to freez.
    */
    const effectiveSalt = salt > 15 ? 15 : salt;

    switch (method) {
      case 'Hash': {
        const hashed = await BCrypter.hash(txtBox1val, effectiveSalt)
        setTxtBox2val(hashed);
        break;
      }
      case 'Compare': {
        const result = await BCrypter.compare(txtBox1val, txtBox2val)
        setIsMatching(result)
        break;
      }
    }

  }, [method, txtBox1val, txtBox2val, salt])

  const handleCopy = async (content: string) => {
    const success = await copyToClipboard(content)
    if (success) {
      toast.success('Copied!')
    }
  }

  useEffect(() => {
    setIsMatching(null)
  }, [method])

  return (
    <div className='px-4 pb-2 pt-4 w-full flex items-center justify-center flex-col gap-y-2'>
      <div className='w-full flex flex-col items-center gap-y-2 justify-center'>
        <div className="relative w-full">
          <div className='absolute -top-4 right-0'>
            <Button
              className={`${jetBransMono.className} bg-blue-800 font-light text-white text-xs z-10`}
              variant='flat'
              size='sm'
              color='primary'
              startContent={method === 'Hash' ? <ArrowLeftRight size={14} strokeWidth={2} /> : <ArrowRightLeft size={14} strokeWidth={2} />}
              onPress={() => {
                switch (method) {
                  case 'Hash': {
                    setMethod('Compare');
                    break;
                  }
                  case 'Compare': {
                    setMethod('Hash')
                    break;
                  }
                }
              }}
            >{method}</Button>
          </div>
          <div className='relative flex items-center justify-start gap-x-2 pb-2'>
            <h1 className={`${firaCode.className} font-light text-sm`}>
              # Text
            </h1>
            {
              method === 'Compare' ? (
                isMatching !== null ? (
                  <Chip
                    size='sm'
                    color={isMatching ? 'success' : 'danger'}
                    className={`${jetBransMono.className} absolute`}
                    radius='sm'>{isMatching ? 'Matching' : 'Mismatch'}</Chip>
                ) : null
              ) : null
            }
          </div>
          <Textarea
            value={txtBox1val}
            placeholder='Text to encrypt...'
            onValueChange={setTxtBox1val}
            variant='faded'
            classNames={{
              input: `${firaCode.className} overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [overflow:overlay] [&::-webkit-scrollbar]:hidden font-light`
            }}
            maxRows={5}
            minRows={5}
            radius='sm'
          />
        </div>
        <div className="relative w-full">
          <div className='relative flex items-center justify-start gap-x-2 pb-2'>
            <h1 className={`${firaCode.className} font-light text-sm`}>
              # Bcrypt
            </h1>
            {
              method === 'Compare' ? (
                isMatching !== null ? (
                  <Chip
                    size='sm'
                    color={isMatching ? 'success' : 'danger'}
                    className={`${jetBransMono.className} absolute`}
                    radius='sm'>{isMatching ? 'Matching' : 'Mismatch'}</Chip>
                ) : null
              ) : null
            }
          </div>
          <Input
            value={txtBox2val}
            variant='faded'
            classNames={{
              input: `${firaCode.className} overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [overflow:overlay] [&::-webkit-scrollbar]:hidden font-light`
            }}
            type='text'
            radius='sm'
            placeholder={method === 'Compare' ? 'Bcrypt Hash...' : ''}
            readOnly={method === 'Hash'}
            onValueChange={setTxtBox2val}
          />
          <Button
            onPress={() => handleCopy(txtBox2val)}
            className='absolute right-1 bottom-1'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label="Copy public key"
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className='w-full flex items-center justify-between pt-1 flex-row'>
        <div className='flex flex-row gap-x-4 items-center justify-center'>
          <Button
            onPress={onAction}
            radius='sm'
            variant='solid'
            color='primary'
            className={`${jetBransMono.className} font-extralight bg-blue-800 text-sm`}
          >
            {method}
          </Button>
          <div className='flex items-center justify-center gap-x-2'>
            <span
              className={`${jetBransMono.className} font-extralight text-xs`}
            >Salt Rounds -&gt;</span>
            <input
              disabled={method === 'Compare'}
              className={`px-2 py-1.5 w-18 text-center focus:outline-0 border-2 border-default-400 rounded-lg text-base ${firaCode.className} font-light`}
              value={salt}
              onChange={e => setSalt(Number(e.target.value))}
              type='number'
              onKeyDown={e => {
                if (['.', '-', 'e', '+'].includes(e.key)) e.preventDefault()
              }}
              onInput={e => {
                const target = e.target as HTMLInputElement
                target.value = target.value.replace(/[^0-9]/g, '')
                if (Number(target.value) < 0) target.value = '0'
              }}
            />
          </div>
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <Button
            variant='bordered'
            className={`${firaCode.className} text-xs font-light uppercase`}
            startContent={<CodeXml strokeWidth={1.5} size={18} />}
            onPress={onOpen}
          >
            Code Snippets
          </Button>
          <Button
            isIconOnly
            size='sm'
            variant='bordered'
            aria-label='View source code on GitHub'
          >
            <Braces size={16} strokeWidth={1.5} />
          </Button>
        </div>
        <CodeBlock
          DefaultSelection='ts'
          snippetTitle='BCrypt Hashing'
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          TsCodeStringServer={TS_CODE_SNIPPET_SERVER}
          JsCodeStringServer={JS_CODE_SNIPPET_SERVER}
          TsCodeStringWeb={TS_CODE_SNIPPET_WEB}
          JsCodeStringWeb={JS_CODE_SNIPPET_WEB}
          PyCodeString={PYTHON_CODE_SNIPPET}
          CSCodeString={CSHARP_CODE_SNIPPET}
          GoCodeString={GO_CODE_SNIPPET}
          JavaCodeString={JAVA_CODE_SNIPPET}
        />
      </div>
    </div>
  )
}

export default BCrypt
