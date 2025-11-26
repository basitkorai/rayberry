import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import TextType from './TextType'
export function TypewriterTextarea() {
  const [showTextarea, setShowTextarea] = useState(false)

  return (
    <div className="w-full space-y-4">
      {!showTextarea ? (
        <div
          onClick={() => setShowTextarea(!showTextarea)}
          className="cursor-pointer border p-3 rounded-md bg-muted text-black dark:white font-mono"
        >
          <TextType
            text={['Text typing effect', 'for your websites', 'Happy coding!']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-base text-black dark:text-white"
          />
        </div>
      ) : (
        <div
          onClick={() => setShowTextarea(!showTextarea)}
          className="cursor-pointer border p-3 rounded-md bg-muted text-muted-foreground font-mono"
        >
          <Textarea
            className="font-mono text-base text-black dark:text-white"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
