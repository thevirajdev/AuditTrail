export default function MenuItemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-96 bg-gray-200"></div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Delicious Menu Item
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-600">$12.99</span>
                <span className="text-gray-500">⭐ 4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-4">
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
