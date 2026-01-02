export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Restaurant Platform
          </div>
          <div className="space-x-4">
            <a href="/login" className="text-gray-600 hover:text-orange-600">
              Login
            </a>
            <a
              href="/signup"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Delicious Food, Delivered Fast
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Order from the best restaurants in your area
          </p>
          <a
            href="/signup"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Get Started
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your food delivered in under 30 minutes
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-semibold mb-2">Best Chefs</h3>
            <p className="text-gray-600">
              Food prepared by world-class chefs
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-600">
              Multiple payment options for your convenience
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Restaurant Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
