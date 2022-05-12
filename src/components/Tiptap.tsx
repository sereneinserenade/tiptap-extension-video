import React, { useState } from 'react'

import { Container, Button, Modal, Text, Input } from '@nextui-org/react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FiLink } from 'react-icons/fi'

import { Video } from '../extensions'

import './styles/Tiptap.scss'

export const Tiptap: React.FC = () => {
  const [isVideoInputModalOpen, setIsVideoInputModalOpen] = useState(false)

  const [videoUrl, setVideoUrl] = useState("")

  const editor = useEditor({
    extensions: [StarterKit, Video],
    content: '<p>Hello World!</p>',
  })

  const addVideo = () => editor?.commands.setVideo(videoUrl) && closeModal()

  const openModal = () => setIsVideoInputModalOpen(true)

  const closeModal = () => setIsVideoInputModalOpen(false)

  return (
    <Container className='flex flex-col' fluid css={{ p: '1rem' }}>
      <section className='buttons-section'>
        <Button bordered auto onClick={openModal}> Add Video </Button>
      </section>

      <EditorContent editor={editor} />

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVideoInputModalOpen}
        onClose={closeModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add Video Url
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Video Url"
            contentLeft={<FiLink />}
            onInput={e => setVideoUrl((e.target as HTMLInputElement).value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeModal}>
            Close
          </Button>
          <Button auto onClick={addVideo}>
            Add Video
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
