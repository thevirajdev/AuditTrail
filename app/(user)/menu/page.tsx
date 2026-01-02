export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Restaurant Platform
          </div>
          <div className="space-x-4">
            <a href="/home" className="text-gray-600 hover:text-orange-600">
              Home
            </a>
            <a href="/cart" className="text-gray-600 hover:text-orange-600">
              Cart
            </a>
            <a href="/orders" className="text-gray-600 hover:text-orange-600">
              Orders
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Delicious Burger</h3>
              <p className="text-gray-600 mt-2">Juicy beef patty with fresh vegetables</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 font-bold">$12.99</span>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Margherita Pizza</h3>
              <p className="text-gray-600 mt-2">Classic pizza with tomato and mozzarella</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 font-bold">$14.99</span>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Caesar Salad</h3>
              <p className="text-gray-600 mt-2">Fresh romaine with Caesar dressing</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 font-bold">$9.99</span>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
