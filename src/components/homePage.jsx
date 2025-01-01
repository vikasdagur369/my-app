import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-green-600">
        Welcome to HCSTsync
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center px-4">
        Connecting students and alumni. Sign up or log in to explore
        opportunities!
      </p>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Link
          href="/userSignup"
          className="block w-full px-4 py-2 bg-blue-500 text-white font-medium text-center rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </Link>
        <Link
          href="/userLogin"
          className="block w-full px-4 py-2 bg-green-500 text-white font-medium text-center rounded hover:bg-green-600 transition"
        >
          Sign In
        </Link>
        <Link
          href="/adminLogin"
          className="block w-full px-4 py-2 bg-red-500 text-white font-medium text-center rounded hover:bg-red-600 transition"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
