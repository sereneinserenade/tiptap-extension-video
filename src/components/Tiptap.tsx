import React, { useState } from 'react'

import { Container, Button, Modal, Text, Input, Row } from '@nextui-org/react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FiLink } from 'react-icons/fi'

import { Video } from '../extensions'

import './styles/Tiptap.scss'

export const Tiptap: React.FC = () => {
  const [isVideoInputModalOpen, setIsVideoInputModalOpen] = useState(false)

  const [videoUrl, setVideoUrl] = useState("https://user-images.githubusercontent.com/45892659/168123851-5fb7a3c3-d83f-4659-845f-3f96d4a2236c.mov")

  const editor = useEditor({
    extensions: [StarterKit, Video],
    content: '<p></p><p></p><h2>Click on the Add video button, enter URL, add video. Below is an example.</h2><video controls="true" style="width: 100%" src="https://user-images.githubusercontent.com/58986949/115314310-805b2780-a1a7-11eb-8558-648a367ea231.mp4"><source src="https://user-images.githubusercontent.com/58986949/115314310-805b2780-a1a7-11eb-8558-648a367ea231.mp4"></video><blockquote><p>Just do it. - Shia LaBeouf</p></blockquote>',
    autofocus: 'start'
  })

  const addVideo = () => editor?.commands.setVideo(videoUrl) && closeModal()

  const openModal = () => setIsVideoInputModalOpen(true)

  const closeModal = () => setIsVideoInputModalOpen(false)

  return (
    <Container className='flex flex-col' fluid css={{ p: '1rem' }}>
      <Row className='buttons-section' justify='space-between'>
        <Button bordered auto onClick={openModal}> Add Video </Button>

        <Button bordered auto onClick={() => navigator.clipboard.writeText(editor?.getHTML() || "")}> Copy Editor content to clipboard </Button>
      </Row>

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
            fullWidth
            color="primary"
            size="lg"
            placeholder="Video Url"
            contentLeft={<FiLink />}
            value={videoUrl}
            onInput={e => setVideoUrl((e.target as HTMLInputElement).value)}
            autoFocus
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
