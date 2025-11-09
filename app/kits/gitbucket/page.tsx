import KitPageWrapper from '@/app/components/KitPageWrapper';
import GitBucketKit from '@/app/components/kits/GitBucketKit';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "dmTools - GitBucket",
  description: "GitBucket is a secure file hosting service that allows you to upload files up to 5MB and generates direct download links. Files are stored in a private GitHub repository and served via a Cloudflare worker, ensuring fast and reliable access.",
  icons: {
    icon: '/favicon.svg',
  }
};

const page = () => {
  return (
    <KitPageWrapper className='transition-all' content={<GitBucketKit/>} />
  )
}

export default page
