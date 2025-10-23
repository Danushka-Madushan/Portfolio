'use client'

import { Tabs, Tab } from '@heroui/tabs'
import { Hash, UploadCloud } from 'lucide-react'
import { useState } from 'react'

const KitSelector = () => {
  const [selected, setSelected] = useState<string | number>('gitbucket')

  const services: {
    key: string,
    name: string,
    IconNode: typeof UploadCloud
  }[] = [
      {
        key: 'gitbucket',
        name: 'GitBucket',
        IconNode: UploadCloud
      },
      {
        key: 'cryptocat',
        name: 'CryptoCat',
        IconNode: Hash
      }
    ]

  return (
    <Tabs
      classNames={{
        tabList: 'bg-gray-400/10 backdrop-filter backdrop-blur-sm'
      }}
      size='lg'
      selectedKey={selected}
      onSelectionChange={setSelected}
      variant='bordered'
      color='primary'
      radius='full'
    >
      {
        services.map(({ key, name, IconNode }) => {
          return (
            <Tab
              key={key}
              title={
                <div className="flex items-center space-x-2">
                  <IconNode size={18} />
                  <span>{name}</span>
                </div>
              }
            />
          )
        })
      }
    </Tabs>
  )
}

export default KitSelector
