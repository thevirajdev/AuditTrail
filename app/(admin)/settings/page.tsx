export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Admin Dashboard
          </div>
          <div className="space-x-4">
            <a href="/admin/dashboard" className="text-gray-600 hover:text-orange-600">
              Dashboard
            </a>
            <a href="/admin/menu-management" className="text-gray-600 hover:text-orange-600">
              Menu
            </a>
            <a href="/admin/orders" className="text-gray-600 hover:text-orange-600">
              Orders
            </a>
            <a href="/admin/analytics" className="text-gray-600 hover:text-orange-600">
              Analytics
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="My Restaurant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="contact@restaurant.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="+1234567890"
                />
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Delivery Settings</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border rounded-md px-3 py-2"
                    defaultValue="5.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border rounded-md px-3 py-2"
                    defaultValue="8.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Order Value ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="10.00"
                />
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable UPI</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Wallet</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
