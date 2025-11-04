import GitBucketKit from '@/app/components/kits/GitBucketKit';

import { Card } from '@heroui/card';
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
    <div className='flex w-full flex-col items-center justify-center'>
      <Card
        classNames={{
          base: 'bg-[#02060c] border border-gray-100/20'
        }} className='rounded-lg flex items-start transition-all justify-center min-h-80 w-[580px]'>
        <GitBucketKit />
      </Card>
    </div>
  )
}

export default page
