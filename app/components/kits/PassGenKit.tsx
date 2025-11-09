'use client'

import { firaCode } from '@/app/fonts/fonts'
import { PassGen, PasswordOptions } from '@/app/kit-engines/PassGen'
import { copyToClipboard } from '@/app/utils/clip'
import { Button } from '@heroui/button'
import { Checkbox } from '@heroui/checkbox'
import { Braces, Check, Copy, RefreshCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const PassGenKit = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    useLower: true,
    useUpper: true,
    useNumbers: true,
    useSpecial: true,
    avoidAmbiguous: false,
    prefix: '',
    suffix: '',
    wordToContain: ''
  })
  const [password, setPassword] = useState('')

  /* Memoize password analysis to avoid recalculation */
  const passwordAnalysis = useMemo(
    () => PassGen.analyzePasswordStrength(password),
    [password]
  )

  /* Handle copy with useCallback to prevent recreation */
  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(password)
    if (success) {
      setIsCopied(true)
      toast.success('Copied!')
      setTimeout(() => setIsCopied(false), 1500)
    }
  }, [password])

  /* Generate new password */
  const generateNewPassword = useCallback(() => {
    setPassword(PassGen.generatePassword(options))
  }, [options])

  /* Update option helper */
  const updateOption = useCallback(
    <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
      setOptions(prev => ({ ...prev, [key]: value }))
    },
    []
  )

  /* Handle length adjustment for prefix/suffix/word */
  const adjustLength = useCallback(
    (newLength: number) => {
      if (options.length < newLength) {
        setOptions(prev => ({ ...prev, length: newLength }))
      }
    },
    [options.length]
  )

  /* Sanitize input (remove spaces) */
  const sanitizeInput = useCallback((value: string) => value.replace(/\s/g, ''), [])

  /* Generate password when options change */
  useEffect(() => {
    setPassword(PassGen.generatePassword(options))
  }, [options])

  /* Checkbox configuration */
  const checkboxes = useMemo(
    () => [
      { label: 'Lowercase [a-z]', key: 'useLower', value: options.useLower },
      { label: 'Uppercase [A-Z]', key: 'useUpper', value: options.useUpper },
      { label: 'Avoid Ambiguous', key: 'avoidAmbiguous', value: options.avoidAmbiguous },
      { label: 'Specials [#^$]', key: 'useSpecial', value: options.useSpecial },
      { label: 'Numbers [0-9]', key: 'useNumbers', value: options.useNumbers }
    ],
    [options]
  )

  /* Input fields configuration */
  const inputFields = useMemo(
    () => [
      { placeholder: 'Prefix', key: 'prefix', value: options.prefix },
      { placeholder: 'Suffix', key: 'suffix', value: options.suffix },
      { placeholder: 'Word to Contain', key: 'wordToContain', value: options.wordToContain }
    ],
    [options.prefix, options.suffix, options.wordToContain]
  )

  return (
    <div className='relative p-4 flex flex-col gap-y-8 items-center justify-center w-full h-full'>
      <div className='flex w-[95%] items-start gap-y-2 justify-between'>
        {/* Checkboxes Section */}
        <div className={`${firaCode.className} font-light w-[80%]`}>
          <h1 className='pb-2 text-gray-400 text-sm'>Combination Options</h1>
          <div className='flex flex-row items-start gap-y-2 justify-between pr-8'>
            {/* Split checkboxes into two columns */}
            {[0, 1].map(colIndex => (
              <div key={colIndex} className='flex justify-center flex-col gap-y-3'>
                {checkboxes
                  .slice(colIndex === 0 ? 0 : 3, colIndex === 0 ? 3 : 5)
                  .map(({ label, key, value }) => (
                    <Checkbox
                      key={key}
                      value={key}
                      disableAnimation
                      isSelected={value}
                      onValueChange={checked => updateOption(key as keyof PasswordOptions, checked)}
                    >
                      {label}
                    </Checkbox>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Input Fields Section */}
        <div className='flex flex-col gap-y-2 pl-4 pt-1 w-fit'>
          {inputFields.map(({ placeholder, key, value }) => (
            <div key={key} className='w-48 relative'>
              <input
                className={`px-2 py-3 w-full focus:outline-0 border-2 border-gray-600 rounded-md text-sm ${firaCode.className} font-light`}
                placeholder={placeholder}
                value={value}
                onChange={e => updateOption(key as keyof PasswordOptions, sanitizeInput(e.target.value))}
              />
              <Button
                className='absolute right-2 top-2'
                size='sm'
                variant='flat'
                isIconOnly
                onPress={() => adjustLength(value.length)}
              >
                <Check size={12} strokeWidth={2} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Password Display */}
      <input
        readOnly
        onClick={handleCopy}
        type='text'
        value={password}
        className={`${firaCode.className} text-2xl font-light focus:outline-0 w-[80%] py-2 text-center caret-transparent border-b-2 border-b-default-400 cursor-pointer`}
      />

      {/* Controls */}
      <div className='flex items-center justify-center gap-x-2'>
        <input
          className={`px-2 py-1.5 w-18 text-center focus:outline-0 border-2 border-default-400 rounded-lg text-base ${firaCode.className} font-light`}
          value={options.length}
          onChange={e => updateOption('length', Number(e.target.value))}
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
        <Button onPress={generateNewPassword} size='md' isIconOnly variant='bordered'>
          <RefreshCcw size={18} strokeWidth={1.5} />
        </Button>
        <Button onPress={handleCopy} size='md' isIconOnly variant='bordered'>
          {isCopied ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}
        </Button>
      </div>

      {/* Password Strength */}
      <div className='flex flex-col items-center justify-center gap-y-4 pb-2'>
        <h1 className={`${firaCode.className} font-light text-xl`}>
          {passwordAnalysis.strength}
        </h1>
        <h1 className={`${firaCode.className} font-light text-sm`}>
          Time2BruteForce -&gt; {passwordAnalysis.timetocrack}
        </h1>
      </div>

      {/* GitHub Link */}
      <Button
        onPress={() => {
          window.open(
            'https://github.com/Danushka-Madushan/Portfolio/tree/main/app/kit-engines/PassGen.ts',
            '_blank',
            'noopener,noreferrer'
          )
        }}
        className='absolute bottom-3 right-3'
        isIconOnly
        size='sm'
        variant='bordered'
      >
        <Braces size={16} strokeWidth={1.5} />
      </Button>
    </div>
  )
}

export default PassGenKit
