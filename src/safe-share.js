// A cancelled native share is not permission to write to the clipboard.
export async function copySafely(button, text, message, nav = globalThis.navigator, failureMessage = 'コピーできませんでした。URL欄からコピーしてください') {
  button.setAttribute?.('aria-live', 'polite')
  try {
    await nav.clipboard.writeText(text)
    button.textContent = message
    return true
  } catch {
    button.textContent = failureMessage
    return false
  }
}

export async function shareSafely(button, data, nav = globalThis.navigator) {
  if (typeof nav?.share === 'function') {
    try {
      await nav.share(data)
      return 'shared'
    } catch (error) {
      if (error?.name === 'AbortError') return 'cancelled'
    }
  }
  return await copySafely(button, data.url, 'URLをコピーしました', nav) ? 'copied' : 'failed'
}
