import React from 'react';
import Link from 'next/link';
import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Christex Form
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/dashboard" className="hover:text-gray-300">
            Form Builder
          </Link>
        </div>

        {/* User Authentication Links */}
        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline">{`Hello, ${user.given_name || "User"}`}</span>
              <LogoutLink className="hover:text-gray-300">Sign Out</LogoutLink>
            </>
          ) : (
            <>
              <LoginLink className="hover:text-gray-300">Sign In</LoginLink>
              <RegisterLink className="hover:text-gray-300">Sign Up</RegisterLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between mt-4">
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Form Builder
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
