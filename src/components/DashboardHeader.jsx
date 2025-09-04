// import React from 'react';
// import { User, LogOut, Bell, Settings } from 'lucide-react';

// const DashboardHeader = ({ user, onLogout }) => {
//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="flex items-center justify-between px-6 py-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Compliance Dashboard</h1>
//           <p className="text-sm text-gray-600">{user.organizationName}</p>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//             <Bell className="h-5 w-5 text-gray-600" />
//           </button>
          
//           <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//             <Settings className="h-5 w-5 text-gray-600" />
//           </button>

//           <div className="relative">
//             <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <User className="h-4 w-4 text-white" />
//               </div>
//               <div className="hidden md:block">
//                 <p className="text-sm font-medium text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-500">{user.email}</p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={onLogout}
//             className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
//           >
//             <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;