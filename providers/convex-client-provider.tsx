"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
    Unauthenticated
} from "convex/react";
import { Loading } from "@/components/auth/loading";
import { UnAuth } from "@/components/auth/unauth";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    {children}
                </Authenticated>
                <Unauthenticated>
                    <UnAuth />
                </Unauthenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}