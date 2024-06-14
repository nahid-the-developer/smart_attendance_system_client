import CredentialsProvider from 'next-auth/providers/credentials'

import {httpClient} from "./api";
import {objectToArray} from "./index";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize({academic_id, password}) {
                const payload = {
                    academic_id,
                    password,
                }
                try {
                    const {data} = await httpClient.post(
                        `/auth/login/`,
                        payload
                    )
                    return data
                } catch (error) {
                    if ('response' in error) {
                        const {data: errors} = error.response
                        const formattedData = objectToArray(errors)
                        throw new Error(JSON.stringify(formattedData))
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    accessToken: user?.token,
                    role: user?.role,
                    user: user?.user,
                }
            }
            return token
        },
        async session({session, token}) {
            session.accessToken = token?.accessToken
            session.role = token?.role
            session.user = token?.user
            return session
        },
    },
    pages: {
        signIn: 'auth/login/',
        error: 'auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
}