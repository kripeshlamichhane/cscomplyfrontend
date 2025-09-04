import React, { useState } from 'react';
import { Edit, Trash2, User } from 'lucide-react';

const ClientSettings = ({ user }) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roles: []
  });

  // Mock user data matching the mockup
  const organizationUsers = [
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users and their roles in the system</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <User className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Add New User Form */}
      {showAddUser && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
          
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
              onClick={() => setShowAddUser(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add User
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
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-800 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;