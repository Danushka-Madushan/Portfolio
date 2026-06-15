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
      <button
        type="button"
        aria-label={tipString}
        className={`inline-flex items-center justify-center w-17 h-17 rounded-full bg-[#02060c] border border-gray-100/20`}
      >
        <Image
          alt={icon}
          as={NextImage}
          height={ICON_SIZE * 2}
          src={`/SkillIcons/${icon}.svg`}
          width={ICON_SIZE * 2}
        />
      </button>
    </Tooltip>
  )
}

export default StackIcon
