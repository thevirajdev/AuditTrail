export default function UserHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Restaurant Platform
          </div>
          <div className="space-x-4">
            <a href="/menu" className="text-gray-600 hover:text-orange-600">
              Menu
            </a>
            <a href="/cart" className="text-gray-600 hover:text-orange-600">
              Cart
            </a>
            <a href="/orders" className="text-gray-600 hover:text-orange-600">
              Orders
            </a>
            <a href="/profile" className="text-gray-600 hover:text-orange-600">
              Profile
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome Home!</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul className="space-y-2">
              <li><a href="/menu" className="text-orange-600 hover:underline">Browse Menu</a></li>
              <li><a href="/cart" className="text-orange-600 hover:underline">View Cart</a></li>
              <li><a href="/orders" className="text-orange-600 hover:underline">My Orders</a></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Featured Items</h2>
            <p className="text-gray-600">Check out our most popular dishes!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
            <p className="text-gray-600">Exclusive deals just for you!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
