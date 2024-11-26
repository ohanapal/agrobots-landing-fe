'use client'

import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { LoaderCircle, Paperclip } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function FileUploader({ id }) {
  const inputRef = useRef()
  const [isUploading, setisUploading] = useState(false)

  const uploadFile = async e => {
    const file = e.target.files?.[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('thread_id', id)

    try {
      setisUploading(true)
      const response = await axiosInstance.post(`${API_URL}/threads/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response?.data) {
        setisUploading(false)

        if (response.status === 200) {
          toast.success('File uploaded successfully!')
        }
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    } catch (error) {
      setisUploading(false)
      toast.error('Error uploading Document!')
      console.error('Error uploading file', error)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input ref={inputRef} type='file' className='hidden' onChange={uploadFile} accept='.pdf,.doc,.docx,.txt' />

      {isUploading ? (
        <LoaderCircle
          className={cn(
            'size-12 cursor-pointer border-[3px] p-2 rounded-full animate-spin',
            styles.textPrimary,
            styles.borderPrimary
          )}
          strokeWidth={2.7}
          variant='icon'
        />
      ) : (
        <Paperclip
          className={cn('size-6 cursor-pointer', styles.textSecondary)}
          variant='icon'
          onClick={() => inputRef.current.click()}
        />
      )}
    </>
  )
}
