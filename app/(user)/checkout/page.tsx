export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Restaurant Platform
          </div>
          <div className="space-x-4">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="NY"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="10001"
                  />
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="card" defaultChecked />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="upi" />
                  <span>📱 UPI</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="wallet" />
                  <span>👛 Wallet</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" value="cash" />
                  <span>💵 Cash on Delivery</span>
                </label>
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
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
              Place Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
