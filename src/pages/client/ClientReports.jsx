import React, { useState } from 'react';
import { BarChart3, Download, FileText, TrendingUp, CheckCircle, AlertCircle, Eye, Search, Share } from 'lucide-react';

const ClientReports = ({ user }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock report data with enhanced information
  const reports = [
    {
      id: 1,
      name: 'CMMC 2.0 Compliance Report',
      framework: 'CMMC 2.0',
      status: 'Completed',
      completionDate: '2024-01-15',
      score: 85,
      totalControls: 110,
      compliantControls: 94,
      findings: 16,
      criticalFindings: 2,
      highFindings: 5,
      mediumFindings: 9,
      description: 'Comprehensive assessment of CMMC 2.0 Level 2 requirements',
      generatedBy: 'System',
      reportType: 'Full Assessment',
      nextReview: '2024-04-15'
    },
    {
      id: 2,
      name: 'ISO 27001 Assessment Report',
      framework: 'ISO 27001',
      status: 'In Progress',
      completionDate: null,
      score: 72,
      totalControls: 114,
      compliantControls: 82,
      findings: 32,
      criticalFindings: 1,
      highFindings: 8,
      mediumFindings: 23,
      description: 'Information Security Management System assessment',
      generatedBy: 'Sarah Johnson',
      reportType: 'Interim Report',
      nextReview: '2024-02-28'
    },
    {
      id: 3,
      name: 'Quarterly Compliance Summary',
      framework: 'Multiple',
      status: 'Completed',
      completionDate: '2024-01-01',
      score: 78,
      totalControls: 224,
      compliantControls: 175,
      findings: 49,
      criticalFindings: 3,
      highFindings: 12,
      mediumFindings: 34,
      description: 'Summary of all active compliance frameworks',
      generatedBy: 'System',
      reportType: 'Executive Summary',
      nextReview: '2024-04-01'
    },
    {
      id: 4,
      name: 'GDPR Compliance Assessment',
      framework: 'GDPR',
      status: 'Draft',
      completionDate: null,
      score: 65,
      totalControls: 100,
      compliantControls: 65,
      findings: 35,
      criticalFindings: 4,
      highFindings: 10,
      mediumFindings: 21,
      description: 'Data protection and privacy compliance assessment',
      generatedBy: 'Mike Wilson',
      reportType: 'Draft Report',
      nextReview: '2024-03-15'
    }
  ];

  const handleDownloadReport = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleShareReport = (reportId) => {
    console.log('Sharing report:', reportId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (criticalFindings, highFindings) => {
    if (criticalFindings > 0) return { level: 'High', color: 'text-red-600' };
    if (highFindings > 5) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-green-600' };
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.framework.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (selectedReport) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 inline-flex items-center"
              >
                ← Back to Reports
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {selectedReport.name}
              </h1>
              <p className="text-gray-600 text-base lg:text-lg">{selectedReport.description}</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <button
                onClick={() => handleShareReport(selectedReport.id)}
                className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={() => handleDownloadReport(selectedReport.id)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className={`text-3xl font-bold mt-1 ${getScoreColor(selectedReport.score)}`}>
                  {selectedReport.score}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Controls</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{selectedReport.totalControls}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliant</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{selectedReport.compliantControls}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Findings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{selectedReport.findings}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Findings Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Findings Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-red-50 rounded-lg mb-3">
                  <p className="text-2xl font-bold text-red-600">{selectedReport.criticalFindings}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">Critical</p>
                <p className="text-xs text-gray-500">Immediate attention required</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-yellow-50 rounded-lg mb-3">
                  <p className="text-2xl font-bold text-yellow-600">{selectedReport.highFindings}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">High</p>
                <p className="text-xs text-gray-500">Address within 30 days</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-lg mb-3">
                  <p className="text-2xl font-bold text-blue-600">{selectedReport.mediumFindings}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">Medium</p>
                <p className="text-xs text-gray-500">Address within 90 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Report Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Report Details</h3>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Executive Summary</h4>
              <p className="text-gray-600 mb-6">
                This report provides a comprehensive assessment of {selectedReport.framework} compliance 
                for {user.organizationName}. The assessment was conducted based on the latest framework 
                requirements and industry best practices.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Findings</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Overall compliance score of {selectedReport.score}%</li>
                <li>{selectedReport.compliantControls} out of {selectedReport.totalControls} controls are fully compliant</li>
                <li>{selectedReport.findings} findings require attention</li>
                <li>Risk level: {getRiskLevel(selectedReport.criticalFindings, selectedReport.highFindings).level}</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h4>
              <p className="text-gray-600 mb-6">
                Based on the assessment results, we recommend focusing on the identified gaps 
                to improve your overall compliance posture. Priority should be given to 
                critical and high-risk findings that could impact your security posture.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-3">Next Steps</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Address critical findings immediately</li>
                <li>Develop remediation plan for high-priority items</li>
                <li>Schedule follow-up assessment for {new Date(selectedReport.nextReview).toLocaleDateString()}</li>
                <li>Implement continuous monitoring processes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Compliance Reports
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">
              View and download compliance assessment reports for your organization.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Generate New Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{report.description}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Framework:</span>
                    <p className="font-medium text-gray-900">{report.framework}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Score:</span>
                    <p className={`font-medium ${getScoreColor(report.score)}`}>{report.score}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Controls:</span>
                    <p className="font-medium text-gray-900">{report.compliantControls}/{report.totalControls}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Risk Level:</span>
                    <p className={`font-medium ${getRiskLevel(report.criticalFindings, report.highFindings).color}`}>
                      {getRiskLevel(report.criticalFindings, report.highFindings).level}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      {report.completionDate ? 'Completed:' : 'Next Review:'}
                    </span>
                    <p className="font-medium text-gray-900">
                      {report.completionDate 
                        ? new Date(report.completionDate).toLocaleDateString()
                        : new Date(report.nextReview).toLocaleDateString()
                      }
                    </p>
                  </div>
                </div>

                {/* Findings Summary */}
                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">{report.criticalFindings} Critical</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">{report.highFindings} High</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">{report.mediumFindings} Medium</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleViewReport(report)}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Report
                </button>
                {report.status === 'Completed' && (
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Complete your first assessment to generate compliance reports.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientReports;