import { Node, nodeInputRule } from '@tiptap/react'
import { Plugin, PluginKey } from 'prosemirror-state'

export interface VideoOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Set a video node
       */
      setVideo: (src: string) => ReturnType,
      /**
       * Toggle a video
       */
      toggleVideo: (src: string) => ReturnType,
    }
  }
}


const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const Video = Node.create({
  name: 'video',

  inline: true,

  group: 'inline',

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el) => (el as HTMLSpanElement).getAttribute('src'),
        renderHTML: (attrs) => ({ src: attrs.src }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video',
        getAttrs: el => ({ src: (el as HTMLVideoElement).getAttribute('src') }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    debugger

    return [
      'video',
      { controls: 'true', style: 'width: 100%' },
      ['source', HTMLAttributes]
    ]
  },

  addCommands() {
    return {
      setVideo: (src: string) => ({ commands }) => {
        debugger
        return commands.insertContent(`<video controls="true" style="width: 100%" src="${src}" />`)
      },

      toggleVideo: () => ({ commands }) => commands.toggleNode(this.name, 'paragraph'),
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, src,] = match

          return { src }
        },
      })
    ]
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('videoDropPlugin'),

        props: {
          handleDOMEvents: {
            drop({ state: { schema, tr }, dispatch, posAtCoords }, event) {
              const hasFiles = event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length

              if (!hasFiles) return false

              const videos = Array
                .from(event.dataTransfer.files)
                .filter(file => (/video/i).test(file.type))

              if (videos.length === 0) return false

              event.preventDefault()

              const coordinates = posAtCoords({ left: event.clientX, top: event.clientY })

              videos.forEach(video => {
                const reader = new FileReader()

                reader.onload = readerEvent => {
                  const node = schema.nodes.video.create({ src: readerEvent.target?.result })

                  if (coordinates && typeof coordinates.pos === 'number') {
                    const transaction = tr.insert(coordinates?.pos, node)

                    dispatch(transaction)
                  }
                }

                reader.readAsDataURL(video)
              })

              return true
            }
          }
        }
      })
    ]
  }

})
