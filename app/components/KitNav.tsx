'use client'

import { Accordion, AccordionItem } from '@heroui/accordion'
import KitSelector from './KitSelector'
import { Hash, UploadCloud } from 'lucide-react'
import { iKitServices } from '@dmtools'
import { useState } from 'react'

const KitNav = () => {
  const [selected, setSelected] = useState<string | number>('')

  const cryptoServices: iKitServices = {
    selected,
    setSelected,
    services: [
      {
        key: 'b64',
        name: 'Base64 Encoder/Decoder',
        IconNode: Hash
      },
      {
        key: 'uuid',
        name: 'UUID Generator',
        IconNode: Hash
      },
      {
        key: 'rsa',
        name: 'RSA Tools',
        IconNode: Hash
      },
      {
        key: 'textenc',
        name: 'Text Encoder/Decoder',
        IconNode: Hash
      },
      {
        key: 'textencrypt',
        name: 'Text Encryptor/Decryptor',
        IconNode: Hash
      },
      {
        key: 'hmac',
        name: 'HMAC generator',
        IconNode: Hash
      },
      {
        key: 'txthash',
        name: 'Text Hasher',
        IconNode: Hash
      },
      {
        key: 'tokens',
        name: 'Token Generator',
        IconNode: Hash
      },
      {
        key: 'bcrypt',
        name: 'Bcrypt',
        IconNode: Hash
      },
      {
        key: 'jwt',
        name: 'JWT Encode/Decod',
        IconNode: Hash
      },
      {
        key: 'passgen',
        name: 'Password Generator',
        IconNode: Hash
      },
      {
        key: 'ulid',
        name: 'ULID generator',
        IconNode: Hash
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
        IconNode: UploadCloud
      },
      {
        key: 'gitbuckets',
        name: 'GitBuckets',
        IconNode: UploadCloud
      }
    ]
  }

  return (
    <div className='z-10 w-72 bg-[#02060c] border border-gray-100/20 fixed h-screen'>
      <Accordion
        isCompact
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2"]}
      >
        <AccordionItem
          key="1"
          aria-label="crypto"
          title="Crypto"
          classNames={{
            content: 'w-full flex justify-center p-2'
          }} >
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
            content: 'w-full flex justify-center p-2'
          }} >
          <KitSelector
            services={cloudServices.services}
            selected={cloudServices.selected}
            setSelected={cloudServices.setSelected}
          />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default KitNav
