export default function AdminOrdersPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #12345</h3>
                <p className="text-sm text-gray-500">John Doe - john@example.com</p>
              </div>
              <select className="border rounded-md px-3 py-1">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              2x Delicious Burger, 1x Margherita Pizza
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">$40.97</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #12344</h3>
                <p className="text-sm text-gray-500">Jane Smith - jane@example.com</p>
              </div>
              <select className="border rounded-md px-3 py-1">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              1x Caesar Salad
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">$9.99</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
