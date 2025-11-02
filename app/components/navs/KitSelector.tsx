'use client'

import { iKitServices } from '@dmtools'
import { Tabs, Tab } from '@heroui/tabs'
import { firaCode } from '../../fonts/fonts'
import { useRouter } from 'next/navigation'

const KitSelector = ({ services, selected, setSelected }: iKitServices) => {
  const router = useRouter();

  const onChange = (key: string | number): void => {
    setSelected(key);
    router.push(`/kits/${key.toLocaleString()}`);
  }

  return (
    <Tabs
      classNames={{
        cursor: 'bg-primary/50',
        tabList: 'w-64 flex flex-col bg-gray-400/10',
        base: 'w-full flex justify-center',
        tab: 'px-4 py-3 hover:bg-gray-200/10 transition-all justify-start',
      }}
      size='lg'
      radius='sm'
      selectedKey={selected}
      onSelectionChange={onChange}
      variant='solid'
      color='primary'
    >
      {
        services.map(({ key, name, IconNode, IconSVG }) => {
          return (
            <Tab
              key={key}
              title={
                <div className="flex items-center align-middle space-x-2">
                  {
                    IconSVG ? <IconSVG fontSize={19} /> : null
                  }
                  {
                    IconNode ? <IconNode size={18} /> : null
                  }
                  <span className={`${firaCode.className} text-sm`}>{name}</span>
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
