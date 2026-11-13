import { useCallback, useEffect, useState } from "react"
import { APPLICATION_API_URL } from "./BalerionConfig"

export type ApplicationInput = {
    roleId: "software-engineer" | "forward-deployed-engineer" | "ai-engineer"
    fullName: string
    email: string
    phone?: string
    linkedinUrl?: string
    workUrl?: string
    resumeName: string
    resumeBase64: string
    website?: string
}

async function request(path: string, init?: RequestInit) {
    if (!APPLICATION_API_URL.trim()) {
        throw new Error("Application delivery is not configured. Your details and resume have not been sent.")
    }
    const response = await fetch(APPLICATION_API_URL.replace(/\/+$/, "") + path, {
        ...init,
        credentials: "omit",
        headers: { "Content-Type": "application/json", ...init?.headers },
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
        const error = new Error(data?.error || `Application request failed (${response.status}).`)
        Object.assign(error, { data: { error: error.message } })
        throw error
    }
    return data
}

export function useGetApplicationStatus(_options?: unknown) {
    const [data, setData] = useState<{ available: boolean }>()
    const [isError, setIsError] = useState(false)
    const [attempt, setAttempt] = useState(0)
    const refetch = useCallback(() => setAttempt((value) => value + 1), [])
    useEffect(() => {
        if (!APPLICATION_API_URL.trim()) {
            setData({ available: false })
            return
        }
        let alive = true
        const controller = new AbortController()
        const load = () => {
            request("/api/applications/status", { signal: controller.signal })
                .then((value) => {
                    if (alive) { setData(value); setIsError(false) }
                })
                .catch(() => { if (alive) setIsError(true) })
        }
        load()
        const interval = window.setInterval(load, 30_000)
        window.addEventListener("focus", load)
        return () => {
            alive = false
            controller.abort()
            window.clearInterval(interval)
            window.removeEventListener("focus", load)
        }
    }, [attempt])
    return { data, isError, refetch }
}

export async function submitApplication(input: ApplicationInput) {
    return request("/api/applications", { method: "POST", body: JSON.stringify(input) })
}
