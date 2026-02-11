export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-600">Welcome to the Admin Dashboard.</p>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
           <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-gray-500 text-sm font-medium">Pending Withdrawals</h3>
           <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-gray-500 text-sm font-medium">Active Rentals</h3>
           <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
        </div>
       </div>
    </div>
  );
}
