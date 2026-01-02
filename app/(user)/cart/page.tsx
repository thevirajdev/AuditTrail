export default function CartPage() {
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
            <a href="/orders" className="text-gray-600 hover:text-orange-600">
              Orders
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">Delicious Burger</h3>
                  <p className="text-gray-600">$12.99</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border rounded">-</button>
                  <span>1</span>
                  <button className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$12.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$1.04</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>$19.03</span>
              </div>
            </div>
            <a
              href="/checkout"
              className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
