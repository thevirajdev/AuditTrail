export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">
            🍽️ Admin Dashboard
          </div>
          <div className="space-x-4">
            <a href="/admin/menu-management" className="text-gray-600 hover:text-orange-600">
              Menu
            </a>
            <a href="/admin/orders" className="text-gray-600 hover:text-orange-600">
              Orders
            </a>
            <a href="/admin/analytics" className="text-gray-600 hover:text-orange-600">
              Analytics
            </a>
            <a href="/admin/settings" className="text-gray-600 hover:text-orange-600">
              Settings
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">$12,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">456</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">23</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">Order #12345</span>
                  <p className="text-sm text-gray-500">John Doe</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                  Pending
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">Order #12344</span>
                  <p className="text-sm text-gray-500">Jane Smith</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  Preparing
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">Order #12343</span>
                  <p className="text-sm text-gray-500">Bob Johnson</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Delicious Burger</span>
                <span className="font-bold">234 orders</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Margherita Pizza</span>
                <span className="font-bold">189 orders</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Caesar Salad</span>
                <span className="font-bold">156 orders</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
