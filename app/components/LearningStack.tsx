import StackIcon from './StackIcon'

type StackList = {
  icon: string
  tipString: string
}[]

const LearningStack = () => {

  const FRAMEWORK_STACK: StackList = [
    { icon: 'VscodeIconsFileTypeCpp3', tipString: 'C++' },
    { icon: 'VscodeIconsFileTypeCsharp2', tipString: 'C#' },
    { icon: 'Supabase', tipString: 'Supabase' },
    { icon: 'DeviconJavaWordmark', tipString: 'Java' }
  ]

  return (
    <div className='mb-5 mx-8 flex flex-col gap-4'>
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
    </div>
  )
}

export default LearningStack
