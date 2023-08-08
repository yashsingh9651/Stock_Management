"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
const page = () => {
  const {data:session} = useSession({
    required:true,
    onUnauthenticated(){
      redirect(process.env.NEXT_PUBLIC_AUTH_URL)
    }
  });
  return (
    <div>Create Bill</div>
  )
}

export default page;