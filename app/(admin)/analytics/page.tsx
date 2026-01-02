export default function AnalyticsPage() {
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
            <a href="/admin/settings" className="text-gray-600 hover:text-orange-600">
              Settings
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Today's Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">$1,234</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Today's Orders</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">45</p>
            <p className="text-sm text-green-600 mt-1">↑ 8% from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">$27.42</p>
            <p className="text-sm text-red-600 mt-1">↓ 3% from yesterday</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
            <div className="h-64 flex items-end gap-2">
              <div className="flex-1 bg-orange-200 rounded-t" style={{ height: '40%' }}></div>
              <div className="flex-1 bg-orange-300 rounded-t" style={{ height: '60%' }}></div>
              <div className="flex-1 bg-orange-400 rounded-t" style={{ height: '75%' }}></div>
              <div className="flex-1 bg-orange-500 rounded-t" style={{ height: '50%' }}></div>
              <div className="flex-1 bg-orange-600 rounded-t" style={{ height: '80%' }}></div>
              <div className="flex-1 bg-orange-700 rounded-t" style={{ height: '90%' }}></div>
              <div className="flex-1 bg-orange-800 rounded-t" style={{ height: '70%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Delicious Burger</span>
                  <span className="font-semibold">234 orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Margherita Pizza</span>
                  <span className="font-semibold">189 orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Caesar Salad</span>
                  <span className="font-semibold">156 orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Grilled Chicken</span>
                  <span className="font-semibold">123 orders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
