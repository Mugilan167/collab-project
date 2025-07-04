
'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the App 🚀</h1>

      {session ? (
        <>
          <p className="mb-2">Signed in as <strong>{session.user?.email}</strong></p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

          <div className="mt-4">
            <Link
              href="/dashboard"
              className="text-blue-600 underline"
            >
              Go to Dashboard 
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">You are not signed in.</p>
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login with Google
          </button>
        </>
      )}
    </main>
  )
}
