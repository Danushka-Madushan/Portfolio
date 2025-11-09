import { Card } from '@heroui/card';
import { cn } from '../utils/utils';

interface iKitPageWrapper {
  content: React.ReactNode;
  className?: string;
}

const KitPageWrapper = ({ content, className }: iKitPageWrapper) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Card
        classNames={{
          base: 'bg-[#02060c] border border-gray-100/20'
        }} className={cn('rounded-lg flex items-start justify-center min-h-80 w-[580px]', className)}>
        {content}
      </Card>
    </div>
  )
}

export default KitPageWrapper
