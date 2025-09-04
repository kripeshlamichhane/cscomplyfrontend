// import React from 'react';
// import { Shield, CheckCircle, Lock, ChevronLeft, ChevronRight } from 'lucide-react';

// const frameworks = [
//   { 
//     id: 'cmmc-2.0', 
//     name: 'CMMC 2.0', 
//     licensed: true, 
//     progress: 45 
//   },
//   { 
//     id: 'iso-27001', 
//     name: 'ISO 27001', 
//     licensed: true, 
//     progress: 0 
//   },
//   { 
//     id: 'nist-csf', 
//     name: 'NIST CSF', 
//     licensed: false, 
//     progress: 0 
//   },
//   { 
//     id: 'sox', 
//     name: 'SOX', 
//     licensed: false, 
//     progress: 0 
//   }
// ];

// const Sidebar = ({ collapsed, onToggle }) => {
//   return (
//     <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
//       <div className="flex items-center justify-between p-4 border-b">
//         {!collapsed && (
//           <div className="flex items-center space-x-2">
//             <Shield className="h-8 w-8 text-blue-600" />
//             <h1 className="text-xl font-bold text-gray-800">CS Comply</h1>
//           </div>
//         )}
//         <button
//           onClick={onToggle}
//           className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5 text-gray-600" />
//           ) : (
//             <ChevronLeft className="h-5 w-5 text-gray-600" />
//           )}
//         </button>
//       </div>

//       <nav className="mt-6">
//         {!collapsed && (
//           <div className="px-4 mb-4">
//             <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
//               Compliance Frameworks
//             </h2>
//           </div>
//         )}
        
//         <div className="space-y-2">
//           {frameworks.map((framework) => (
//             <div
//               key={framework.id}
//               className={`mx-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                 framework.licensed
//                   ? 'hover:bg-blue-50 border-l-4 border-blue-500'
//                   : 'hover:bg-gray-50 opacity-60'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   {framework.licensed ? (
//                     <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
//                   ) : (
//                     <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
//                   )}
//                   {!collapsed && (
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">
//                         {framework.name}
//                       </p>
//                       {framework.licensed && framework.progress > 0 && (
//                         <div className="mt-1">
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                               style={{ width: `${framework.progress}%` }}
//                             />
//                           </div>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {framework.progress}% Complete
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {!collapsed && (
//           <div className="mt-8 mx-3 p-4 bg-blue-50 rounded-lg">
//             <h3 className="text-sm font-medium text-blue-900 mb-2">
//               Need Additional Frameworks?
//             </h3>
//             <p className="text-xs text-blue-700 mb-3">
//               Contact your administrator to license additional compliance frameworks.
//             </p>
//             <button className="w-full text-xs bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
//               Contact Admin
//             </button>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;