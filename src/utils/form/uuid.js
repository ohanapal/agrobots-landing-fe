export default function uuid() {
  // Generate an array of 16 bytes (128 bits)
  const array = new Uint8Array(16)
  window.crypto.getRandomValues(array)

  // Convert byte values into a UUID v4-like string format
  const uniqueId = array.reduce((acc, byte, index) => {
    const hex = byte.toString(16).padStart(2, '0')
    // Insert dashes at specific positions to follow uniqueId format
    if (index === 4 || index === 6 || index === 8 || index === 10) {
      return `${acc}-${hex}`
    }
    return `${acc}${hex}`
  }, '')

  return uniqueId
}
