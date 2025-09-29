import { Card, CardBody } from '@heroui/card'
import { Image } from '@heroui/image'
import NextImage from 'next/image'

const SkillSection = () => {
  const CaseContent = [
    {
      title: 'API Development',
      icon: "MaterialSymbolsDataObject",
      description: 'Scalable APIs with robust, well-documented interfaces for web and mobile applications.'
    },
    {
      title: 'Utility Tools Development',
      icon: "MaterialSymbolsIntegrationInstructionsOutlineSharp",
      description: 'Command-line and desktop tools to streamline workflows and enhance team productivity.'
    },
    {
      title: 'Web Scraping',
      icon: "MaterialSymbolsWebhook",
      description: 'Specialize in web scraping techniques, bypassing anti-bot measures to reliably extract valuable data.'
    },
    {
      title: 'Automation Scripts',
      icon: "MaterialSymbolsFlowsheetOutline",
      description: 'Scripts to automate repetitive tasks like data processing and system administration.'
    },
    {
      title: 'Cloud Infrastructure',
      icon: "MaterialSymbolsCloudLockOutline",
      description: 'Deploy and manage high-performance applications in cloud environments, ensuring availability'
    },
    {
      title: 'Database Management',
      icon: "MaterialSymbolsDatabaseOutline",
      description: 'Manage and optimize both relational and non-relational databases, focusing on data integrity.'
    }
  ]

  return (
    <div className='mt-5 mx-8'>
      <div className='flex flex-wrap gap-8 justify-center'>
        {
          CaseContent.map((item, index) => {
            return (
              <Card
                isPressable
                disableRipple
                key={index}
                className='w-96'
                classNames={{
                  base: 'rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/20'
                }}
              >
                <CardBody>
                  <div className='flex gap-x-2'>
                    <div>
                      <span className='h-10 w-10 flex items-center justify-center rounded-full bg-primary-400/20'>
                        <Image
                          alt={item.icon}
                          as={NextImage}
                          height={22}
                          src={`/FeatureIcons/${item.icon}.svg`}
                          width={22}
                        />
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex justify-start items-center h-10'>
                        <h2 className='text-xl font-thin'>{item.title}</h2>
                      </div>
                      <p className='text-large font-thin text-gray-300'>{item.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default SkillSection
