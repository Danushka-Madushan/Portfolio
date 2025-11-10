'use client'

import { jetBransMono } from '@/app/fonts/fonts'
import { cn } from '@/app/utils/utils'
import { Tabs, Tab } from '@heroui/tabs'
import { CodeXml, Layers, PencilRuler, Sparkles } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface iNavProps {
  className?: string
}

const Nav = ({ className }: iNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState('/')

  useEffect(() => {
    if (pathname.includes('/kits')) {
      setSelected('/kits')
      return;
    }
    setSelected(pathname)
  }, [pathname])

  const onChange = (key: string | number): void => {
    router.push(key.toLocaleString());
  }

  return (
    <div className={cn(`my-8 flex justify-center items-center ${jetBransMono.className}`, className)}>
      <Tabs radius='full' selectedKey={selected} onSelectionChange={onChange} variant='bordered' color='default'>
        <Tab
          key="/"
          title={
            <div className="flex items-center space-x-2">
              <CodeXml size={18} />
              <span>Me</span>
            </div>
          }
        />
        <Tab
          key="/kits"
          title={
            <div className="flex items-center space-x-2">
              <PencilRuler size={18} />
              <span>Kits</span>
            </div>
          }
        />
        <Tab
          key="/aihub"
          title={
            <div className="flex items-center space-x-2">
              <Sparkles size={18} />
              <span>AiHub</span>
            </div>
          }
        />
        <Tab
          key="/archives"
          title={
            <div className="flex items-center space-x-2">
              <Layers size={18} />
              <span>Archives</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}

export default Nav
