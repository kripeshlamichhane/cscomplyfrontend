import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, ArrowRight, Info, Clock, Shield } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientFrameworks = ({ user, onTabChange }) => {
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch frameworks from API
  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/organizations/1/frameworks/');
        setFrameworks(response.data);
      } catch (error) {
        console.error('Failed to fetch frameworks:', error);
        setFrameworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFrameworks();
  }, []);

  // Mock available frameworks (this would come from a different API endpoint)
  const availableFrameworks = [
    {
      id: 'nist-csf',
      name: 'NIST Cybersecurity Framework',
      description: 'Framework for improving critical infrastructure cybersecurity',
      status: 'Requires License',
      level: 'Core Implementation',
      estimatedTime: '6-8 weeks',
      progress: 0,
      totalControls: 108,
      compliantControls: 0,
      category: 'Cybersecurity',
      licenseRequired: true,
      available: false,
      buttonText: 'Upgrade Required',
      buttonAction: null
    },
    {
      id: 'sox',
      name: 'SOX Compliance',
      description: 'Sarbanes-Oxley Act compliance for financial reporting',
      status: 'Requires License',
      level: 'Section 404',
      estimatedTime: '10-14 weeks',
      progress: 0,
      totalControls: 95,
      compliantControls: 0,
      category: 'Financial',
      licenseRequired: true,
      available: false,
      buttonText: 'Upgrade Required',
      buttonAction: null
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act compliance',
      status: 'Requires License',
      level: 'Security Rule',
      estimatedTime: '6-10 weeks',
      progress: 0,
      totalControls: 78,
      compliantControls: 0,
      category: 'Healthcare',
      licenseRequired: true,
      available: false,
      buttonText: 'Upgrade Required',
      buttonAction: null
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation for data privacy',
      status: 'Available',
      level: 'Full Compliance',
      estimatedTime: '8-12 weeks',
      progress: 0,
      totalControls: 100,
      compliantControls: 0,
      category: 'Privacy',
      licenseRequired: false,
      available: true,
      buttonText: 'Start Assessment',
      buttonAction: () => navigate('/assessments')
    }
  ];

  // Transform API frameworks to match the UI structure
  const apiAvailableFrameworks = frameworks.map(framework => ({
    id: framework.framework_id,
    name: framework.framework_name,
    description: framework.framework_description,
    status: 'Available',
    level: framework.framework_version || '1.0',
    estimatedTime: '4-6 weeks',
    progress: 0,
    totalControls: 0,
    compliantControls: 0,
    category: 'Cybersecurity',
    licenseRequired: false,
    available: true,
    buttonText: 'Continue Assessment',
    buttonAction: () => navigate('/assessments', { state: { selectedFrameworkId: framework.framework_id } }),
    assessment_id: framework.assessment_id,
    framework_number: framework.framework_number,
    framework_version: framework.framework_version,
    assessment_started_at: framework.assessment_started_at
  }));

  // Combine API-provided available frameworks with mock ones
  const combinedAvailableFrameworks = [...apiAvailableFrameworks, ...availableFrameworks];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Available':
        return 'bg-yellow-100 text-yellow-800';
      case 'Requires License':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (framework) => {
    if (framework.status === 'Completed' || framework.status === 'In Progress' || framework.status === 'Available') {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
    return <Lock className="h-6 w-6 text-gray-400" />;
  };

  const handleFrameworkClick = (framework) => {
    if (framework.available && framework.buttonAction) {
      framework.buttonAction();
    }
  };

  const renderFrameworkCard = (framework) => (
    <div
      key={framework.id}
      className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
        framework.available
          ? 'hover:border-blue-300 cursor-pointer'
          : 'opacity-75'
      } border-gray-200`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              framework.available ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {getStatusIcon(framework)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {framework.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                {framework.status}
              </span>
            </div>
          </div>
          {framework.licenseRequired && (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {framework.description}
        </p>

        {/* Additional info for active frameworks */}
        {framework.assessment_started_at && (
          <div className="text-xs text-gray-500 mb-4">
            Started: {new Date(framework.assessment_started_at).toLocaleDateString()}
          </div>
        )}

        {/* Progress Bar (for active frameworks) */}
        {framework.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{framework.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${framework.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Info className="h-4 w-4 mr-2" />
            <span className="font-medium">Level:</span>
            <span className="ml-1">{framework.level}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span className="font-medium">Est. Time:</span>
            <span className="ml-1">{framework.estimatedTime}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => handleFrameworkClick(framework)}
            disabled={!framework.available}
            className={`w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              framework.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
          >
            {framework.available ? (
              <>
                {framework.buttonText}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                {framework.buttonText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Available Frameworks
          </h1>
          <p className="text-gray-600">
            Select a compliance framework to begin or continue your assessment. Free frameworks are available immediately, 
            while premium frameworks require a license upgrade.
          </p>
        </div>
      </div>

      {/* Available Frameworks Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading frameworks...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {combinedAvailableFrameworks.map(renderFrameworkCard)}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">
            Need Additional Frameworks?
          </h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Contact our sales team to unlock premium compliance frameworks and advanced features.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientFrameworks;