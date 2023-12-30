import Image from 'next/image'
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { signIn } from '@/lib/auth'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

function Auth({ searchParams }: Props) {

    const handleCred = async (e: FormData) => {
        'use server'

        const userName = e.get("username")?.toString();
        const userEmail = e.get("email")?.toString();
        const userPass = e.get("password")?.toString();

        console.log(userName, userEmail, userPass);
    }

    const handleGoogleLogin = async () => {
        "use server"
        await signIn("google")

        console.log("HIiii")
    }

    const handleGithubLogin = async () => {
        "use server"
        await signIn("github")
    }

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black w-full h-full lg:bg-opacity-50'>
                <nav className='px-12 py-5'>
                    <div className='relative h-16 w-40'>
                        <Image
                            className='absolute max-w-full h-auto object-contain'
                            src={'/images/logo.png'}
                            alt=''
                            fill
                        />
                    </div>
                </nav>
                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                        <form action={handleCred}>
                            <h2 className='text-white text-4xl mb-8 font-semibold'>
                                {searchParams.variant === 'login' ? 'Sign in' : 'Register'}
                            </h2>
                            <div className='flex flex-col gap-4'>
                                {searchParams.variant === 'register' &&
                                    <Input
                                        className='block h-auto border-none rounded-md px-6 pt-6 pb-1 w-full text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
                                        type='text'
                                        id='username'
                                        name='username'
                                        placeholder=' '
                                        label='Username'
                                    />
                                }
                                <Input
                                    className='block h-auto border-none rounded-md px-6 pt-6 pb-1 w-full text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder=' '
                                    label='Email'
                                />
                                <Input
                                    className='block h-auto border-none rounded-md px-6 pt-6 pb-1 w-full text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder=' '
                                    label='Password'
                                />
                            </div>
                            <button
                                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-all'
                                type='reset'
                            >
                                {searchParams.variant === 'login' ? 'Login' : 'Sign up'}
                            </button>
                        </form>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <form action={handleGoogleLogin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={32} />
                            </form>
                            <form action={handleGithubLogin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={32} />
                            </form>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {searchParams.variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            {searchParams.variant === 'login' ? (
                                <Link
                                    href={{
                                        pathname: "/auth",
                                        query: { variant: "register" }
                                    }}
                                    className="text-white ml-1 hover:underline cursor-pointer"
                                >
                                    Create an account
                                </Link>
                            ) : (
                                <Link
                                    href={{
                                        pathname: "/auth",
                                        query: { variant: "login" }
                                    }}
                                    className="text-white ml-1 hover:underline cursor-pointer"
                                >
                                    Login
                                </Link>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth