interface LabeledContentProps {
  label: string
  content: string
}

export default function LabeledContent({
  label,
  content,
}: LabeledContentProps) {
  return (
    <div className="flex gap-2 items-center">
      <span className="bg-green whitespace-nowrap p-1 border border-green- text-white text-xs font-semibold rounded-md">
        {label ?? '-'}
      </span>
      <span className="text-xs text-text">{content ?? '-'}</span>
    </div>
  )
}
