import { pacifico } from '../fonts/fonts'
import { cn } from '../utils/utils'
import AvatarImage from './AvatarImage'

export default function Hero() {
  return (
    <section className="container flex max-w-screen-2xl flex-col items-center justify-center space-y-6 pt-16 pb-4 text-center">
      <AvatarImage />
      <div className="flex flex-col gap-y-2">
        <span className="text-4xl md:text-7xl font-bold tracking-tight">
          <span
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-400 to-rose-300 ",
              pacifico.className,
            )}
          >
            Danushka Madushan.
          </span>
        </span>
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-2xl md:text-4xl leading-7 font-thin tracking-tight text-transparent">
          Software Engineer Jr. (Backend & Security)
          <br />
          <span className='text-xl md:text-2xl'>
            Undergraduate
          </span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground text-base mx-2 sm:text-xl sm:leading-8">
          A versatile Software Engineer specializing in both backend development and cybersecurity. I design and build efficient APIs while applying advanced reverse engineering skills to ensure system integrity and security.
        </p>
      </div>
    </section>
  )
}
