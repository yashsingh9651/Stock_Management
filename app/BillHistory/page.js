"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  const {data:session} = useSession({
    required:true,
    onUnauthenticated(){
      redirect(process.env.NEXT_PUBLIC_AUTH_URL)
    }
  });
  return (
    <div>Bill History</div>
  )
}

export default page;