import PassGenKit from '@/app/components/kits/PassGenKit';
import { Card } from '@heroui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "dmTools - Password Generator",
  description: "Generate strong, customizable passwords quickly. Choose length and character sets (uppercase, lowercase, numbers, symbols), copy to clipboard, and check strength for secure account credentials.",
  icons: {
    icon: '/favicon.svg',
  },
};

const page = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Card
        classNames={{
          base: 'bg-[#02060c] border border-gray-100/20'
        }} className='rounded-lg flex items-end justify-center min-h-80 w-[700px]'>
        <PassGenKit />
      </Card>
    </div>
  )
}

export default page
