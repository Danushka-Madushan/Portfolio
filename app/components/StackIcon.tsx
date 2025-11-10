import { Card, CardBody } from '@heroui/card'
import { Image } from '@heroui/image';
import { Tooltip } from '@heroui/tooltip';
import NextImage from 'next/image';

interface StackIconProps {
  icon: string;
  tipString: string;
}

const StackIcon = ({ icon, tipString }: StackIconProps) => {
  const ICON_SIZE = 17;

  return (
    <Tooltip content={tipString}>
      <Card
        classNames={{
          /* Height and Width must be same as ICON_SIZE */
          base: `w-17 h-17 rounded-full bg-[#02060c] border border-gray-100/20`,
          body: 'flex items-center justify-center',
        }}
      >
        <CardBody>
          <div className='flex items-center justify-center'>
            <Image
              alt={icon}
              as={NextImage}
              height={ICON_SIZE * 2}
              src={`/SkillIcons/${icon}.svg`}
              width={ICON_SIZE * 2}
            />
          </div>
        </CardBody>
      </Card>
    </Tooltip>
  )
}

export default StackIcon
