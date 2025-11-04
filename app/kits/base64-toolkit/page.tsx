import B64Kit from '@/app/components/kits/B64Kit';

import { Card } from '@heroui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "dmTools - Base64 Encode/Decode",
  description: "A simple and efficient Base64 encoding and decoding tool. Convert your text to Base64 format and decode it back with ease.",
  icons: {
    icon: '/favicon.svg',
  }
};

const Page = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Card
        classNames={{
          base: 'bg-[#02060c] border border-gray-100/20 p-4'
        }} className='rounded-lg flex items-center justify-center min-h-80 w-[800px]'>
        <B64Kit/>
      </Card>
    </div>
  )
}

export default Page
