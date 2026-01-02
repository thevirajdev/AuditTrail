export default function MenuManagementPage() {
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
            Add New Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 font-medium">Delicious Burger</td>
                <td className="px-6 py-4 text-gray-600">Burgers</td>
                <td className="px-6 py-4 text-gray-600">$12.99</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    Available
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 font-medium">Margherita Pizza</td>
                <td className="px-6 py-4 text-gray-600">Pizza</td>
                <td className="px-6 py-4 text-gray-600">$14.99</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    Available
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
