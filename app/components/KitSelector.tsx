'use client'

import { iKitServices } from '@dmtools'
import { Tabs, Tab } from '@heroui/tabs'

const KitSelector = ({ services, selected, setSelected }: iKitServices) => {

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
      onSelectionChange={setSelected}
      variant='solid'
      color='primary'
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
