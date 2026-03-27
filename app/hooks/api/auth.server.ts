'use server';

import { cookies } from "next/headers"

interface User {
    message: string
    user: {
        id: number
        email: string
    }
}

export async function getMe(): Promise<User> {
    const token = (await cookies()).get('token')?.value
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) throw new Error('No autenticado')

    return response.json() as Promise<User>
}
