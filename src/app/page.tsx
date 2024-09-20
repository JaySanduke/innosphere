import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <header className="absolute w-full top-0 z-50">
        <nav className="bg-white bg-opacity-5 backdrop-blur-lg border-b border-white/10 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-slate-300">Innosphere</span>
              </div>
              <div className="flex items-center">
                <SignedOut>
                  <Button asChild size={"default"} className="text-slate-400 hover:text-slate-200 font-semibold tracking-wide">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Innosphere</h1>
          <p className="text-xl text-slate-300 mb-8">Discover a new dimension of innovation and collaboration</p>
          <div className="space-x-4">
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">
                  Move to Dashboard
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </main>
    </>
  );
}
