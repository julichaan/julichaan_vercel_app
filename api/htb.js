export default async function handler(req, res) {
  const token = process.env.HTB_TOKEN
  const userId = '114171'

  if (!token) {
    return res.status(500).json({ error: 'HTB_TOKEN no configurado' })
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0',
  }

  try {
    // Endpoint correcto de la API pública de HTB
    const r = await fetch(`https://www.hackthebox.com/api/v4/profile/${userId}`, { headers })
    const text = await r.text()

    // Si no es JSON válido, devolvemos el status y el texto para debug
    let json
    try {
      json = JSON.parse(text)
    } catch {
      return res.status(502).json({ error: `HTB API error ${r.status}`, raw: text.slice(0, 200) })
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 's-maxage=300') // cache 5 min
    res.status(200).json(json)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
