const DAY_MS = 24 * 60 * 60 * 1000

const latestGeometry = (event) => event.geometries[event.geometries.length - 1]

const buildPrompt = (wildfires) => {
    const now = Date.now()
    const last7 = wildfires.filter(ev => now - new Date(latestGeometry(ev).date).getTime() <= 7 * DAY_MS)
    const prev7 = wildfires.filter(ev => {
        const age = now - new Date(latestGeometry(ev).date).getTime()
        return age > 7 * DAY_MS && age <= 14 * DAY_MS
    })
    const recentTitles = wildfires.slice(0, 20).map(ev => `- ${ev.title} (${latestGeometry(ev).date.slice(0, 10)})`).join('\n')

    return `You are a wildfire monitoring assistant. Using the data below about currently active wildfires in the US (source: NASA EONET, last 30 days), write a concise 3-4 sentence natural-language risk briefing for a general audience. Mention any regional concentration, one or two notable named fires, and whether activity looks like it's increasing or decreasing recently. Plain prose only, no markdown, no headers.

Total active fires (last 30 days): ${wildfires.length}
Fires first reported in the last 7 days: ${last7.length}
Fires first reported 8-14 days ago: ${prev7.length}
Most recent fires:
${recentTitles}`
}

export const fetchAiBriefing = async (wildfires) => {
    const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY
    if (!apiKey) {
        throw new Error('MISSING_API_KEY')
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-5',
            max_tokens: 300,
            messages: [{role: 'user', content: buildPrompt(wildfires)}]
        })
    })

    if (!res.ok) {
        const body = await res.text()
        throw new Error(`API_ERROR: ${res.status} ${body}`)
    }

    const data = await res.json()
    return data.content?.[0]?.text?.trim() || ''
}
