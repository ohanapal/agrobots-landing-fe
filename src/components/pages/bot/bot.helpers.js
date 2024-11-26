import { API_URL } from '@/configs'
import { setRunId } from '@/redux/slices/botSlice'
import { XhrSource } from '@/utils/form/eventStream'

export const runBotThread = async ({
  msg,
  setisLoading,
  setTempMessages,
  tempMessages,
  setMessage,
  id,
  cb,
  dispatch
}) => {
  const prompt = {
    thread_id: id,
    message: msg
  }

  const newMessage = {
    id: `temp-${Date.now()}`,
    role: 'user',
    content: [{ text: { value: msg } }]
  }
  const newAssistantMessage = {
    id: `temp-${Date.now() + 1}`,
    role: 'assistant',
    content: [{ text: { value: '' } }]
  }
  setTempMessages([...tempMessages, newMessage, newAssistantMessage])
  setisLoading(true)

  let xs = null // Declare xs outside to reference in event handlers

  try {
    xs = XhrSource(`${API_URL}/threads/run/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    })

    xs.addEventListener('error', e => {
      setisLoading(false)
      console.error(e.message)
      if (xs) xs.close() // Close the stream on error
    })

    xs.addEventListener('close', () => {
      setisLoading(false)
      cb()
      if (xs) xs.close() // Ensure the stream is closed after completion
    })

    xs.addEventListener('message', e => {
      const msg = JSON.parse(e.data)

      dispatch(setRunId(msg.id))

      setTempMessages(prev => {
        const updatedMessages = [...prev]
        const lastMessageIndex = updatedMessages.findIndex(m => m.id === newAssistantMessage.id)
        if (lastMessageIndex !== -1) {
          updatedMessages[lastMessageIndex].content[0].text.value += msg.chunk
        }
        return updatedMessages
      })
    })
  } catch (error) {
    console.error('Fetch error:', error)
    if (xs) xs.close() // Ensure the stream is closed on error
  }

  setMessage('')
}
