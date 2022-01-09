/**
 * Verify the banner content
 * @param content - The content of banner
 * @return The error message, when success, if will be a empty string
 */
export default function (content: string): string {
  // illegal type
  if (typeof content !== 'string') {
    return 'The banner content must be a string.'
  }

  // No content
  if (!content) {
    return 'The banner content can not be empty.'
  }

  // The comment symbols not in pairs
  if (
    (content.includes('/*') && !content.includes('*/')) ||
    (!content.includes('/*') && content.includes('*/'))
  ) {
    return 'If you want to pass in comment symbols, you must pass them in pairs.'
  }

  // Ok
  return ''
}
