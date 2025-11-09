import KitPageWrapper from '@/app/components/KitPageWrapper';
import PassGenKit from '@/app/components/kits/PassGenKit';

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
    <KitPageWrapper className='w-[800px]' content={<PassGenKit />} />
  )
}

export default page
