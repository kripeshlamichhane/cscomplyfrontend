// import React from 'react';
// import { TrendingUp, CheckCircle, AlertCircle, FileText, Clock, Upload, MessageSquare } from 'lucide-react';

// const ComplianceOverview = ({ selectedFramework }) => {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-bold text-gray-800">Compliance Overview</h2>
//         <div className="flex space-x-2">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Start Assessment
//           </button>
//           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-lg shadow-sm p-6 border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Assessment Progress</p>
//               <p className="text-2xl font-bold text-gray-900">8 / 30</p>
//               <p className="text-sm text-gray-500">Questions Completed</p>
//             </div>
//             <div className="p-3 bg-blue-100 rounded-full">
//               <CheckCircle className="h-6 w-6 text-blue-600" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-blue-600 h-2 rounded-full" style={{ width: '27%' }} />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">27% Complete</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Compliance Score</p>
//               <p className="text-2xl font-bold text-gray-900">60%</p>
//               <p className="text-sm text-green-600">+5% from last week</p>
//             </div>
//             <div className="p-3 bg-green-100 rounded-full">
//               <TrendingUp className="h-6 w-6 text-green-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Selected Framework</p>
//               <p className="text-2xl font-bold text-gray-900">{selectedFramework?.name || 'CMMC 2.0'}</p>
//               <p className="text-sm text-gray-500">{selectedFramework?.level || 'Level 2 Assessment'}</p>
//             </div>
//             <div className="p-3 bg-purple-100 rounded-full">
//               <FileText className="h-6 w-6 text-purple-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 border">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Pending Actions</p>
//               <p className="text-2xl font-bold text-gray-900">12</p>
//               <p className="text-sm text-orange-600">3 due this week</p>
//             </div>
//             <div className="p-3 bg-orange-100 rounded-full">
//               <AlertCircle className="h-6 w-6 text-orange-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow-sm border">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//         </div>
//         <div className="p-6">
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-full">
//                 <Upload className="h-4 w-4 text-blue-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-800">Evidence uploaded for AC-2.1</p>
//                 <p className="text-xs text-gray-500">2 hours ago</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-green-100 rounded-full">
//                 <MessageSquare className="h-4 w-4 text-green-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-800">Response submitted for IA-5.1</p>
//                 <p className="text-xs text-gray-500">1 day ago</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-purple-100 rounded-full">
//                 <CheckCircle className="h-4 w-4 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-800">Assessment milestone reached</p>
//                 <p className="text-xs text-gray-500">3 days ago</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-orange-100 rounded-full">
//                 <Clock className="h-4 w-4 text-orange-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-800">Reminder: SC-7.1 due tomorrow</p>
//                 <p className="text-xs text-gray-500">5 days ago</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 pt-4 border-t">
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//               View All Activity →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplianceOverview;