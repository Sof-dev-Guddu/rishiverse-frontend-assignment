import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { loginSchema, LoginFormData } from '@/schemas/login';
import { signupSchema, SignupFormData } from '@/schemas/signup';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, signupUser } from '@/store/features/auth/authThunk';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type Mode = 'login' | 'signup';

// Union type for form data
type FormData = LoginFormData | SignupFormData;

interface AuthFormProps {
  mode: Mode;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authState = useAppSelector((state) => state.auth);

  // Select validation schema based on mode
  const schema = mode === 'login' ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (mode === 'login') {
      dispatch(loginUser(data as LoginFormData));
    } else {
      dispatch(signupUser(data as SignupFormData));
    }
  };

  // Effect for redirect or form reset after success
  useEffect(() => {
    if (authState.user && authState.token) {
      if (mode === 'login') {
        router.push('/dashboard'); 
      } else if (mode === 'signup') {
        reset(); // clear signup form
        
      }
    }
  }, [authState.user, authState.token, mode, router, reset]);

  
  const signupErrors = errors as FieldErrors<SignupFormData>;

  return (
    <div className="p-8 border border-gray-200 max-w-md mx-auto rounded-md shadow-sm">
      <h1 className="text-center text-2xl font-semibold mb-6 text-primary">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5" noValidate>
        {mode === 'signup' && (
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name' as const)}
              className={`border-b px-2 py-1 focus:outline-none rounded ${
                signupErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {signupErrors.name && (
              <p className="text-red-600 text-sm mt-1">{signupErrors.name.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email' as const)}
            className={`border-b px-2 py-1 focus:outline-none rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password' as const)}
            className={`border-b px-2 py-1 focus:outline-none rounded ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {mode === 'signup' && (
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword' as const)}
              className={`border-b px-2 py-1 focus:outline-none rounded ${
                signupErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {signupErrors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{signupErrors.confirmPassword.message}</p>
            )}
          </div>
        )}

        {/* API error if any */}
        {authState.error && (
          <p className="text-red-600 text-center mt-2">{authState.error}</p>
        )}

        <button
          type="submit"
          disabled={authState.loading || isSubmitting}
          className="
  px-4 py-2 rounded
  text-white
  bg-gradient-to-r from-[#ff5200] to-[#B20E38]
  relative
  overflow-hidden
  before:absolute before:-inset-1 before:blur-lg before:bg-gradient-to-r before:from-[#C65930] before:to-[#B20E38] before:opacity-36 before:rounded
  hover:before:bg-gradient-to-l   hover:before:opacity-28
  transition-opacity duration-300
  z-10
  disabled-opacity-50
"
        >
          {authState.loading ? (
    <div className='flex items-center gap-2" '>
      <Loader2 className="h-4 w-4 animate-spin" />
      {mode === "login" ? "Logging in..." : "Signing up..."}
    </div>
  ) : mode === "login" ? (
    "Login"
  ) : (
    "Sign Up"
  )}
        </button>
        {mode === 'login' &&  <p>not have account?
          <Link className='ml-[6px] text-secondary' href={"/signup"}>SignUp</Link>
        </p>}
        {mode !== 'login' &&  <p>have an account?
          <Link className='ml-[6px] text-secondary' href={"/login"}>Login</Link>
        </p>}
      </form>
    </div>
  );
};

export default AuthForm;
