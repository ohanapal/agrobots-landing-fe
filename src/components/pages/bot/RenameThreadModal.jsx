'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateThreadMutation } from '@/redux/features/botApi'
import { PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function RenameThreadModal({ open, setopen, thread }) {
  const [threadName, setThreadName] = useState(thread?.name)

  useEffect(() => {
    if (thread?.name) {
      setThreadName(thread.name)
    }
  }, [thread])

  const [updateThread] = useUpdateThreadMutation()

  const handleSubmit = e => {
    e.preventDefault()
    if (threadName === '') return
    updateThread({ id: thread?._id, body: { name: threadName } })
    setThreadName('')
    setopen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
        </DialogHeader>
        <form className='space-y-3 pt-6' onSubmit={handleSubmit}>
          <Input value={threadName} onChange={e => setThreadName(e.target.value)} placeholder='New Chat Name' />
          <Button icon={<PencilLine />} type='submit'>
            Rename Chat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
