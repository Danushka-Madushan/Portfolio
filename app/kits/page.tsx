import FileUploadBox from '../components/FileUploadBox'
import KitSelector from '../components/KitSelector'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <KitSelector />
      <div className='rounded-2xl bg-gray-800/50 backdrop-filter flex items-start transition-all justify-center backdrop-blur-sm mt-4 min-h-80 w-[580px]'>
        <FileUploadBox/>
      </div>
    </div>
  )
}

export default page
