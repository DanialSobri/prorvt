import { UserAuthForm } from './components/user-auth-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; // Add this import at the top

export default function SignIn() {

  const navigate = useNavigate(); // Add this hook

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      window.location.href = '/apps'
    }
  }, [])

  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col p-10 text-white lg:flex'>
          <div className='absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900' />
          <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' />
          <div className='absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-transparent backdrop-blur-sm' />
          <div
            className='relative z-20 flex items-center text-lg font-medium'
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            ProRVT
          </div>

          <img
            src="/images/snapshot.gif"
            className="relative m-auto rounded-lg shadow-xl border border-white/20 backdrop-blur-sm"
            width={500}
            height={300}
            alt="ProRVT Demo"
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className='text-sm'>ProRVT Team</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below to log into your account. Don't have an account?{' '}
                <a
                  href='/sign-up'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Sign up
                </a>
                .
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
