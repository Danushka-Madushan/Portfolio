'use client'

import { firaCode, jetBransMono } from '@/app/fonts/fonts'
import { generateECDSAKeys, generateEd25519Keys, generateRSAKeys } from '@/app/kit-engines/server.actions/SSHKeygen';
import { copyToClipboard } from '@/app/utils/clip';
import { Button, Input, Textarea, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { Braces, Copy, FileArchive } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ECDSACurve, KeyFileData, PrivateKeyFormat, RSAKeySize } from 'dmtools@ssh-keygen';
import { prepareKeyFilesForDownload } from '@/app/utils/ssh.utils';
import toast from 'react-hot-toast';
import JSZip from 'jszip';

const DLKeysASZip = async (
  fileData: KeyFileData,
  zipFilename: string
): Promise<void> => {
  const zip = new JSZip();

  /* Add both files to the ZIP */
  zip.file(fileData.privateKeyFilename, fileData.privateKeyContent);
  zip.file(fileData.publicKeyFilename, fileData.publicKeyContent);

  /* Add a README with fingerprint */
  const readme = `SSH Key Pair Generated
  
Private Key : ${fileData.privateKeyFilename}
Public Key  : ${fileData.publicKeyFilename}
Fingerprint : ${fileData.fingerprint}

IMPORTANT: Keep your private key secure and never share it!
`;
  zip.file('README.txt', readme);

  /* Generate ZIP and download */
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

type Algorithm = "Ed25519" | "RSA" | "ECDSA"

interface KeyPair {
  privateKey: string;
  publicKey: string;
  signature: string;
}

const DEFAULT_COMMENT = 'dmtools@ssh-keygen';

const SSHKit = () => {
  const [keyPair, setKeyPair] = useState<KeyPair>({
    privateKey: '',
    publicKey: '',
    signature: ''
  });
  const [comment, setComment] = useState(DEFAULT_COMMENT);
  const [passphrase, setPassphrase] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>('Ed25519');
  const [selectedBitLength, setSelectedBitLength] = useState<RSAKeySize>(4096);
  const [selectedECDSACurve, setSelectedECDSACurve] = useState<ECDSACurve>('nistp256');
  const [command, setCommand] = useState('ssh-keygen -t ed25519 -C "dmtools@ssh-keygen"')
  const [isLoading, setIsLoading] = useState(false)

  const saveKeysLocally = useCallback(async (format: string | number) => {
    const rawFileData = prepareKeyFilesForDownload({
      fingerprint: keyPair.signature,
      private_key: keyPair.privateKey,
      public_key: keyPair.publicKey,
    }, {
      format: (format as PrivateKeyFormat),
      passphrase
    })
    await DLKeysASZip(rawFileData, `ssh-keys-${format}.zip`)
  }, [keyPair, passphrase])

  const handleCopy = useCallback(async (content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      toast.success("Copied!");
    }
  }, []);

  const generateKeys = useCallback(async () => {
    const effectiveComment = comment.trim() || DEFAULT_COMMENT;

    /* SetLoading */
    setIsLoading(true)

    try {
      let result;

      switch (selectedAlgo) {
        case 'Ed25519': {
          result = await generateEd25519Keys({ comment: effectiveComment, passphrase });
          break;
        }
        case 'RSA': {
          result = await generateRSAKeys({
            bitLength: selectedBitLength,
            comment: effectiveComment,
            passphrase
          });
          break;
        }
        case 'ECDSA': {
          result = await generateECDSAKeys({
            curve: selectedECDSACurve,
            comment: effectiveComment,
            passphrase
          });
          break;
        }
      }

      setKeyPair({
        privateKey: result.private_key,
        publicKey: result.public_key,
        signature: result.fingerprint
      });
    } catch (error) {
      toast.error("Failed to generate keys");
      console.error(error);
    } finally {
      /* SetLoading */
      setIsLoading(false);
    }
  }, [selectedAlgo, selectedBitLength, selectedECDSACurve, comment, passphrase]);

  useEffect(() => {
    const effectiveComment = comment.trim() || DEFAULT_COMMENT;

    const base = `ssh-keygen -t ${selectedAlgo.toLowerCase()}`
    const comment_ = `-C "${effectiveComment}"`
    let bits;
    let passphrase_ = '';
    if (passphrase.length !== 0) {
      passphrase_ = `-N "${passphrase}"`
    }
    switch (selectedAlgo) {
      case 'RSA': {
        bits = `-b ${selectedBitLength} `
        break;
      }
      case 'ECDSA': {
        const rawDigits = selectedECDSACurve.replace(/\D/g, '');
        const bitCurve = Number(rawDigits);
        bits = `-b ${bitCurve} `
        break;
      }
      default: {
        bits = '';
        break;
      }
    }

    const final = `${base} ${bits}${comment_} ${passphrase_}`
    setCommand(final)
  }, [comment, passphrase, selectedAlgo, selectedBitLength, selectedECDSACurve])

  useEffect(() => {
    generateKeys();
    /* eslint-disable-next-line */
  }, []);

  const algoButtons = [
    { value: 'Ed25519' as Algorithm, label: 'Ed25519' },
    { value: 'RSA' as Algorithm, label: 'RSA' },
    { value: 'ECDSA' as Algorithm, label: 'ECDSA' }
  ];

  const bitLengthButtons = [
    { value: 4096 as RSAKeySize, label: '4096' },
    { value: 3072 as RSAKeySize, label: '3072' },
    { value: 2048 as RSAKeySize, label: '2048' }
  ];

  const curveButtons = [
    { value: 'nistp256' as ECDSACurve, label: 'nistp256' },
    { value: 'nistp384' as ECDSACurve, label: 'nistp384' },
    { value: 'nistp521' as ECDSACurve, label: 'nistp521' }
  ];

  return (
    <div className='w-full flex flex-row items-start justify-center p-4'>
      <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
        {/* Public Key Section */}
        <div className='relative w-[650px]'>
          <h1 className={`${firaCode.className} font-light pb-1 text-sm`}>
            # Public Key -&gt; {keyPair.signature}
          </h1>
          <Textarea
            value={keyPair.publicKey}
            variant='faded'
            classNames={{
              input: `${firaCode.className} overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [overflow:overlay] [&::-webkit-scrollbar]:hidden font-light`
            }}
            maxRows={7}
            radius='sm'
            readOnly
          />
          <Button
            onPress={() => handleCopy(keyPair.publicKey)}
            className='absolute right-2 bottom-2'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label="Copy public key"
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>

        {/* Private Key Section */}
        <div className='relative w-[650px]'>
          <h1 className={`${firaCode.className} font-light pb-1 text-sm`}># Private Key</h1>
          <Textarea
            value={keyPair.privateKey}
            variant='faded'
            classNames={{
              input: `${firaCode.className} overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [overflow:overlay] [&::-webkit-scrollbar]:hidden font-light`
            }}
            maxRows={10}
            radius='sm'
            readOnly
          />
          <Button
            onPress={() => handleCopy(keyPair.privateKey)}
            className='absolute right-2 bottom-2'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label="Copy private key"
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>

        {/* CLI Command */}
        <div className='relative w-[650px]'>
          <h1 className={`${firaCode.className} font-light pb-1 text-sm`}># keygen-command</h1>
          <Textarea
            value={command}
            variant='faded'
            classNames={{
              input: `${firaCode.className} overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [overflow:overlay] [&::-webkit-scrollbar]:hidden font-light`
            }}
            maxRows={1}
            radius='sm'
            readOnly
          />
          <Button
            onPress={() => handleCopy(command)}
            className='absolute right-2 bottom-1'
            color='default'
            variant='solid'
            size='sm'
            isIconOnly
            aria-label="Copy private key"
          >
            <Copy size={12} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Controls Section */}
      <div className='flex flex-col items-start justify-center gap-y-2 w-fit ml-3'>
        {/* Algorithm Selection */}
        <div className='flex flex-col gap-y-2 items-start justify-center'>
          <h1 className={`${jetBransMono.className} font-extralight text-sm text-gray-400`}>
            Algorithm
          </h1>
          <div className='flex flex-row gap-x-2 items-center justify-center'>
            {algoButtons.map(({ value, label }) => (
              <Button
                key={value}
                disableAnimation
                radius='sm'
                variant={selectedAlgo === value ? 'flat' : 'bordered'}
                color={selectedAlgo === value ? 'primary' : 'default'}
                onPress={() => setSelectedAlgo(value)}
                className={`${jetBransMono.className} font-extralight text-sm`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* RSA Bit-Length Selection */}
        <div className='flex flex-col gap-y-2 items-start justify-center'>
          <h1 className={`${jetBransMono.className} font-extralight text-sm text-gray-400`}>
            RSA Bit-Length
          </h1>
          <div className='flex flex-row gap-x-2 items-center justify-center'>
            {bitLengthButtons.map(({ value, label }) => (
              <Button
                key={value}
                isDisabled={selectedAlgo !== 'RSA'}
                size='sm'
                variant={selectedBitLength === value ? 'flat' : 'bordered'}
                color={selectedBitLength === value ? 'primary' : 'default'}
                onPress={() => setSelectedBitLength(value)}
                className={`${jetBransMono.className} font-extralight text-sm`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* ECDSA Curves Selection */}
        <div className='flex flex-col gap-y-2 items-start justify-center'>
          <h1 className={`${jetBransMono.className} font-extralight text-sm text-gray-400`}>
            ECDSA Curves
          </h1>
          <div className='flex flex-row gap-x-2 items-center justify-center'>
            {curveButtons.map(({ value, label }) => (
              <Button
                key={value}
                isDisabled={selectedAlgo !== 'ECDSA'}
                size='sm'
                variant={selectedECDSACurve === value ? 'flat' : 'bordered'}
                color={selectedECDSACurve === value ? 'primary' : 'default'}
                onPress={() => setSelectedECDSACurve(value)}
                className={`${jetBransMono.className} font-extralight text-sm`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className='flex flex-col gap-y-2 items-start justify-center w-full'>
          <h1 className={`${jetBransMono.className} font-extralight text-sm text-gray-400`}>
            Configuration
          </h1>
          <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
            <Input
              radius='sm'
              variant='bordered'
              placeholder='Comment'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className={`${jetBransMono.className} font-extralight text-sm`}
            />
            <Input
              radius='sm'
              variant='bordered'
              type='text'
              placeholder='Passphrase'
              onChange={(e) => setPassphrase(e.target.value)}
              value={passphrase}
              className={`${jetBransMono.className} font-extralight text-sm`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-center gap-x-2'>
          <Button
            isDisabled={isLoading}
            radius='sm'
            variant='solid'
            color='primary'
            onPress={generateKeys}
            className={`${jetBransMono.className} font-extralight bg-blue-800 text-sm`}
          >
            Refresh Key-Pair
          </Button>
          <Dropdown
            className={`${jetBransMono.className}`}
            classNames={{
              content: 'min-w-fit'
            }}
          >
            <DropdownTrigger>
              <Button
                isDisabled={isLoading}
                radius='sm'
                variant='solid'
                color='primary'
                className={`${jetBransMono.className} font-extralight bg-blue-800 text-sm`}
                endContent={<FileArchive size={16} strokeWidth={1.5} />}
              >
                Zip
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="save-options"
              variant='bordered'
              onAction={saveKeysLocally}
              classNames={{
                base: 'w-32'
              }}
            >
              <DropdownItem
                key="openssh"
                endContent={<FileArchive size={16} strokeWidth={2} />}
              >OpenSSH</DropdownItem>
              <DropdownItem
                key="pkcs8"
                endContent={<FileArchive size={16} strokeWidth={2} />}
              >PKCS8</DropdownItem>
              <DropdownItem
                key="pkcs1"
                endContent={<FileArchive size={16} strokeWidth={2} />}
              >PKCS1</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            isIconOnly
            size='sm'
            variant='bordered'
            aria-label='View source code on GitHub'
          >
            <Braces size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SSHKit
