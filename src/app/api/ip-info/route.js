export async function GET() {
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json')
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message })
  }
}
