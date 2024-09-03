'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { Component, ReactNode } from 'react'

type Props = {
  children: React.ReactNode,
  //session: Session | null
}
const Provider = ({ children, session }: { children: ReactNode, session?: Session }) => {
  return (
    <SessionProvider session={session}>
       {children}
    </SessionProvider>
  )
}

export default Provider