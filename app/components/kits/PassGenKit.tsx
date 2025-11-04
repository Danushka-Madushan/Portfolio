'use client'

import { firaCode } from '@/app/fonts/fonts'
import { PassGen, PasswordOptions } from '@/app/kit-engines/PassGen'
import { copyToClipboard } from '@/app/utils/clip'
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/checkbox'
import { Braces, Check, Copy, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const PassGenKit = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    useLower: true,
    useUpper: true,
    useNumbers: true,
    useSpecial: true,
    avoidAmbiguous: false,
    prefix: "",
    suffix: "",
    wordToContain: ""
  })
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecials, setUseSpecials] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [wordToContain, setWordToContain] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const handleCopy = async () => {
    const success = await copyToClipboard(password);
    if (success) {
      setIsCopied(true);
      toast.success("Copied!");
      setTimeout(() => setIsCopied(false), 1500); /* Reset after 1.5 seconds */
    }
  };

  useEffect(() => {
    setOptions({ ...options, prefix, suffix, wordToContain })
    /* eslint-disable-next-line */
  }, [prefix, suffix, wordToContain])

  useEffect(() => {
    setPassword(PassGen.generatePassword(options))
  }, [options])

  return (
    <div className='relative p-4 flex flex-col gap-y-8 items-center justify-center w-full h-full'>
      <div className='flex w-[95%] items-start gap-y-2 justify-between'>
        <div className={`${firaCode.className} font-light w-[80%]`}>
          <h1 className='pb-2 text-gray-400 text-sm'>Combination Options</h1>
          <div className='flex flex-row items-start gap-y-2 justify-between pr-8'>
            <div className='flex justify-center flex-col gap-y-3'>
              <Checkbox
                value="useLower"
                disableAnimation
                isSelected={useLower}
                onValueChange={(value) => {
                  setUseLower(value);
                  setOptions({ ...options, useLower: value })
                }}
              >Lowercase [a-z]</Checkbox>
              <Checkbox
                value="useUpper"
                disableAnimation
                isSelected={useUpper}
                onValueChange={(value) => {
                  setUseUpper(value);
                  setOptions({ ...options, useUpper: value })
                }}
              >Uppercase [A-Z]</Checkbox>
              <Checkbox
                value="avoidAmbiguous"
                disableAnimation
                isSelected={avoidAmbiguous}
                onValueChange={(value) => {
                  setAvoidAmbiguous(value);
                  setOptions({ ...options, avoidAmbiguous: value })
                }}
              >Avoid Ambiguous</Checkbox>
            </div>
            <div className='flex justify-center flex-col gap-y-3'>
              <Checkbox
                value="useSpecial"
                disableAnimation
                isSelected={useSpecials}
                onValueChange={(value) => {
                  setUseSpecials(value);
                  setOptions({ ...options, useSpecial: value })
                }}
              >Specials [#^$]</Checkbox>
              <Checkbox
                value="useNumbers"
                disableAnimation
                isSelected={useNumbers}
                onValueChange={(value) => {
                  setUseNumbers(value);
                  setOptions({ ...options, useNumbers: value })
                }}
              >Numbers [0-9]</Checkbox>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-2 pl-4 pt-1 w-fit'>
          <div className='w-48 relative'>
            <input
              className={`px-2 py-3 w-full focus:outline-0 border-2 border-gray-600 rounded-md text-sm ${firaCode.className} font-light`}
              placeholder='Prefix'
              value={prefix}
              onChange={(e) => setPrefix(e.target.value.split(" ").join())}
            />
            <Button
              className='absolute right-2 top-2'
              size='sm'
              variant='flat'
              isIconOnly
              onPress={() => {
                const len = prefix.length
                if (options.length < len) {
                  setLength(len)
                  setOptions({...options, length: len})
                }
              }}
            ><Check size={12} strokeWidth={2} /></Button>
          </div>
          <div className='w-48 relative'>
            <input
              className={`px-2 py-3 w-full focus:outline-0 border-2 border-gray-600 rounded-md text-sm ${firaCode.className} font-light`}
              placeholder='Suffix'
              value={suffix}
              onChange={(e) => setSuffix(e.target.value.split(" ").join())}
            />
            <Button
              className='absolute right-2 top-2'
              size='sm'
              variant='flat'
              isIconOnly
              onPress={() => {
                const len = suffix.length
                if (options.length < len) {
                  setLength(len)
                  setOptions({...options, length: len})
                }
              }}
            ><Check size={12} strokeWidth={2} /></Button>
          </div>
          <div className='w-48 relative'>
            <input
              className={`px-2 py-3 w-full focus:outline-0 border-2 border-gray-600 rounded-md text-sm ${firaCode.className} font-light`}
              placeholder='Word to Contain'
              value={wordToContain}
              onChange={(e) => setWordToContain(e.target.value.split(" ").join())}
            />
            <Button
              className='absolute right-2 top-2'
              size='sm'
              variant='flat'
              isIconOnly
              onPress={() => {
                const len = wordToContain.length
                if (options.length < len) {
                  setLength(len)
                  setOptions({...options, length: len})
                }
              }}
            ><Check size={12} strokeWidth={2} /></Button>
          </div>
        </div>
      </div>
      <input
        readOnly
        onClick={handleCopy}
        type='text'
        value={password}
        className={`${firaCode.className} text-2xl font-light focus:outline-0 w-[80%] py-2 text-center caret-transparent border-b-2 border-b-default-400`}
      />
      <div className='flex items-center justify-center gap-x-2'>
        <input
          className={`px-2 py-1.5 w-18 text-center focus:outline-0 border-2 border-default-400 rounded-lg text-base ${firaCode.className} font-light`}
          value={length}
          onChange={(e) => {
            setLength(Number(e.target.value));
            setOptions({ ...options, length: Number(e.target.value) })
          }}
          type='number'
          onKeyDown={(e) => {
            if (e.key === '.' || e.key === '-' || e.key === 'e' || e.key === '+') {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
            if (Number(target.value) < 0) {
              target.value = '0';
            }
          }}
        />
        <Button
          onPress={() => setPassword(PassGen.generatePassword(options))}
          size='md'
          isIconOnly
          variant='bordered'
        ><RefreshCcw size={18} strokeWidth={1.5} /></Button>
        <Button
          onPress={handleCopy}
          size='md'
          isIconOnly
          variant='bordered'
        >{isCopied ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}</Button>
      </div>
      <div className='flex flex-col items-center justify-center gap-y-4 pb-2'>
        <h1
          className={`${firaCode.className} font-light text-xl`}
        >{PassGen.analyzePasswordStrength(password).strength}</h1>
        <h1
          className={`${firaCode.className} font-light text-sm`}
        >Time2BruteForce -&gt; {PassGen.analyzePasswordStrength(password).timetocrack}</h1>
      </div>
      <Button
          onPress={() => {
            window.open(
              "https://github.com/Danushka-Madushan/Portfolio/tree/main/app/kit-engines/PassGen.ts",
              "_blank",
              "noopener,noreferrer"
            )
          }}
          className='absolute bottom-3 right-3'
          isIconOnly
          size='sm'
          variant='bordered'
        ><Braces size={16} strokeWidth={1.5}/></Button>
    </div>
  )
}

export default PassGenKit
