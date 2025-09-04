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
  MessageSquare
} from 'lucide-react';

const ClientAssessments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [currentDomain, setCurrentDomain] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mock frameworks data
  const mockFrameworks = [
    {
      id: 'cmmc-2.0',
      name: 'CMMC 2.0',
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
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      version: '2018',
      totalQuestions: 78,
      answeredQuestions: 78,
      progress: 100
    }
  ];

  // Mock domains and questions data
  const mockDomainsAndQuestions = {
    'cmmc-2.0': [
      {
        id: 'access-control',
        name: 'Access Control (AC)',
        description: 'Limit information system access to authorized users, processes, and devices',
        totalQuestions: 22,
        answeredQuestions: 15,
        questions: [
          {
            id: 'ac-1',
            title: 'AC-1: Access Control Policy and Procedures',
            description: 'Develop, document, and disseminate access control policy and procedures.',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: 'Fully Implemented',
            evidence: ['Access Control Policy v2.1.pdf'],
            comments: 'Policy has been updated and approved by management.'
          },
          {
            id: 'ac-2',
            title: 'AC-2: Account Management',
            description: 'Manage information system accounts including establishing, activating, modifying, disabling, and removing accounts.',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: 'Partially Implemented',
            evidence: ['User Account Procedures.docx'],
            comments: 'Account management procedures exist but need automation improvements.'
          },
          {
            id: 'ac-3',
            title: 'AC-3: Access Enforcement',
            description: 'Enforce approved authorizations for logical access to information and system resources.',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: null,
            evidence: [],
            comments: ''
          }
        ]
      },
      {
        id: 'identification-authentication',
        name: 'Identification and Authentication (IA)',
        description: 'Identify information system users, processes, and devices',
        totalQuestions: 18,
        answeredQuestions: 12,
        questions: [
          {
            id: 'ia-1',
            title: 'IA-1: Identification and Authentication Policy and Procedures',
            description: 'Develop, document, and disseminate identification and authentication policy and procedures.',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: 'Fully Implemented',
            evidence: ['IA Policy v1.3.pdf'],
            comments: 'Comprehensive policy covering all authentication requirements.'
          }
        ]
      }
    ],
    'iso-27001': [
      {
        id: 'information-security-policies',
        name: 'Information Security Policies (A.5)',
        description: 'Management direction and support for information security',
        totalQuestions: 15,
        answeredQuestions: 8,
        questions: [
          {
            id: 'a5-1-1',
            title: 'A.5.1.1: Policies for Information Security',
            description: 'Information security policy should be defined, approved by management, published and communicated.',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: 'Fully Implemented',
            evidence: ['Information Security Policy.pdf'],
            comments: 'Policy approved by board and communicated to all staff.'
          }
        ]
      }
    ],
    'gdpr': [
      {
        id: 'lawfulness-processing',
        name: 'Lawfulness of Processing (Art. 6)',
        description: 'Legal basis for processing personal data',
        totalQuestions: 12,
        answeredQuestions: 12,
        questions: [
          {
            id: 'art6-1',
            title: 'Article 6.1: Legal Basis for Processing',
            description: 'Ensure processing is lawful under at least one of the conditions in Article 6(1).',
            requiresEvidence: true,
            responseType: 'multiple_choice',
            options: ['Fully Implemented', 'Partially Implemented', 'Planned', 'Not Implemented'],
            currentResponse: 'Fully Implemented',
            evidence: ['Legal Basis Assessment.pdf'],
            comments: 'All processing activities have documented legal basis.'
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // Check if a specific framework was selected from navigation
      const selectedFrameworkId = location.state?.selectedFrameworkId;
      
      if (selectedFrameworkId) {
        const framework = mockFrameworks.find(f => f.id === selectedFrameworkId);
        if (framework) {
          setSelectedFramework(framework);
          const domains = mockDomainsAndQuestions[selectedFrameworkId] || [];
          if (domains.length > 0) {
            setCurrentDomain(domains[0]);
          }
        }
      }
      
      setLoading(false);
    }, 1000);
  }, [location.state]);

  const handleFrameworkSelect = (framework) => {
    setSelectedFramework(framework);
    const domains = mockDomainsAndQuestions[framework.id] || [];
    if (domains.length > 0) {
      setCurrentDomain(domains[0]);
      setCurrentQuestion(0);
    }
  };

  const handleDomainSelect = (domain) => {
    setCurrentDomain(domain);
    setCurrentQuestion(0);
  };

  const handleResponseChange = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleSaveResponse = async () => {
    setSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleNextQuestion = () => {
    if (currentDomain && currentQuestion < currentDomain.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getCurrentQuestion = () => {
    if (!currentDomain || !currentDomain.questions) return null;
    return currentDomain.questions[currentQuestion];
  };

  const getResponseStatus = (question) => {
    const response = responses[question.id] || question.currentResponse;
    if (!response) return 'unanswered';
    if (response === 'Fully Implemented') return 'compliant';
    if (response === 'Partially Implemented') return 'partial';
    return 'non-compliant';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'non-compliant':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
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

  // Framework selection view
  if (!selectedFramework) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Assessment Framework</h1>
          <p className="text-gray-600">Choose a framework to begin or continue your compliance assessment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockFrameworks.map((framework) => (
            <div
              key={framework.id}
              onClick={() => handleFrameworkSelect(framework)}
              className="bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{framework.description}</p>
              
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
                <p className="text-xs text-gray-500 mt-1">
                  {framework.answeredQuestions}/{framework.totalQuestions} questions completed
                </p>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Continue Assessment
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Assessment view with domains and questions
  const domains = mockDomainsAndQuestions[selectedFramework.id] || [];
  const currentQuestionData = getCurrentQuestion();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setSelectedFramework(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Frameworks
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedFramework.name} Assessment</h1>
            <p className="text-gray-600">{selectedFramework.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Progress</p>
            <p className="text-2xl font-bold text-blue-600">{selectedFramework.progress}%</p>
            <p className="text-sm text-gray-500">
              {selectedFramework.answeredQuestions}/{selectedFramework.totalQuestions} questions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Domains Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Assessment Domains</h3>
            <div className="space-y-2">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentDomain?.id === domain.id
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{domain.name}</h4>
                    <div className="text-xs text-gray-500">
                      {domain.answeredQuestions}/{domain.totalQuestions}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${(domain.answeredQuestions / domain.totalQuestions) * 100}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="lg:col-span-3">
          {currentDomain && currentQuestionData ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{currentQuestionData.title}</h2>
                    <p className="text-gray-600 mt-1">{currentQuestionData.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of {currentDomain.questions.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / currentDomain.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Response Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Response</h3>
                
                <div className="space-y-4">
                  {/* Multiple Choice Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Implementation Status</label>
                    <div className="space-y-2">
                      {currentQuestionData.options.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={`response-${currentQuestionData.id}`}
                            value={option}
                            checked={(responses[currentQuestionData.id] || currentQuestionData.currentResponse) === option}
                            onChange={(e) => handleResponseChange(currentQuestionData.id, e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments/Implementation Details
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={currentQuestionData.comments}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide details about your implementation..."
                    />
                  </div>

                  {/* Evidence Section */}
                  {currentQuestionData.requiresEvidence && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supporting Evidence
                      </label>
                      
                      {/* Existing Evidence */}
                      {currentQuestionData.evidence.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Uploaded Evidence:</p>
                          <div className="space-y-2">
                            {currentQuestionData.evidence.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm text-gray-700">{file}</span>
                                </div>
                                <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload New Evidence */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload supporting documentation</p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          id={`evidence-${currentQuestionData.id}`}
                        />
                        <label
                          htmlFor={`evidence-${currentQuestionData.id}`}
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Choose Files
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveResponse}
                      disabled={saving}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {saving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {saving ? 'Saving...' : 'Save Response'}
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === currentDomain.questions.length - 1}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Navigation */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentDomain.name} Questions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentDomain.questions.map((question, index) => {
                    const status = getResponseStatus(question);
                    return (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          index === currentQuestion
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            Question {index + 1}
                          </span>
                          {getStatusIcon(status)}
                        </div>
                        <p className="text-xs text-gray-600 truncate">{question.title}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Available</h3>
              <p className="text-gray-600">This framework doesn't have any questions configured yet.</p>
            </div>
          )}
        </div>
      );
    }

    // Domain selection view
    if (!currentDomain) {
      return (
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <button
              onClick={() => setSelectedFramework(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Frameworks
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedFramework.name} Domains</h1>
            <p className="text-gray-600">Select a domain to begin answering questions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {domains.map((domain) => (
              <div
                key={domain.id}
                onClick={() => handleDomainSelect(domain)}
                className="bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{domain.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{domain.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">
                      {domain.answeredQuestions}/{domain.totalQuestions}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(domain.answeredQuestions / domain.totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Start Domain
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

export default ClientAssessments;