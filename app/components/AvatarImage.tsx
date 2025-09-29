import { Avatar } from '@heroui/avatar';
import { GITHUB_AVATAR_URL } from '../constant/config';

const AvatarImage = () => {
  return (
    <Avatar
      className="w-24 h-24 text-large"
      alt="Danushka Madushan"
      name="Danushka Madushan"
      color='primary'
      isBordered src={GITHUB_AVATAR_URL} />
  )
}

export default AvatarImage
