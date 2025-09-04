import React, { useState, useEffect } from 'react';
import { Building, Edit, X, Shield, FileText, BarChart3, Download, Clock, CheckCircle, AlertCircle, Activity, Filter, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientHome = ({ user, onTabChange }) => {
  const navigate = useNavigate();
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState('all');
  const [frameworks, setFrameworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [frameworkProgress, setFrameworkProgress] = useState({});

  // Calculate progress for a framework
  const calculateFrameworkProgress = async (frameworkId) => {
    try {
      // Get all domains and controls for the framework
      const frameworkResponse = await axios.get(`http://localhost:8001/frameworks/${frameworkId}/domain/control`);
      const frameworkResponse = await axios.get(`http://cs-comply:8000/frameworks/${frameworkId}/domain/control`);
      const framework = frameworkResponse.data;
      
      if (!framework.domains) return { progress: 0, totalControls: 0, controlsCompleted: 0 };
      
      let totalQuestions = 0;
      let answeredQuestions = 0;
      
      // Fetch questions for all controls
      for (const domain of framework.domains) {
        if (domain.controls) {
          for (const control of domain.controls) {
            try {
              const questionsResponse = await axios.get(`http://localhost:8001/assessments/2/responses?control_id=${control.id}`);
              const questionsResponse = await axios.get(`http://cs-comply:8000/assessments/2/responses?control_id=${control.id}`);
              const questions = questionsResponse.data;
              totalQuestions += questions.length;
              answeredQuestions += questions.filter(q => q.response && q.response !== '').length;
            } catch (error) {
              console.error(`Failed to fetch questions for control ${control.id}:`, error);
            }
          }
        }
      }
      
      const progress = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
      return { progress, totalQuestions, answeredQuestions };
    } catch (error) {
      console.error('Failed to calculate framework progress:', error);
      return { progress: 0, totalQuestions: 0, answeredQuestions: 0 };
    }
  };

  // Fetch frameworks from API and calculate progress
  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/organizations/1/frameworks/');
        const response = await axios.get('http://cs-comply:8000/organizations/1/frameworks/');
        setFrameworks(response.data);
        
        // Calculate progress for each framework
        const progressData = {};
        for (const framework of response.data) {
          const progress = await calculateFrameworkProgress(framework.framework_id);
          progressData[framework.framework_id] = progress;
        }
        setFrameworkProgress(progressData);
      } catch (error) {
        console.error('Failed to fetch frameworks:', error);
        setFrameworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFrameworks();
  }, []);

  // Calculate overall progress from all frameworks
  const calculateOverallProgress = () => {
    if (Object.keys(frameworkProgress).length === 0) return 65; // Default fallback
    
    const totalProgress = Object.values(frameworkProgress).reduce((sum, progress) => sum + progress.progress, 0);
    const averageProgress = totalProgress / Object.keys(frameworkProgress).length;
    return Math.round(averageProgress);
  };

  // Mock organization data
  const organizationData = {
    name: 'TechCorp Industries',
    type: 'Client Organization',
    licenseType: 'Enterprise',
    frameworksEnabled: frameworks.length,
    userLimit: 25,
    currentUsers: 12,
    industry: 'Technology',
    establishedDate: '2019',
    complianceOfficer: 'John Smith',
    overallProgress: calculateOverallProgress()
  };

  // Transform API frameworks to match the UI structure
  const activeFrameworks = frameworks.map(framework => {
    const progress = frameworkProgress[framework.framework_id] || { progress: 0, totalQuestions: 0, answeredQuestions: 0 };
    return {
      id: framework.framework_id,
      name: framework.framework_name,
      description: framework.framework_description,
      status: framework.assessment_status || 'In Progress',
      progress: progress.progress,
      controlsCompleted: progress.answeredQuestions,
      totalControls: progress.totalQuestions,
      statusColor: framework.assessment_status === 'completed' ? 'bg-green-100 text-green-800' : 
                   framework.assessment_status === 'review' ? 'bg-yellow-100 text-yellow-800' : 
                   'bg-blue-100 text-blue-800',
      assessment_id: framework.assessment_id,
      framework_number: framework.framework_number,
      framework_version: framework.framework_version,
      assessment_started_at: framework.assessment_started_at
    };
  });

  // Documents summary
  const documentsSummary = {
    totalDocuments: 24,
    policies: 8,
    evidence: 16
  };

  // Recent reports
  const recentReports = [
    {
      id: 1,
      frameworkName: 'CMMC 2.0',
      reportName: 'Compliance Assessment Report',
      generatedDate: '2024-03-15',
      status: 'Ready'
    },
    {
      id: 2,
      frameworkName: 'ISO 27001',
      reportName: 'Gap Analysis Report',
      generatedDate: '2024-03-12',
      status: 'Ready'
    },
    {
      id: 3,
      frameworkName: 'GDPR',
      reportName: 'Privacy Impact Assessment',
      generatedDate: '2024-03-10',
      status: 'Draft'
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      category: 'Assessments',
      title: 'CMMC 2.0 Assessment Updated',
      description: 'Access Control domain - 3 questions completed',
      time: '2 hours ago',
      user: 'John Smith',
      status: 'active'
    },
    {
      id: 2,
      category: 'Documents',
      title: 'Policy Document Uploaded',
      description: 'Information Security Policy v2.1 linked to AC-1',
      time: '1 day ago',
      user: 'Sarah Johnson',
      status: 'completed'
    },
    {
      id: 3,
      category: 'Reports',
      title: 'ISO 27001 Report Generated',
      description: 'Compliance report ready for download',
      time: '3 days ago',
      user: 'System',
      status: 'completed'
    },
    {
      id: 4,
      category: 'Assessments',
      title: 'Control Review Required',
      description: 'IA-2 requires management review',
      time: '5 days ago',
      user: 'Mike Wilson',
      status: 'pending'
    }
  ];

  const filteredActivity = activityFilter === 'all' 
    ? recentActivity 
    : recentActivity.filter(activity => activity.category.toLowerCase() === activityFilter);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Section 1: Organization Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {organizationData.name}
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">License:</span>
                  <p className="font-medium text-gray-900">{organizationData.licenseType}</p>
                </div>
                <div>
                  <span className="text-gray-500">Frameworks:</span>
                  <p className="font-medium text-gray-900">{organizationData.frameworksEnabled} Enabled</p>
                </div>
                <div>
                  <span className="text-gray-500">Users:</span>
                  <p className="font-medium text-gray-900">{organizationData.currentUsers}/{organizationData.userLimit}</p>
                </div>
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <p className="font-medium text-gray-900">{organizationData.industry}</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium text-blue-600">{organizationData.overallProgress}%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <button
              onClick={() => setShowOrgModal(true)}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <Edit className="h-4 w-4 mr-2" />
              View/Edit Organization
            </button>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray={`${organizationData.overallProgress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">{organizationData.overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Active Frameworks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Active Frameworks
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading frameworks...</p>
                </div>
              </div>
            ) : activeFrameworks.length > 0 ? (
              activeFrameworks.map((framework) => (
                <div 
                  key={framework.id} 
                  className="border border-gray-200 rounded-lg p-8 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => onTabChange('assessments')}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{framework.name}</h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{framework.description}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      Version: {framework.framework_version} • Started: {framework.assessment_started_at ? new Date(framework.assessment_started_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${framework.statusColor}`}>
                      {framework.status}
                    </span>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{framework.progress}%</p>
                      <p className="text-sm text-gray-500">{framework.controlsCompleted}/{framework.totalControls} questions</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${framework.progress}%` }}
                      />
                    </div>
                  </div>
                  
                                     <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       navigate('/assessments', { state: { selectedFrameworkId: framework.id } });
                     }}
                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                   >
                     Continue Assessment
                   </button>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Frameworks</h3>
                <p className="text-gray-600 mb-4">You don't have any active frameworks yet.</p>
                                 <button 
                   onClick={() => navigate('/frameworks')}
                   className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                 >
                   Browse Available Frameworks
                 </button>
              </div>
            )}
          </div>
          
                     <div className="mt-8 text-center">
             <button 
               onClick={() => navigate('/frameworks')}
               className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mx-auto"
             >
               View All Frameworks
               <ArrowRight className="h-4 w-4 ml-1" />
             </button>
           </div>
        </div>
      </div>

      {/* Section 3: Documents Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Documents Summary
            </h3>
            <button 
              onClick={() => onTabChange('documents')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-2">{documentsSummary.totalDocuments}</p>
              <p className="text-sm font-medium text-gray-700">Total Documents</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600 mb-2">{documentsSummary.policies}</p>
              <p className="text-sm font-medium text-gray-700">Policies</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 mb-2">{documentsSummary.evidence}</p>
              <p className="text-sm font-medium text-gray-700">Evidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Recent Reports
            </h3>
            <button 
              onClick={() => onTabChange('reports')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{report.reportName}</p>
                  <p className="text-sm text-gray-600">{report.frameworkName}</p>
                  <p className="text-xs text-gray-500">{new Date(report.generatedDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'Ready' && (
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="documents">Documents</option>
                <option value="assessments">Assessments</option>
                <option value="reports">Reports</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.status === 'active' ? 'bg-blue-100' : 
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'pending' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  {activity.status === 'active' ? (
                    <Clock className="h-4 w-4 text-blue-600" />
                  ) : activity.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : activity.status === 'pending' ? (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-blue-600">{activity.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Organization Details</h2>
              <button
                onClick={() => setShowOrgModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                  <input
                    type="text"
                    defaultValue={organizationData.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                  <input
                    type="text"
                    defaultValue={organizationData.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    defaultValue={organizationData.industry}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Established</label>
                  <input
                    type="text"
                    defaultValue={organizationData.establishedDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
                  <select
                    defaultValue={organizationData.licenseType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Limit</label>
                  <input
                    type="number"
                    defaultValue={organizationData.userLimit}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Officer</label>
                  <input
                    type="text"
                    defaultValue={organizationData.complianceOfficer}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Users</label>
                  <input
                    type="number"
                    defaultValue={organizationData.currentUsers}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowOrgModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowOrgModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientHome;