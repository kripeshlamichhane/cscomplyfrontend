import React, { useState, useEffect } from 'react';
import { Shield, Home, Settings, BarChart3, FolderOpen, Bell, User, ChevronDown, ChevronLeft } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ClientDashboard = ({ onLogout }) => {
  const user = {
        id: '2',
        email: "johnsmith@gmail.com",
        name: 'John Smith',
        role: 'client',
        organizationName: 'TechCorp Industries',
        organizationType: 'Client'
      };
  const [activeTab, setActiveTab] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Sync active tab with current route; map /assessments to frameworks
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/frameworks') || path.startsWith('/assessments')) {
      setActiveTab('frameworks');
    } else if (path === '/' || (path.startsWith('/settings') === false && path.startsWith('/documents') === false && path.startsWith('/reports') === false)) {
      setActiveTab('home');
    } else if (path.startsWith('/documents')) {
      setActiveTab('documents');
    } else if (path.startsWith('/reports')) {
      setActiveTab('reports');
    } else if (path.startsWith('/settings')) {
      setActiveTab('settings');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-56'} bg-white shadow-sm border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-full z-10`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-lg font-bold text-gray-900">ComplianceHub</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`h-5 w-5 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {/* Dashboard */}
            <Link
              to="/"
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Dashboard" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <Home className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </div>
            </Link>

            {/* Assessments link hidden intentionally; functionality accessible via Continue Assessment buttons */}

            <Link
              to="/frameworks"
              onClick={() => setActiveTab('frameworks')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'frameworks'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Frameworks" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <Shield className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Frameworks</span>}
              </div>
            </Link>

            <Link
              to="/documents"
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Documents" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <FolderOpen className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Documents</span>}
              </div>
            </Link>

            <Link
              to="/reports"
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'reports'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Reports" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <BarChart3 className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Reports</span>}
              </div>
            </Link>

            <Link
              to="/"
              onClick={() => setActiveTab('user-management')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'user-management'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Users" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <User className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Users</span>}
              </div>
            </Link>

            <Link
              to="/settings"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? "Settings" : ""}
            >
              <div className={`${sidebarCollapsed ? 'flex justify-center w-full' : 'flex items-center'}`}>
                <Settings className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'}`} />
                {!sidebarCollapsed && <span className="ml-3">Settings</span>}
              </div>
            </Link>
          </div>
        </nav>

        {/* Fixed User Section at Bottom */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {sidebarCollapsed ? (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <User className="h-6 w-6 text-white" />
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">Client</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </>
              )}
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && !sidebarCollapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${sidebarCollapsed ? 'ml-16' : 'ml-56'} transition-all duration-300`}>
        {/* Top Header - Fixed */}
        <header className={`bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 sticky top-0 z-50`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'home' ? 'Dashboard' :
                 activeTab === 'documents' ? 'Documents & Evidence' :
                 activeTab === 'user-management' ? 'User Management' :
                 activeTab === 'reports' ? 'Reports' :
                 activeTab === 'frameworks' ? 'Frameworks' :
                 'Settings'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Role Display */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Client</span>
              </div>
              
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;