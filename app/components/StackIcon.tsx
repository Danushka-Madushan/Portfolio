import { Card, CardBody } from '@heroui/card'
import { Image } from '@heroui/image';
import NextImage from 'next/image';

interface StackIconProps {
  icon: string;
  tipString: string;
}

const StackIcon = ({ icon, tipString }: StackIconProps) => {
  const ICON_SIZE = 18;

  return (
    <Card
      title={tipString}
      className={`w-${ICON_SIZE} h-${ICON_SIZE}`}
      classNames={{
        base: 'rounded-full bg-[#02060c] border border-gray-100/20',
        body: 'flex items-center justify-center',
      }}
    >
      <CardBody>
        <div className='flex items-center justify-center' title={tipString}>
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
  )
}

export default StackIcon
