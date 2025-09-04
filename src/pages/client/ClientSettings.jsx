import React, { useState } from 'react';
import { Edit, Trash2, User } from 'lucide-react';

const ClientSettings = ({ user }) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roles: []
  });
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize mock user data
  useEffect(() => {
    setTimeout(() => {
      setOrganizationUsers([
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@techcorp.com',
          roles: ['Admin', 'Assessor', 'Implementer', 'Associate'],
          status: 'Active',
          lastLogin: '3/15/2024',
          joinDate: '1/15/2024',
          avatar: null
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          roles: ['Assessor', 'Implementer', 'Associate'],
          status: 'Active',
          lastLogin: '3/14/2024',
          joinDate: '2/1/2024',
          avatar: null
        },
        {
          id: 3,
          name: 'Mike Wilson',
          email: 'mike.wilson@techcorp.com',
          roles: ['Implementer', 'Associate'],
          status: 'Active',
          lastLogin: '3/13/2024',
          joinDate: '2/15/2024',
          avatar: null
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily.davis@techcorp.com',
          roles: ['Associate'],
          status: 'Inactive',
          lastLogin: '2/28/2024',
          joinDate: '1/20/2024',
          avatar: null
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Mock organization settings
  const organizationSettings = {
    name: 'TechCorp Industries',
    industry: 'Technology',
    size: '100-500 employees',
    licenseType: 'Enterprise',
    maxUsers: 25,
    currentUsers: organizationUsers.length,
    complianceOfficer: 'John Smith',
    establishedDate: '2019',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.com'
  };

  // Original mock data for reference
  const originalMockUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      roles: ['Admin', 'Assessor', 'Implementer', 'Associate'],
      status: 'Active',
      lastLogin: '3/15/2024',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      roles: ['Admin', 'Assessor', 'Implementer', 'Associate'],
      status: 'Active',
      lastLogin: '3/14/2024',
      avatar: null
    }
  ];

  const availableRoles = ['Admin', 'Assessor', 'Implementer', 'Associate'];

  const handleRoleToggle = (role) => {
    setNewUser(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    const newUserId = Math.max(...organizationUsers.map(u => u.id)) + 1;
    const userToAdd = {
      ...newUser,
      id: newUserId,
      status: 'Active',
      lastLogin: 'Never',
      joinDate: new Date().toLocaleDateString(),
      avatar: null
    };
    setOrganizationUsers(prev => [...prev, userToAdd]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', roles: [] });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      roles: [...user.roles]
    });
    setShowAddUser(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setOrganizationUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setOrganizationUsers(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, name: newUser.name, email: newUser.email, roles: newUser.roles }
          : u
      ));
      setEditingUser(null);
    } else {
      handleAddUser();
    }
    setShowAddUser(false);
    setNewUser({ name: '', email: '', roles: [] });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-gray-100 text-gray-800';
      case 'Assessor':
        return 'bg-blue-100 text-blue-800';
      case 'Implementer':
        return 'bg-blue-100 text-blue-800';
      case 'Associate':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage users and their roles in the system</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Users</p>
              <p className="text-lg font-semibold text-gray-900">
                {organizationSettings.currentUsers}/{organizationSettings.maxUsers}
              </p>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <User className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Organization Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <p className="text-gray-900">{organizationSettings.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <p className="text-gray-900">{organizationSettings.industry}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <p className="text-gray-900">{organizationSettings.size}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
              <p className="text-gray-900">{organizationSettings.licenseType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Officer</label>
              <p className="text-gray-900">{organizationSettings.complianceOfficer}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
              <p className="text-gray-900">{organizationSettings.establishedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit User Form */}
      {showAddUser && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Roles</label>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    newUser.roles.includes(role)
                      ? role === 'Associate' 
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setShowAddUser(false);
                setEditingUser(null);
                setNewUser({ name: '', email: '', roles: [] });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">USER</div>
            <div className="col-span-3">ROLES</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">LAST LOGIN</div>
            <div className="col-span-2">ACTIONS</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {organizationUsers.map((orgUser) => (
            <div key={orgUser.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* User Info */}
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{orgUser.name}</div>
                    <div className="text-sm text-gray-500">{orgUser.email}</div>
                  </div>
                </div>

                {/* Roles */}
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-1">
                    {orgUser.roles.map((role, index) => (
                      <span
                        key={index}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {orgUser.status}
                  </span>
                </div>

                {/* Last Login */}
                <div className="col-span-2 text-sm text-gray-900">
                  {orgUser.lastLogin}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center space-x-2">
                  <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                  <button 
                    onClick={() => handleEditUser(orgUser)}
                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(orgUser.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{organizationUsers.filter(u => u.status === 'Active').length}</p>
            <p className="text-sm font-medium text-gray-700">Active Users</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{organizationUsers.filter(u => u.roles.includes('Admin')).length}</p>
            <p className="text-sm font-medium text-gray-700">Administrators</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{organizationUsers.filter(u => u.roles.includes('Assessor')).length}</p>
            <p className="text-sm font-medium text-gray-700">Assessors</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{organizationUsers.filter(u => u.roles.includes('Implementer')).length}</p>
            <p className="text-sm font-medium text-gray-700">Implementers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;