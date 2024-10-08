'use client'

import animationData from '@/assets/lottie/imageUploading.json'
import { API_URL } from '@/configs'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from './button'
import Overlay from './overlay'

const DnDUpload = ({ setUploadURL = () => {}, icon, label, buttonLabel, className, cb = () => {}, ...rest }) => {
  const [file, setfile] = useState(null)

  const [isUploading, setisUploading] = useState(false)
  const inputBtnRef = useRef(null)

  const handleDrop = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length) {
      setfile(files[0])
      uploadFile(files[0])
    }
  }

  const handleChange = e => {
    const files = e.target.files
    if (files.length) {
      setfile(files[0])
      uploadFile(files[0])
    }
  }

  const handleButtonClick = () => {
    inputBtnRef.current.click()
  }

  const uploadFile = async file => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      setisUploading(true)
      const response = await axios.post(`${API_URL}/users/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response?.data?.status === 'success') {
        setisUploading(false)
        setUploadURL(response?.data?.uploadedUrl)
        cb(response?.data?.uploadedUrl)
        inputBtnRef.current.value = ''
      }
    } catch (error) {
      setisUploading(false)
      console.error('Error uploading file', error)
      inputBtnRef.current.value = ''
    }
  }

  return (
    <>
      <div
        className={cn(
          'border-2 rounded-2xl border-dashed p-5 sm:p-10 text-center flex flex-col items-center justify-center bg-gray50',
          className
        )}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className='pb-4'>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <div className='flex flex-col items-center justify-center gap-4'>
              <div className='p-3.5 bg-secondary rounded-full'>
                {icon ? icon : <ImagePlus className='text-primary' size={20} strokeWidth={2} />}
              </div>
              <p>{label ? label : 'Drag and drop file here, or click the button below to select file'}</p>
            </div>
          )}
        </div>
        <input type='file' ref={inputBtnRef} onChange={handleChange} className='hidden' id='file-upload' {...rest} />
        <Button onClick={handleButtonClick} variant='secondary' className='h-10 rounded-md'>
          {buttonLabel || 'Select File'}
        </Button>
      </div>
      <Overlay isOpen={isUploading} animationData={animationData} />
    </>
  )
}

export default DnDUpload
