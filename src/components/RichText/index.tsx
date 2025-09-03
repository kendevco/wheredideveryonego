import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

// Simplified RichText for beta compatibility
function renderNode(node: any): React.ReactNode {
  if (node.type === 'block') {
    switch (node.fields?.blockType) {
      case 'banner':
        return <BannerBlock key={node.id} className="col-start-2 mb-4" {...node.fields} />
      case 'mediaBlock':
        return (
          <MediaBlock
            key={node.id}
            className="col-start-1 col-span-3"
            imgClassName="m-0"
            {...node.fields}
            captionClassName="mx-auto max-w-[48rem]"
            enableGutter={false}
            disableInnerContainer={true}
          />
        )
      case 'code':
        return <CodeBlock key={node.id} className="col-start-2" {...node.fields} />
      case 'cta':
        return <CallToActionBlock key={node.id} {...node.fields} />
      default:
        return null
    }
  }

  if (node.children) {
    return node.children.map((child: any, index: number) => (
      <span key={index}>{renderNode(child)}</span>
    ))
  }

  if (node.text) {
    return node.text
  }

  return null
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props

  if (!data || !data.root || !data.root.children) {
    return null
  }

  return (
    <div
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    >
      {data.root.children.map((node: any, index: number) => (
        <div key={index}>{renderNode(node)}</div>
      ))}
    </div>
  )
}
