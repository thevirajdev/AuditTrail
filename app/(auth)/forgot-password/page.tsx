export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3 py-2 border"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-orange-600 hover:text-orange-500 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
