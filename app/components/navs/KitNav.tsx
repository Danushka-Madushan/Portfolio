'use client'

import { Accordion, AccordionItem } from '@heroui/accordion'
import KitSelector from './KitSelector'
import { iKitServices } from '@dmtools'
import { useEffect, useState } from 'react'
import { StreamlineUltimateCryptoEncryptionKey } from '../icons/StreamlineUltimateCryptoEncryptionKey'
import { firaCode, rajdhani } from '@/app/fonts/fonts'
import { TablerNumber64Small } from '../icons/TablerNumber64Small'
import { MaterialSymbolsFingerprintOutlineSharp } from '../icons/MaterialSymbolsFingerprintOutlineSharp'
import { MdiCertificate } from '../icons/MdiCertificate'
import { LucideBinary } from '../icons/LucideBinary'
import { MageSecurityShield } from '../icons/MageSecurityShield'
import { GgPassword } from '../icons/GgPassword'
import { MynauiHashWaves } from '../icons/MynauiHashWaves'
import { IcRoundPassword } from '../icons/IcRoundPassword'
import { StreamlinePlumpPadlockKey } from '../icons/StreamlinePlumpPadlockKey'
import { LogosJwtIcon } from '../icons/LogosJwtIcon'
import { CarbonUrl } from '../icons/CarbonUrl'
import { TablerSortAscendingNumbers } from '../icons/TablerSortAscendingNumbers'
import { UilImageUpload } from '../icons/UilImageUpload'
import { SolarCloudUploadLinear } from '../icons/SolarCloudUploadLinear'
import { IconoirCloudBookmark } from '../icons/IconoirCloudBookmark'
import { useRouter, usePathname } from 'next/navigation'
import { MdiCloudKeyOutline } from '../icons/MdiCloudKeyOutline'
import { PhPassword } from '../icons/PhPassword'

const KitNav = () => {
  const [selected, setSelected] = useState<string | number>('')
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegment = pathname.split('/kits/')[1] || '';
    setSelected(pathSegment);
  }, [pathname])

  const cryptoServices: iKitServices = {
    selected,
    setSelected,
    services: [
      {
        key: 'password-generator',
        name: 'Password Generator',
        IconSVG: PhPassword
      },
      {
        key: 'ssh-keygen',
        name: 'SSH Keygen',
        IconSVG: MdiCloudKeyOutline
      },
      {
        key: 'base64-toolkit',
        name: 'Base64 Encode/Decode',
        IconSVG: TablerNumber64Small
      },
      {
        key: 'uuid-toolkit',
        name: 'UUID Tools',
        IconSVG: MaterialSymbolsFingerprintOutlineSharp
      },
      {
        key: 'rsa-toolkit',
        name: 'RSA Tools',
        IconSVG: MdiCertificate
      },
      {
        key: 'text-encode-decode',
        name: 'TXT Encode/Decode',
        IconSVG: LucideBinary
      },
      {
        key: 'text-encrypt-decrypt',
        name: 'TXT Encrypt/Decrypt',
        IconSVG: MageSecurityShield
      },
      {
        key: 'hmac-toolkit',
        name: 'HMAC Generator',
        IconSVG: GgPassword
      },
      {
        key: 'text-hash',
        name: 'Text Hasher',
        IconSVG: MynauiHashWaves
      },
      {
        key: 'token-toolkit',
        name: 'Token Generator',
        IconSVG: IcRoundPassword
      },
      {
        key: 'bcrypt',
        name: 'Bcrypt',
        IconSVG: StreamlinePlumpPadlockKey
      },
      {
        key: 'jwt-encode-decode',
        name: 'JWT Encode/Decode',
        IconSVG: LogosJwtIcon
      },
      {
        key: 'url-encode-decode',
        name: 'URL Encode/Decode',
        IconSVG: CarbonUrl
      },
      {
        key: 'ulid-toolkit',
        name: 'ULID Generator',
        IconSVG: TablerSortAscendingNumbers
      }
    ]
  }

  const cloudServices: iKitServices = {
    selected,
    setSelected,
    services: [
      {
        key: 'gitbucket',
        name: 'GitBucket',
        IconSVG: SolarCloudUploadLinear
      },
      {
        key: 'imgbb',
        name: 'ImgBB',
        IconSVG: UilImageUpload
      }
    ]
  }

  const dotenvservices: iKitServices = {
    selected,
    setSelected,
    services: [
      {
        key: 'dot-env-to-json',
        name: '.ENV to JSON',
        IconSVG: SolarCloudUploadLinear
      },
      {
        key: 'dot-env-to-toml',
        name: '.ENV to TOML',
        IconSVG: UilImageUpload
      },
      {
        key: 'dot-env-to-xml',
        name: '.ENV to XML',
        IconSVG: UilImageUpload
      }
    ]
  }

  return (
    <div className='z-10 w-[310px] px-2 bg-[#02060c] border fixed border-gray-100/20 h-screen'>
      <div className='px-5 py-4 cursor-pointer' onClick={() => {
        setSelected('');
        router.push('/kits');
      }}>
        <div>
          <h1 className={`text-center ${rajdhani.className} text-4xl font-light`}>dmTools</h1>
          <h1 className={`text-center ${rajdhani.className} text-xs font-light`}>kit-v1.0</h1>
        </div>
      </div>
      <div className='max-h-[calc(100vh-120px)] overflow-y-auto kitnav-scroll'>
        <Accordion
          selectionMode="multiple"
          defaultExpandedKeys={["1", "2"]}
          variant='light'
        >
          <AccordionItem
            key="1"
            aria-label="crypto"
            title="Cryptography"
            classNames={{
              content: 'w-full flex justify-center p-2',
              trigger: `px-2 ${firaCode.className} cursor-pointer`,
              title: 'text-sm'
            }}
            startContent={
              <StreamlineUltimateCryptoEncryptionKey fontSize={16} />
            }>
            <KitSelector
              services={cryptoServices.services}
              selected={cryptoServices.selected}
              setSelected={cryptoServices.setSelected}
            />
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="cloud"
            title="Cloud"
            classNames={{
              content: 'w-full flex justify-center p-2',
              trigger: `px-2 ${firaCode.className} cursor-pointer`,
              title: 'text-sm'
            }}
            startContent={
              <IconoirCloudBookmark fontSize={16} />
            }>
            <KitSelector
              services={cloudServices.services}
              selected={cloudServices.selected}
              setSelected={cloudServices.setSelected}
            />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default KitNav
