import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from 'postcss'
import { Button } from '../ui/button'
import { SignInButton } from '@clerk/nextjs'

export const UnAuth = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>You are not connected</CardTitle>
        <CardDescription>Please login for get access to the website.</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Button>
            <SignInButton />
        </Button>
      </CardContent>
    </Card>
    </div>
  )
}
