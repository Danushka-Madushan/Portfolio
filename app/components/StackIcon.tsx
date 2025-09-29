import { Card, CardBody } from '@heroui/card'
import { Image } from '@heroui/image';
import { Tooltip } from '@heroui/tooltip';
import NextImage from 'next/image';

interface StackIconProps {
  icon: string;
  tipString: string;
}

const StackIcon = ({ icon, tipString }: StackIconProps) => {
  const ICON_SIZE = 18;

  return (
    <Tooltip content={tipString}>
      <Card
        className={`w-${ICON_SIZE} h-${ICON_SIZE}`}
        classNames={{
          base: 'rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/20',
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
