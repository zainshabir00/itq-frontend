export async function request<T>(url: string, init?: RequestInit): Promise<T> {
    let response: Response

    try {
        response = await fetch(url, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers,
            },
        })
    } catch {
        throw new Error('Could not connect to the task API. Check that the backend is running.')
    }

    const body: unknown = await response.json()

    if (!response.ok) {
        // prettier-ignore
        const message = typeof body === 'object' && body !== null && 'error' in body
            ? String(body.error)
            : `Task API request failed (${response.status}).`
        throw new Error(message)
    }

    return body as T
}
