import { Button } from '@heroui/button'
import BackgroundGrid from './components/BackgroundGrid'
import Hero from './components/Hero'
import NextImage from 'next/image'
import SkillSection from './components/SkillSection'
import TechStack from './components/TechStack'
import { Link } from '@heroui/link'
import StashChevronDownLight from './components/StashChevronDownLight'
import LearningStack from './components/LearningStack'

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>
      {/* MotionGrid */}
      <BackgroundGrid />
      <div className="relative flex flex-col items-center z-10">
        {/* Hero */}
        <Hero />
        <h1 className="flex flex-col items-center bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl my-4 font-thin tracking-tight text-transparent">
          I&lsquo;m Specialized In
          <br />
          <StashChevronDownLight />
        </h1>
        {/* Skills Section */}
        <SkillSection />
        <h1 className="flex flex-col items-center bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl pt-8 pb-6 font-thin tracking-tight text-transparent">
          Teck Stack
          <br />
          <StashChevronDownLight />
        </h1>
        {/* Teck Stack */}
        <TechStack />
        <h1 className="flex flex-col items-center bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl py-4 font-thin tracking-tight text-transparent">
          Learning
          <br />
          <StashChevronDownLight />
        </h1>
        {/* Learning Stack */}
        <LearningStack />
        <div className='flex pt-8 mx-auto justify-center'>
          <Button as={Link} isExternal href={'https://github.com/Danushka-Madushan/'} className='bg-gray-800' endContent={
            <NextImage
              alt='GitHub'
              src={'/SkillIcons/SimpleIconsGithub.svg'}
              height={24}
              width={24}
            />
          } variant='solid' color='primary' size="lg">
            Github
          </Button>
        </div>
        {/* Footer */}
        <footer className="mt-14 mb-8 text-center text-sm text-muted-foreground">
          Made with ❤️ {"by "}
          <Link
            isExternal
            href="https://github.com/Danushka-Madushan/Portfolio"
            className='text-sm text-muted-foreground'
            color='foreground'
            underline="always">
            {"Danuska-Madushan"}
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Home
