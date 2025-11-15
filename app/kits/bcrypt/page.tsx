import KitPageWrapper from '@/app/components/KitPageWrapper';
import BCrypt from '@/app/components/kits/BCrypt';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "dmTools - BCrypt",
  description: "A tool for bcrypt, encrypt and decrypt passwords with tweakable configuration.",
  icons: {
    icon: '/favicon.svg',
  }
};

const page = () => {
  return (
    <KitPageWrapper className='w-[650px]' content={<BCrypt/>} />
  )
}

export default page
