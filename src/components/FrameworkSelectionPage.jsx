// import React, { useState } from 'react';
// import { Shield, CheckCircle, Lock, ArrowRight, Info } from 'lucide-react';

// // Mock frameworks data - in real app this would come from API
// const mockFrameworks = [
//   {
//     id: 'cmmc-2.0',
//     name: 'CMMC 2.0',
//     description: 'Cybersecurity Maturity Model Certification for defense contractors',
//     licenseRequired: false,
//     level: 'Level 2',
//     estimatedTime: '4-6 weeks'
//   },
//   {
//     id: 'iso-27001',
//     name: 'ISO 27001',
//     description: 'International standard for information security management systems',
//     licenseRequired: false,
//     level: 'Full Certification',
//     estimatedTime: '8-12 weeks'
//   },
//   {
//     id: 'nist-csf',
//     name: 'NIST Cybersecurity Framework',
//     description: 'Framework for improving critical infrastructure cybersecurity',
//     licenseRequired: true,
//     level: 'Core Implementation',
//     estimatedTime: '6-8 weeks'
//   },
//   {
//     id: 'sox',
//     name: 'SOX Compliance',
//     description: 'Sarbanes-Oxley Act compliance for financial reporting',
//     licenseRequired: true,
//     level: 'Section 404',
//     estimatedTime: '10-14 weeks'
//   },
//   {
//     id: 'hipaa',
//     name: 'HIPAA',
//     description: 'Health Insurance Portability and Accountability Act compliance',
//     licenseRequired: true,
//     level: 'Security Rule',
//     estimatedTime: '6-10 weeks'
//   },
//   {
//     id: 'gdpr',
//     name: 'GDPR',
//     description: 'General Data Protection Regulation for data privacy',
//     licenseRequired: false,
//     level: 'Full Compliance',
//     estimatedTime: '8-12 weeks'
//   }
// ];

// const FrameworkSelectionPage = ({ user, onFrameworkSelect, onLogout }) => {
//   const [selectedFramework, setSelectedFramework] = useState(null);
//   const [showTooltip, setShowTooltip] = useState(null);
//   const [frameworks] = useState(mockFrameworks); // In real app, this would be fetched from API

//   const handleFrameworkClick = (framework) => {
//     if (!framework.licenseRequired) {
//       setSelectedFramework(framework);
//       // Simulate brief loading then redirect to dashboard
//       setTimeout(() => {
//         onFrameworkSelect(framework);
//       }, 500);
//     }
//   };

//   const handleLockedFrameworkClick = (frameworkId) => {
//     setShowTooltip(frameworkId);
//     setTimeout(() => setShowTooltip(null), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-4">
//             <div className="flex items-center space-x-3">
//               <Shield className="h-8 w-8 text-blue-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">CS Comply</h1>
//                 <p className="text-sm text-gray-600">{user.organizationName}</p>
//               </div>
//             </div>
//             <button
//               onClick={onLogout}
//               className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Select a Compliance Framework
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Choose a compliance framework to begin your assessment. Free frameworks are available immediately, 
//             while premium frameworks require a license upgrade.
//           </p>
//         </div>

//         {/* Framework Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {frameworks.map((framework) => (
//             <div
//               key={framework.id}
//               className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
//                 !framework.licenseRequired
//                   ? 'hover:border-blue-500 hover:shadow-md cursor-pointer'
//                   : 'opacity-75 cursor-not-allowed'
//               } ${
//                 selectedFramework?.id === framework.id
//                   ? 'border-blue-500 shadow-md'
//                   : 'border-gray-200'
//               }`}
//               onClick={() => 
//                 !framework.licenseRequired 
//                   ? handleFrameworkClick(framework)
//                   : handleLockedFrameworkClick(framework.id)
//               }
//             >
//               <div className="p-6">
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     {!framework.licenseRequired ? (
//                       <div className="p-2 bg-green-100 rounded-lg">
//                         <CheckCircle className="h-6 w-6 text-green-600" />
//                       </div>
//                     ) : (
//                       <div className="p-2 bg-gray-100 rounded-lg relative">
//                         <Lock className="h-6 w-6 text-gray-400" />
//                         {showTooltip === framework.id && (
//                           <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
//                             Requires license upgrade
//                             <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {framework.name}
//                       </h3>
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         !framework.licenseRequired
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {!framework.licenseRequired ? 'Free' : 'Requires License'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//                   {framework.description}
//                 </p>

//                 {/* Details */}
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Info className="h-4 w-4 mr-2" />
//                     <span className="font-medium">Level:</span>
//                     <span className="ml-1">{framework.level}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Info className="h-4 w-4 mr-2" />
//                     <span className="font-medium">Est. Time:</span>
//                     <span className="ml-1">{framework.estimatedTime}</span>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <div className="pt-4 border-t border-gray-100">
//                   {!framework.licenseRequired ? (
//                     <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
//                       {selectedFramework?.id === framework.id ? (
//                         <div className="flex items-center">
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                           Starting...
//                         </div>
//                       ) : (
//                         <>
//                           Start Assessment
//                           <ArrowRight className="h-4 w-4 ml-2" />
//                         </>
//                       )}
//                     </button>
//                   ) : (
//                     <button 
//                       className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
//                       disabled
//                     >
//                       <Lock className="h-4 w-4 mr-2" />
//                       Upgrade Required
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-12 text-center">
//           <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
//             <h3 className="text-lg font-semibold text-blue-900 mb-2">
//               Need Additional Frameworks?
//             </h3>
//             <p className="text-blue-700 mb-4">
//               Contact our sales team to unlock premium compliance frameworks and advanced features.
//             </p>
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//               Contact Sales
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FrameworkSelectionPage;