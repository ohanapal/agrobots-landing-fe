import { useGenThreadNameMutation, useGetThreadMessagesQuery, useUpdateThreadMutation } from '@/redux/features/botApi'
import { useEffect } from 'react'

export const useThreadCallback = (id, tempMessages, handlePlay, botData) => {
  const { refetch } = useGetThreadMessagesQuery(id, { skip: !id })
  const [genName, { isSuccess: isGenNameSuccess, data }] = useGenThreadNameMutation()
  const [updateThread] = useUpdateThreadMutation()

  const generateThreadName = async () => {
    const res = await refetch()
    if (res?.data?.messages?.length === 4) {
      const messagesTogether = `Write a thread name based on these messages, just respond in plain text within 5 words: \n\n ${tempMessages
        .map(m => m.content[0].text.value)
        .join('\n')}`
      genName({ text: messagesTogether })
    }
    if (botData?.autoplay_response) handlePlay(res?.data?.messages?.at(-1))
  }

  useEffect(() => {
    if (isGenNameSuccess) {
      updateThread({ id, body: { name: data?.message } })
    }
  }, [isGenNameSuccess, data, updateThread, id])

  return generateThreadName
}
