import React, { useState } from 'react';
import { FileText, Download, Filter, Eye, Edit, Trash2, User, Search, Upload, Plus } from 'lucide-react';

const ClientDocuments = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock documents data
  const mockDocuments = [
    {
      id: 1,
      name: 'Information Security Policy',
      type: 'Policy',
      category: 'policies',
      uploadedBy: 'John Smith',
      uploadDate: '2024-03-15',
      version: 'v2.1',
      size: '2.3 MB',
      format: 'PDF',
      linkedControls: ['AC-1', 'IA-1', 'SC-1'],
      status: 'Approved',
      tags: ['policy', 'security', 'approved']
    },
    {
      id: 2,
      name: 'Network Architecture Diagram',
      type: 'Evidence',
      category: 'evidence',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-03-14',
      version: 'v1.0',
      size: '5.7 MB',
      format: 'PDF',
      linkedControls: ['SC-7', 'AC-4'],
      status: 'Under Review',
      tags: ['network', 'architecture', 'diagram']
    },
    {
      id: 3,
      name: 'User Access Control Matrix',
      type: 'Evidence',
      category: 'evidence',
      uploadedBy: 'Mike Wilson',
      uploadDate: '2024-03-12',
      version: 'v1.5',
      size: '1.2 MB',
      format: 'Excel',
      linkedControls: ['AC-2', 'AC-3', 'AC-5'],
      status: 'Approved',
      tags: ['access-control', 'users', 'matrix']
    },
    {
      id: 4,
      name: 'Incident Response Plan',
      type: 'Policy',
      category: 'policies',
      uploadedBy: 'John Smith',
      uploadDate: '2024-03-10',
      version: 'v3.0',
      size: '4.1 MB',
      format: 'PDF',
      linkedControls: ['IR-1', 'IR-4', 'IR-8'],
      status: 'Approved',
      tags: ['incident', 'response', 'plan']
    },
    {
      id: 5,
      name: 'Backup and Recovery Procedures',
      type: 'Document',
      category: 'documents',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-03-08',
      version: 'v2.0',
      size: '3.5 MB',
      format: 'PDF',
      linkedControls: ['CP-9', 'CP-10'],
      status: 'Draft',
      tags: ['backup', 'recovery', 'procedures']
    }
  ];

  // Mock system templates
  const systemTemplates = [
    {
      id: 'template-1',
      name: 'Access Control Matrix Template',
      description: 'Standard template for documenting user access permissions',
      category: 'templates',
      type: 'Template',
      tags: ['template', 'access-control', 'permissions'],
      downloadUrl: '#'
    },
    {
      id: 'template-2',
      name: 'Network Architecture Diagram Template',
      description: 'Template for documenting network infrastructure',
      category: 'templates',
      type: 'Template',
      tags: ['template', 'network', 'infrastructure'],
      downloadUrl: '#'
    },
    {
      id: 'template-3',
      name: 'Organization Chart Template',
      description: 'Template for documenting organizational structure',
      category: 'templates',
      type: 'Template',
      tags: ['template', 'organization', 'structure'],
      downloadUrl: '#'
    }
  ];

  const handleFileUpload = (files) => {
    console.log('Uploading files:', files);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Policy':
        return '📋';
      case 'Evidence':
        return '📄';
      case 'Template':
        return '📝';
      default:
        return '📄';
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesTab = activeTab === 'documents' || doc.category === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const getTabData = (tabName) => {
    if (tabName === 'templates') return systemTemplates;
    return mockDocuments.filter(doc => doc.category === tabName);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Documents & Evidence</h1>
            <p className="text-gray-600 text-base lg:text-lg">Manage compliance documents, policies, and assessment evidence</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
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
              className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </label>
            <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="documents">Documents</option>
                <option value="policies">Policies</option>
                <option value="evidence">Evidence</option>
                <option value="templates">Templates</option>
              </select>
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>All Documents ({mockDocuments.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'policies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>📋</span>
              <span>Policies ({mockDocuments.filter(d => d.category === 'policies').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'evidence'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>📄</span>
              <span>Evidence ({mockDocuments.filter(d => d.category === 'evidence').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>📝</span>
              <span>Templates ({systemTemplates.length})</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'templates' ? (
            /* System Templates */
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {systemTemplates.map((template) => (
                <div key={template.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-lg">{getTypeIcon(template.type)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* User Documents */
            <div className="space-y-6">
              {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredDocuments.map((document) => (
                    <div key={document.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-lg">{getTypeIcon(document.type)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{document.name}</h3>
                            <p className="text-sm text-gray-500">
                              {document.uploadedBy} • {new Date(document.uploadDate).toLocaleDateString()} • {document.version}
                            </p>
                            <p className="text-xs text-gray-400">{document.size} • {document.format}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                            {document.status}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Linked Controls */}
                      {document.linkedControls && document.linkedControls.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Linked Controls:</p>
                          <div className="flex flex-wrap gap-1">
                            {document.linkedControls.map((control, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                {control}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Upload your first document to get started.'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDocuments;

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