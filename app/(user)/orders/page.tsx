export default function OrdersPage() {
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
            <a href="/profile" className="text-gray-600 hover:text-orange-600">
              Profile
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #12345</h3>
                <p className="text-sm text-gray-500">January 2, 2024</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Delivered
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              2x Delicious Burger, 1x Margherita Pizza
            </div>
            <div className="font-bold">$40.97</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #12344</h3>
                <p className="text-sm text-gray-500">January 1, 2024</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Preparing
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              1x Caesar Salad
            </div>
            <div className="font-bold">$9.99</div>
          </div>
        </div>
      </main>
    </div>
  );
}
