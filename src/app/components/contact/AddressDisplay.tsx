interface AddressDisplayProps {
  addressLines: string[]
  link?: string
  className?: string
}

export default function AddressDisplay({ addressLines, link, className = "" }: AddressDisplayProps) {
  const content = (
    <>
      {addressLines.map((line, index) => (
        <span key={index}>
          {line}
          {index < addressLines.length - 1 && (
            <>
              <br />
            </>
          )}
        </span>
      ))}
    </>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}
