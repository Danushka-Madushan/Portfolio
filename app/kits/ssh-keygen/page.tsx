import KitPageWrapper from '@/app/components/KitPageWrapper';
import SSHKit from '@/app/components/kits/SSHKit';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "dmTools - SSH Keygen",
  description: "A simple and efficient SSH Key Generator supports RSA, ECDSA, Ed25519 and export key & pub files for ssh keys.",
  icons: {
    icon: '/favicon.svg',
  }
};

const page = () => {
  return (
    <KitPageWrapper className='w-[1000px]' content={<SSHKit/>} />
  )
}

export default page
