import KitPageWrapper from '@/app/components/KitPageWrapper';
import B64Kit from '@/app/components/kits/B64Kit';

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
    <KitPageWrapper className='w-[800px]' content={<B64Kit />} />
  )
}

export default Page
