import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/back.jpg"
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Restaurant Admin</h1>
            <p className="text-muted-foreground">
              Professional restaurant management system
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
