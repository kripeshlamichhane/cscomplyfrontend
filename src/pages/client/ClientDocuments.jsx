import React, { useState } from 'react';
import { FileText, Download, Filter, Eye, Edit, Trash2, User, Search } from 'lucide-react';

const ClientDocuments = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (files) => {
    console.log('Uploading files:', files);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents & Evidence</h1>
            <p className="text-gray-600">Manage compliance documents, policies, and assessment evidence</p>
          </div>
          <div>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              📤 Upload File
            </label>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Documents</option>
              <option>Policies</option>
              <option>Evidence</option>
            </select>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center space-x-2">
              <span>📋</span>
              <span>Policies</span>
            </button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center space-x-2">
              <span>📄</span>
              <span>Evidence</span>
            </button>
          </nav>
        </div>
      </div>

      {/* System Documents Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">System Documents</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Access Control Matrix Template</h3>
                  <p className="text-sm text-gray-500">Standard template for documenting user access permissions</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">template</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">access-control</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">permissions</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">🌐</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Network Architecture Diagram Template</h3>
                  <p className="text-sm text-gray-500">Template for documenting network infrastructure</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">template</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">network</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">infrastructure</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Organization Chart Template</h3>
                  <p className="text-sm text-gray-500">Template for documenting organizational structure</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">template</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">organization</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">structure</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Documents Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <User className="h-3 w-3 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">User Documents</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">IT Department Access Matrix</h3>
                  <p className="text-sm text-gray-500">John Smith • 3/15/2024 • v1.2</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">it-department</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">access-control</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">current</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">🌐</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Production Network Diagram</h3>
                  <p className="text-sm text-gray-500">John Smith • 3/14/2024 • v2.1</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">production</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">network</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDocuments;