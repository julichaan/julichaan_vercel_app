export default async function handler(req, res) {
  const token = process.env.HTB_TOKEN
  const userId = '114171'

  if (!token) {
    return res.status(500).json({ error: 'HTB_TOKEN no configurado' })
  }

  try {
    const [profileRes, activityRes] = await Promise.all([
      fetch(`https://www.hackthebox.com/api/v4/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      }),
      fetch(`https://www.hackthebox.com/api/v4/profile/activity/${userId}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      })
    ])

    const profile = await profileRes.json()
    const activity = await activityRes.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json({ profile, activity })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
