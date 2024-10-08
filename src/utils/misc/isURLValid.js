export function isURLValid(string) {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}
