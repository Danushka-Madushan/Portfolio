import { Card } from '@heroui/card'
import FileUploadBox from '../components/FileUploadBox'
import KitNav from '../components/KitNav'

/** 
 * TODO: Implement the kits page similar to app/kits/page.tsx
 * B64 Converter - Base64 Encode/Decode
 * UUID Generator - Generate UUID V1-V5
 * RSA Encryptor/Decryptor - RSA Key Pair Generation, Encryption, Decryption
 * Text Encoder/Decoder - UTF-8, Base64, URL
 * Text Encryptor/Decryptor - AES, DES, TripleDES
 * Hmac generator - Hmac MD5, SHA-1, SHA-256
 * Text Hasher - MD5, SHA-1, SHA-256, SHA-512
 * Token Generator - Generate random tokens
 * Bcrypt - Password Hashing
 * JWT Encode/Decode - JSON Web Tokens
 * Password Generator - Customizable passwords
 * ULID generator - Universally Unique Lexicographically Sortable Identifier
*/

const page = () => {
  return (
    <div className='flex w-full relative'>
      <KitNav />
      <div className='flex w-full justify-center absolute'>
        <Card
          classNames={{
            base: 'rounded-md bg-[#02060c] border border-gray-100/20'
          }} className='rounded-2xl flex items-start transition-all justify-center mt-4 min-h-80 w-[580px]'>
          <FileUploadBox />
        </Card>
      </div>
    </div>
  )
}

export default page
