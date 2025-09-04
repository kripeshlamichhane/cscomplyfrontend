import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Upload, 
  Save, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  Info,
  MessageSquare,
  X,
  HelpCircle,
  Download
} from 'lucide-react';

const ClientAssessments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedControl, setSelectedControl] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  // Mock frameworks data
  const mockFrameworks = [
    {
      id: 'cmmc-level-1',
      name: 'CMMC Level 1',
      description: 'Cybersecurity Maturity Model Certification Level 1',
      version: 'Level 1',
      totalQuestions: 17,
      answeredQuestions: 3,
      progress: 18
    },
    {
      id: 'cmmc-level-2',
      name: 'CMMC Level 2',
      description: 'Cybersecurity Maturity Model Certification Level 2',
      version: 'Level 2',
      totalQuestions: 110,
      answeredQuestions: 72,
      progress: 65
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      version: '2022',
      totalQuestions: 95,
      answeredQuestions: 43,
      progress: 45
    }
  ];

  // Mock domains and controls data
  const mockDomainsAndControls = {
    'cmmc-level-1': [
      {
        id: 'access-control',
        name: 'Access Control',
        description: 'Limit information system access to authorized users, processes, and devices',
        totalQuestions: 5,
        answeredQuestions: 3,
        controls: [
          {
            id: '6-authorized-access-control',
            name: '6 - Authorized Access Control',
            description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, and devices.',
            totalQuestions: 5,
            answeredQuestions: 3,
            questions: [
              {
                id: 'ac-6-1',
                title: 'Are authorized users identified within the organization?',
                questionNumber: 1,
                totalInControl: 5,
                description: 'Verify that the organization has a process to identify and maintain a list of authorized users.',
                quickTip: 'Upload a user access policy and ensure it includes identification methods.',
                currentResponse: null,
                evidence: [],
                comments: 'hello'
              },
              {
                id: 'ac-6-2',
                title: 'Is access to information systems limited to authorized users?',
                questionNumber: 2,
                totalInControl: 5,
                description: 'Confirm that only authorized users can access information systems.',
                quickTip: 'Document access control mechanisms and user authentication processes.',
                currentResponse: 'NO',
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-3',
                title: 'Are user access rights reviewed regularly?',
                questionNumber: 3,
                totalInControl: 5,
                description: 'Ensure that user access rights are reviewed and updated on a regular basis.',
                quickTip: 'Provide evidence of regular access reviews and approval processes.',
                currentResponse: 'YES',
                evidence: ['Access Review Report Q1 2024.pdf'],
                comments: 'Quarterly access reviews conducted by IT security team.'
              },
              {
                id: 'ac-6-4',
                title: 'Is there a process for removing access when no longer needed?',
                questionNumber: 4,
                totalInControl: 5,
                description: 'Verify that access is promptly removed when users no longer require it.',
                quickTip: 'Document the process for access removal and provide examples.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-5',
                title: 'Are privileged accounts managed separately?',
                questionNumber: 5,
                totalInControl: 5,
                description: 'Ensure that privileged accounts have additional controls and monitoring.',
                quickTip: 'Show how privileged accounts are identified and managed differently.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      // Check if a specific framework was selected from navigation
      const selectedFrameworkId = location.state?.selectedFrameworkId || 'cmmc-level-1';
      
      const framework = mockFrameworks.find(f => f.id === selectedFrameworkId);
      if (framework) {
        setSelectedFramework(framework);
        const domains = mockDomainsAndControls[selectedFrameworkId] || [];
        if (domains.length > 0) {
          setSelectedDomain(domains[0]);
          if (domains[0].controls && domains[0].controls.length > 0) {
            setSelectedControl(domains[0].controls[0]);
            setCurrentQuestionIndex(0);
          }
        }
      }
      
      setLoading(false);
    }, 500);
  }, [location.state]);

  const handleResponseChange = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleCommentsChange = (questionId, comment) => {
    setComments(prev => ({
      ...prev,
      [questionId]: comment
    }));
  };

  const handleSaveResponse = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const getCurrentQuestion = () => {
    if (!selectedControl || !selectedControl.questions) return null;
    return selectedControl.questions[currentQuestionIndex];
  };

  const getFrameworkProgress = () => {
    if (!selectedFramework) return 0;
    return Math.round((selectedFramework.answeredQuestions / selectedFramework.totalQuestions) * 100);
  };

  const getControlProgress = () => {
    if (!selectedControl) return 0;
    return Math.round((selectedControl.answeredQuestions / selectedControl.totalQuestions) * 100);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const currentResponse = responses[currentQuestion?.id] || currentQuestion?.currentResponse;
  const currentComments = comments[currentQuestion?.id] || currentQuestion?.comments || '';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Framework Dropdown */}
            <div className="relative">
              <select 
                value={selectedFramework?.id || ''}
                onChange={(e) => {
                  const framework = mockFrameworks.find(f => f.id === e.target.value);
                  setSelectedFramework(framework);
                  if (framework) {
                    const domains = mockDomainsAndControls[framework.id] || [];
                    if (domains.length > 0) {
                      setSelectedDomain(domains[0]);
                      if (domains[0].controls && domains[0].controls.length > 0) {
                        setSelectedControl(domains[0].controls[0]);
                        setCurrentQuestionIndex(0);
                      }
                    }
                  }
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                {mockFrameworks.map(framework => (
                  <option key={framework.id} value={framework.id}>
                    {framework.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            {/* Domain Dropdown */}
            <div className="relative">
              <select 
                value={selectedDomain?.id || ''}
                onChange={(e) => {
                  const domain = mockDomainsAndControls[selectedFramework.id]?.find(d => d.id === e.target.value);
                  setSelectedDomain(domain);
                  if (domain && domain.controls && domain.controls.length > 0) {
                    setSelectedControl(domain.controls[0]);
                    setCurrentQuestionIndex(0);
                  }
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                {mockDomainsAndControls[selectedFramework?.id]?.map(domain => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                )) || []}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            {/* Control Dropdown */}
            <div className="relative">
              <select 
                value={selectedControl?.id || ''}
                onChange={(e) => {
                  const control = selectedDomain?.controls?.find(c => c.id === e.target.value);
                  setSelectedControl(control);
                  setCurrentQuestionIndex(0);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
              >
                {selectedDomain?.controls?.map(control => (
                  <option key={control.id} value={control.id}>
                    {control.name}
                  </option>
                )) || []}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Help Button */}
            <div className="ml-auto flex items-center space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </button>
              <div className="text-sm text-gray-600">
                {getFrameworkProgress()}% Complete
              </div>
            </div>
          </div>

          {/* Framework Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Framework Progress</span>
              <span className="text-sm text-blue-600">
                {selectedFramework?.answeredQuestions || 0} / {selectedFramework?.totalQuestions || 0} questions ({getFrameworkProgress()}% Complete)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getFrameworkProgress()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Assessment Content */}
        <div className="flex-1 flex">
          {/* Question Content */}
          <div className="flex-1 p-6">
            {currentQuestion ? (
              <div className="max-w-4xl">
                {/* Control Header */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{selectedControl.name}</h2>
                    <div className="text-sm text-blue-600">
                      {selectedControl.answeredQuestions} / {selectedControl.totalQuestions} answered
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedControl.description}</p>
                  
                  {/* Control Progress */}
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getControlProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{currentQuestion.questionNumber}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentQuestion.title}</h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      Question {currentQuestion.questionNumber} of {selectedControl.totalQuestions} in {selectedControl.name.split(' - ')[1]}
                    </div>
                  </div>

                  {/* Quick Tip */}
                  {currentQuestion.quickTip && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Quick Tip:</p>
                          <p className="text-sm text-blue-800">{currentQuestion.quickTip}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Response Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Your Response</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {['YES', 'NO', 'PLAN', 'NOT APPLICABLE'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleResponseChange(currentQuestion.id, option)}
                          className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                            currentResponse === option
                              ? option === 'YES' 
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : option === 'NO'
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : option === 'PLAN'
                                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                : 'border-gray-500 bg-gray-50 text-gray-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                          {option === 'NO' && currentResponse === option && (
                            <div className="text-xs mt-1 opacity-75">✗</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supporting Evidence */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Supporting Evidence</h4>
                    
                    {/* Existing Evidence */}
                    {currentQuestion.evidence && currentQuestion.evidence.length > 0 && (
                      <div className="mb-4">
                        <div className="space-y-2">
                          {currentQuestion.evidence.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-gray-700">{file}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  <Download className="h-4 w-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-sm">
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Upload</p>
                      <p className="text-xs text-gray-500">Upload documents, screenshots, or other evidence (PDF, DOC, JPG, PNG)</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="hidden"
                        id={`evidence-${currentQuestion?.id}`}
                      />
                      <label
                        htmlFor={`evidence-${currentQuestion?.id}`}
                        className="cursor-pointer inline-block mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Choose Files
                      </label>
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      rows={4}
                      value={currentComments}
                      onChange={(e) => handleCommentsChange(currentQuestion.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Add any additional context or implementation details..."
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        if (currentQuestionIndex > 0) {
                          setCurrentQuestionIndex(currentQuestionIndex - 1);
                        }
                      }}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleSaveResponse}
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {saving ? 'Saving...' : 'Save'}
                      </button>

                      <button
                        onClick={() => {
                          if (currentQuestionIndex < selectedControl.questions.length - 1) {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                          }
                        }}
                        disabled={currentQuestionIndex === selectedControl.questions.length - 1}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Available</h3>
                  <p className="text-gray-600">Select a framework and control to begin the assessment.</p>
                </div>
              </div>
            )}
          </div>

          {/* Help Panel */}
          {showHelp && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Control Help</h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Control Description */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Info className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Control Description</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedControl?.description || 'Select a control to view its description.'}
                  </p>
                </div>

                {/* Relevant Documents */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Relevant Documents</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Access Control Policy Template</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">User Account Management Guide</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Identity Management Procedures</span>
                    </div>
                  </div>
                </div>

                {/* Answering Tips */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Answering Tips</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-700">YES:</p>
                        <p className="text-gray-600">Choose when the control is fully implemented and documented with evidence.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-red-700">NO:</p>
                        <p className="text-gray-600">Choose when the control is not implemented or significantly lacking.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-700">NOT APPLICABLE:</p>
                        <p className="text-gray-600">Choose when the control doesn't apply to your organization.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-700">PLAN:</p>
                        <p className="text-gray-600">Choose when you have plans to implement but haven't started yet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAssessments;