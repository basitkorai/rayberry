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
          className="cursor-pointer border p-3 rounded-md bg-muted text-muted-foreground font-mono"
        >
          <TextType
            text={['Text typing effect', 'for your websites', 'Happy coding!']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-base"
          />
        </div>
      ) : (
        <Textarea className="font-mono text-base" autoFocus />
      )}
    </div>
  )
}
