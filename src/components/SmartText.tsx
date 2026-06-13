import { Fragment } from "react"
import { Link } from "react-router-dom"
import { GLOSSARY } from "../data/glossary"

// Build a single regex that matches any glossary term or alias
// Sort by length descending so longer terms match before shorter ones
const allMatches = GLOSSARY.flatMap((entry) => [
  ...entry.aliases,
  entry.term.toLowerCase(),
]).sort((a, b) => b.length - a.length)

const escapedTerms = allMatches.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
const GLOSSARY_RE = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi")

// Map from lowercase term -> canonical slug
const termToSlug = new Map<string, string>()
for (const entry of GLOSSARY) {
  const slug = encodeURIComponent(entry.term.toLowerCase().replace(/\s+/g, "-"))
  for (const alias of [entry.term, ...entry.aliases]) {
    termToSlug.set(alias.toLowerCase(), slug)
  }
}

interface SmartTextProps {
  text: string
  className?: string
}

/** Renders text with auto-linked glossary terms */
export function SmartText({ text, className }: SmartTextProps) {
  const parts: Array<{ type: "text"; value: string } | { type: "link"; value: string; slug: string }> = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // Reset lastIndex for each render
  GLOSSARY_RE.lastIndex = 0

  while ((match = GLOSSARY_RE.exec(text)) !== null) {
    const matched = match[0]
    const idx = match.index
    const slug = termToSlug.get(matched.toLowerCase())

    if (slug) {
      // Text before this match
      if (idx > lastIndex) {
        parts.push({ type: "text", value: text.slice(lastIndex, idx) })
      }
      parts.push({ type: "link", value: matched, slug })
      lastIndex = idx + matched.length
    }
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) })
  }

  // If no matches, render plain text
  if (parts.length === 0) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "link" ? (
          <Link
            key={i}
            to={`/glossary#${part.slug}`}
            className="border-b border-dotted border-blue-500/50 text-blue-400 no-underline transition-colors hover:border-blue-400 hover:text-blue-300"
          >
            {part.value}
          </Link>
        ) : (
          <Fragment key={i}>{part.value}</Fragment>
        ),
      )}
    </span>
  )
}

/** Renders plain text without links (for headings, labels, etc.) */
export function PlainText({ text, className }: SmartTextProps) {
  return <span className={className}>{text}</span>
}
