'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Inline icons (avoid deprecated packaged icons)
function GoogleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-18.5-1.5-37.9-4.8-56.1H272v106.1h147.1c-6.4 34.7-26.1 64.1-55.6 83.7v69.6h89.8c52.6-48.4 82.2-119.7 82.2-203.3z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c73.8 0 135.8-24.3 181-66l-89.8-69.6c-25 17-57.1 27-91.2 27-69.9 0-129.2-47.1-150.4-110.3H29.6v69.6C74.9 479.1 167 544.3 272 544.3z"
      />
      <path
        fill="#FBBC05"
        d="M121.6 324.4c-10.8-32.6-10.8-67.6 0-100.2V154.6H29.6C-6.6 213.4-6.6 330.8 29.6 389.6l92-65.2z"
      />
      <path
        fill="#EA4335"
        d="M272 107.7c39.9 0 75.8 13.7 104 40.7l78-78C407.8 27.9 345.8 0 272 0 167 0 74.9 65.2 29.6 154.6l92 69.6C142.8 155 202.1 107.7 272 107.7z"
      />
    </svg>
  )
}

function GithubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.334-5.466-5.932 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.301 1.23a11.49 11.49 0 013.006-.404c1.02.005 2.045.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.476 5.922.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function AuthDialog({ open, onOpenChange }) {
  const [show, setShow] = useState(!!open)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    setShow(!!open)
  }, [open])

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      function GithubIcon({ className = 'w-4 h-4' }) {
        return (
          <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.334-5.466-5.932 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.301 1.23a11.49 11.49 0 013.006-.404c1.02.005 2.045.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.476 5.922.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        )
      }
      setUser(data?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const close = (val = false) => {
    setShow(val)
    onOpenChange?.(val)
  }

  const signInWithProvider = async (provider) => {
    setLoading(true)
    setError('')
    try {
      await supabase.auth.signInWithOAuth({ provider })
      // note: this will redirect the page for OAuth flows
    } catch (err) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const signUpWithEmail = async () => {
    if (!email) {
      setError('Please enter an email address')
      return
    }
    if (!password) {
      setError('Please enter a password')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signError) {
        setError(signError.message)
      } else {
        setMessage(
          'Account created — check your email to confirm (if required).'
        )
      }
    } catch (err) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const signInWithEmail = async () => {
    if (!email) {
      setError('Please enter an email address')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const { error: signError } = await supabase.auth.signInWithOtp({ email })
      if (signError) {
        setError(signError.message)
      } else {
        setMessage('Check your inbox for a sign-in link (magic link).')
      }
    } catch (err) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setMessage('Signed out')
      close(false)
    } catch (err) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(val) => {
        close(val)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Signed in as</div>
              <div className="font-medium">{user.email}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={signOut} disabled={loading}>
                  Sign out
                </Button>
                <Button onClick={() => close(false)} variant="ghost">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 bg-amber-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 bg-green-400">
                <Button
                  className="max-w-full flex items-center justify-center gap-2"
                  onClick={() => signInWithProvider('google')}
                  disabled={loading}
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </Button>
                <Button
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                  onClick={() => signInWithProvider('github')}
                  variant="outline"
                  disabled={loading}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Continue with GitHub</span>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px bg-border flex-1" />
                <div className="text-sm text-muted-foreground">or</div>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email</Label>
                  <button
                    type="button"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                    onClick={() => setIsSignUp((s) => !s)}
                  >
                    {isSignUp
                      ? 'Have an account? Sign in'
                      : 'New here? Sign up'}
                  </button>
                </div>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />

                {isSignUp && (
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                    />
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  {isSignUp ? (
                    <Button onClick={signUpWithEmail} disabled={loading}>
                      Create account
                    </Button>
                  ) : (
                    <Button onClick={signInWithEmail} disabled={loading}>
                      Send magic link
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => close(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {message && <div className="text-sm text-green-600">{message}</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
