import { useGenThreadNameMutation, useGetThreadMessagesQuery, useUpdateThreadMutation } from '@/redux/features/botApi'

export const useThreadCallback = (id, handlePlay, botData) => {
  const { refetch } = useGetThreadMessagesQuery(id, { skip: !id })
  const [genName] = useGenThreadNameMutation()
  const [updateThread] = useUpdateThreadMutation()

  const convertHtmlToPlainText = html => {
    // Create a temporary element to parse HTML
    const temporaryDiv = document.createElement('div')
    temporaryDiv.innerHTML = html

    // Extract text content
    let plainText = temporaryDiv.textContent || temporaryDiv.innerText || ''

    // Remove multiple spaces and trim each line
    plainText = plainText
      .split('\n') // Split into lines
      .map(line => line.trim()) // Trim each line
      .filter(line => line !== '') // Remove empty lines
      .join('\n') // Join lines with a single newline

    return plainText
  }

  const generateThreadName = async () => {
    const res = await refetch()
    if (res?.data?.messages?.length === 4) {
      const messagesTogether = `Write a thread name based on these messages, just respond in plain text within 5 words: \n\n ${res?.data?.messages
        .map(m => `${m.role}: ${convertHtmlToPlainText(m.content[0].text.value)}`)
        .join('\n')}`
      const data = await genName({ text: messagesTogether })
      updateThread({ id, body: { name: data?.data?.message } })
    }
    if (botData?.autoplay_response) handlePlay(res?.data?.messages?.at(-1))
  }

  return generateThreadName
}
