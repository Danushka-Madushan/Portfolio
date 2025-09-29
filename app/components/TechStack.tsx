import StackIcon from './StackIcon'

type StackList = {
  icon: string
  tipString: string
}[]

const TechStack = () => {
  const BACKEND_STACK: StackList = [
    { icon: 'VscodeIconsFileTypeNode', tipString: 'Node.js' },
    { icon: 'VscodeIconsFileTypeBun', tipString: 'Bun.js' },
    { icon: 'VscodeIconsFileTypeFirebase', tipString: 'Firebase' },
    { icon: 'VscodeIconsFileTypePrisma', tipString: 'Prisma' },
    { icon: 'DeviconCloudflareworkers', tipString: 'Cloudflare Workers' },
    { icon: 'OpenmojiPinata', tipString: 'Pinata' },
    { icon: 'SkillIconsGithubactionsLight', tipString: 'GitHub Actions' },
    { icon: 'SkillIconsCmakeDark', tipString: 'CMake' }
  ]

  const FRAMEWORK_STACK: StackList = [
    { icon: 'VscodeIconsFileTypeReactts', tipString: 'React' },
    { icon: 'VscodeIconsFileTypeNext', tipString: 'Next.js' },
    { icon: 'VscodeIconsFileTypeTailwind', tipString: 'Tailwind CSS' },
    { icon: 'VscodeIconsFileTypeMongo', tipString: 'MongoDB' },
    { icon: 'VscodeIconsFileTypeVscode', tipString: 'VS Code' },
    { icon: 'SkillIconsMysqlLight', tipString: 'MySQL' },
    { icon: 'LogosCloudinaryIcon', tipString: 'Cloudinary' },
    { icon: 'VscodeIconsFileTypeDocker2', tipString: 'Docker' },
    { icon: 'DeviconRailway', tipString: 'Railway' },
  ]

  const LANG_STACK: StackList = [
    { icon: 'VscodeIconsFileTypeTypescript', tipString: 'TypeScript' },
    { icon: 'VscodeIconsFileTypeJs', tipString: 'JavaScript' },
    { icon: 'VscodeIconsFileTypePython', tipString: 'Python' },
    { icon: 'VscodeIconsFileTypeVercel', tipString: 'Vercel' },
    { icon: 'MaterialIconThemeFigma', tipString: 'Figma' },
    { icon: 'VscodeIconsFileTypeGit', tipString: 'Git' },
    { icon: 'SimpleIconsGithub', tipString: 'GitHub' },
    { icon: 'DeviconCloudflare', tipString: 'Cloudflare' },
  ]

  return (
    <div className='mb-5 mx-8 flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {BACKEND_STACK.map((stack, index) => {
          return (
            <StackIcon
              key={index}
              icon={stack.icon}
              tipString={stack.tipString}
            />
          )
        })}
      </div>
      <div className='flex flex-wrap gap-4 justify-center'>
        {FRAMEWORK_STACK.map((stack, index) => {
          return (
            <StackIcon
              key={index}
              icon={stack.icon}
              tipString={stack.tipString}
            />
          )
        })}
      </div>
      <div className='flex flex-wrap gap-4 justify-center'>
        {LANG_STACK.map((stack, index) => {
          return (
            <StackIcon
              key={index}
              icon={stack.icon}
              tipString={stack.tipString}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TechStack
