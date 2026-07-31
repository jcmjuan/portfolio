"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

function CopyButton({ code }: { code: string }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent"
    >
      Copy
    </button>
  )
}

export function MdRenderer({ content }: { content: string }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children, ...props }) {
            const codeElement = children as React.ReactElement<{
              className?: string
              children?: React.ReactNode
            }>
            if (
              codeElement &&
              typeof codeElement === "object" &&
              "props" in codeElement
            ) {
              const code = String(codeElement.props.children).replace(/\n$/, "")
              return (
                <div className="group relative">
                  <pre {...props}>{children}</pre>
                  <CopyButton code={code} />
                </div>
              )
            }
            return <pre {...props}>{children}</pre>
          },
          a({ href, children, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          img({ src, alt, ...props }) {
            return (
              <img
                src={src}
                alt={alt || ""}
                className="rounded-xl"
                loading="lazy"
                {...props}
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
