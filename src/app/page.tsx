import Image from "next/image";
import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-gray-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Welcome to Christex Form
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-gray-100 via-gray-100 lg:static lg:h-auto lg:bg-none">
          <span>Powered by GenelineX</span>
        </div>
        {user ? (
          <div className="fixed right-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-gray-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
            <LogoutLink>Sign Out</LogoutLink>
          </div>
        ) : null}
      </div>

      <div className="relative flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Create Forms with Ease</h1>
        <p className="text-xl text-gray-700 max-w-xl">
          Christex Form makes it simple to create, manage, and analyze forms for any purpose. Start building your forms today!
        </p>
      </div>

      <div className="mt-16 grid text-center lg:mt-32 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        {!user ? (
          <>
            <RegisterLink className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Sign Up
                <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm text-gray-700">
                Create an account to start using Christex Form.
              </p>
            </RegisterLink>
            <LoginLink className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Sign In
                <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm text-gray-700">
                Already have an account? Sign in here.
              </p>
            </LoginLink>
          </>
        ) : null}

        <Link href="/formbuilder" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Form Builder
            <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-700">
            Start building forms that suit your needs.
          </p>
        </Link>

        <Link href="/analytics" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Analytics
            <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-700">
            Track and analyze form submissions.
          </p>
        </Link>

        <Link href="/templates" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Explore Templates
            <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-700">
            Choose from a variety of pre-built form templates.
          </p>
        </Link>
      </div>
    </main>
  );
}
