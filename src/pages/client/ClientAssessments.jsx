import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  HelpCircle, 
  X, 
  Upload, 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';

const ClientAssessments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState('cmmc-level-1');
  const [selectedDomain, setSelectedDomain] = useState('access-control');
  const [selectedControl, setSelectedControl] = useState('ac-1');

  // Mock data structure
  const mockData = {
    'cmmc-level-1': {
      name: 'CMMC Level 1',
      domains: {
        'access-control': {
          name: 'Access Control',
          controls: {
            'ac-1': {
              name: 'AC-1 - Access Control Policy',
              description: 'Establish and maintain baseline configurations and inventories of organizational systems.',
              totalQuestions: 15,
              answeredQuestions: 8,
              questions: [
                {
                  id: 1,
                  text: 'Has an access control policy been established?',
                  description: 'Verify that a comprehensive access control policy exists.',
                  quickTip: 'Upload the current access control policy document.',
                  response: 'YES',
                  evidence: ['access_control_policy_v2.1.pdf'],
                  comments: 'Policy was updated last month and approved by management.'
                },
                {
                  id: 2,
                  text: 'Is the access control policy approved by management?',
                  description: 'Confirm that senior management has formally approved the policy.',
                  quickTip: 'Look for management signatures or approval documentation.',
                  response: 'YES',
                  evidence: ['policy_approval_memo.pdf'],
                  comments: 'CEO and CISO signatures obtained on March 1st.'
                },
                {
                  id: 3,
                  text: 'Is the policy communicated to all relevant personnel?',
                  description: 'Ensure all staff who need to know about the policy have been informed.',
                  quickTip: 'Check training records and communication logs.',
                  response: 'PLAN',
                  evidence: [],
                  comments: 'Planning to conduct company-wide training next quarter.'
                },
                {
                  id: 4,
                  text: 'Are access control procedures documented?',
                  description: 'Verify that detailed procedures support the policy.',
                  quickTip: 'Review procedure documents and work instructions.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 5,
                  text: 'Is there a process for regular policy review?',
                  description: 'Confirm that the policy is reviewed and updated regularly.',
                  quickTip: 'Check for scheduled review dates and update history.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 6,
                  text: 'Are access control roles and responsibilities defined?',
                  description: 'Ensure clear definition of who is responsible for what.',
                  quickTip: 'Look for RACI matrices or role definition documents.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 7,
                  text: 'Is compliance with the policy monitored?',
                  description: 'Verify that adherence to the policy is tracked.',
                  quickTip: 'Review audit reports and compliance monitoring tools.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 8,
                  text: 'Are policy violations addressed appropriately?',
                  description: 'Confirm that violations are detected and handled.',
                  quickTip: 'Check incident reports and disciplinary actions.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 9,
                  text: 'Is the policy aligned with business requirements?',
                  description: 'Ensure the policy supports business objectives.',
                  quickTip: 'Review business impact assessments.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 10,
                  text: 'Are exceptions to the policy properly managed?',
                  description: 'Verify that policy exceptions are documented and approved.',
                  quickTip: 'Look for exception request and approval processes.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 11,
                  text: 'Is the policy version controlled?',
                  description: 'Confirm that policy versions are properly managed.',
                  quickTip: 'Check document control procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 12,
                  text: 'Are policy metrics and KPIs defined?',
                  description: 'Ensure measurable objectives are established.',
                  quickTip: 'Review performance indicators and metrics.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 13,
                  text: 'Is policy effectiveness regularly assessed?',
                  description: 'Verify that the policy\'s effectiveness is evaluated.',
                  quickTip: 'Look for effectiveness reviews and assessments.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 14,
                  text: 'Are policy updates communicated promptly?',
                  description: 'Ensure changes are communicated to affected parties.',
                  quickTip: 'Check change management and communication processes.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 15,
                  text: 'Is the policy integrated with other security policies?',
                  description: 'Confirm alignment with other organizational policies.',
                  quickTip: 'Review policy integration and consistency.',
                  response: null,
                  evidence: [],
                  comments: ''
                }
              ]
            },
            'ac-2': {
              name: 'AC-2 - Account Management',
              description: 'Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts.',
              totalQuestions: 10,
              answeredQuestions: 5,
              questions: [
                {
                  id: 1,
                  text: 'Are account management procedures established?',
                  description: 'Verify comprehensive account management procedures exist.',
                  quickTip: 'Review account lifecycle management documentation.',
                  response: 'YES',
                  evidence: ['account_mgmt_procedures.pdf'],
                  comments: 'Procedures cover full account lifecycle.'
                },
                {
                  id: 2,
                  text: 'Is account creation properly authorized?',
                  description: 'Confirm that new accounts require proper authorization.',
                  quickTip: 'Check authorization workflows and approval processes.',
                  response: 'YES',
                  evidence: ['account_request_form.pdf'],
                  comments: 'Manager approval required for all new accounts.'
                },
                {
                  id: 3,
                  text: 'Are accounts reviewed regularly?',
                  description: 'Ensure periodic review of all user accounts.',
                  quickTip: 'Look for scheduled account review processes.',
                  response: 'PLAN',
                  evidence: [],
                  comments: 'Quarterly reviews planned to start next month.'
                },
                {
                  id: 4,
                  text: 'Are inactive accounts disabled promptly?',
                  description: 'Verify that unused accounts are deactivated.',
                  quickTip: 'Check automated account management tools.',
                  response: 'NO',
                  evidence: [],
                  comments: 'Need to implement automated account disabling.'
                },
                {
                  id: 5,
                  text: 'Are privileged accounts properly managed?',
                  description: 'Confirm special handling of administrative accounts.',
                  quickTip: 'Review privileged account management procedures.',
                  response: 'YES',
                  evidence: ['privileged_account_policy.pdf'],
                  comments: 'Separate procedures for admin accounts.'
                },
                {
                  id: 6,
                  text: 'Is emergency access properly controlled?',
                  description: 'Verify emergency account access procedures.',
                  quickTip: 'Check emergency access protocols.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 7,
                  text: 'Are shared accounts monitored?',
                  description: 'Ensure shared accounts have additional oversight.',
                  quickTip: 'Review shared account monitoring procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 8,
                  text: 'Is account termination process secure?',
                  description: 'Verify secure account closure procedures.',
                  quickTip: 'Check account termination workflows.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 9,
                  text: 'Are account attributes properly maintained?',
                  description: 'Confirm account information is kept current.',
                  quickTip: 'Review account attribute management.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 10,
                  text: 'Is account activity monitored?',
                  description: 'Ensure account usage is tracked and reviewed.',
                  quickTip: 'Check account activity monitoring tools.',
                  response: null,
                  evidence: [],
                  comments: ''
                }
              ]
            }
          }
        },
        'identification-authentication': {
          name: 'Identification and Authentication',
          controls: {
            'ia-1': {
              name: 'IA-1 - Identification and Authentication Policy',
              description: 'Establish and maintain identification and authentication policies and procedures.',
              totalQuestions: 12,
              answeredQuestions: 6,
              questions: [
                {
                  id: 1,
                  text: 'Is an identification and authentication policy established?',
                  description: 'Verify that a comprehensive IA policy exists.',
                  quickTip: 'Upload the current identification and authentication policy.',
                  response: 'YES',
                  evidence: ['ia_policy_v1.3.pdf'],
                  comments: 'Policy covers all authentication requirements.'
                },
                {
                  id: 2,
                  text: 'Are authentication requirements clearly defined?',
                  description: 'Confirm specific authentication requirements are documented.',
                  quickTip: 'Review authentication strength requirements.',
                  response: 'YES',
                  evidence: ['auth_requirements.pdf'],
                  comments: 'Multi-factor authentication required for all users.'
                },
                {
                  id: 3,
                  text: 'Is the policy regularly reviewed and updated?',
                  description: 'Ensure the policy is kept current.',
                  quickTip: 'Check policy review dates and update history.',
                  response: 'PLAN',
                  evidence: [],
                  comments: 'Annual review scheduled for next quarter.'
                },
                {
                  id: 4,
                  text: 'Are identification requirements specified?',
                  description: 'Verify user identification requirements are defined.',
                  quickTip: 'Review user identification standards.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 5,
                  text: 'Are password policies comprehensive?',
                  description: 'Confirm password requirements are adequate.',
                  quickTip: 'Check password complexity and rotation requirements.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 6,
                  text: 'Is multi-factor authentication implemented?',
                  description: 'Verify MFA is deployed where required.',
                  quickTip: 'Review MFA implementation and coverage.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 7,
                  text: 'Are authentication failures handled properly?',
                  description: 'Ensure failed authentication attempts are managed.',
                  quickTip: 'Check account lockout and failure handling.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 8,
                  text: 'Is authentication logging implemented?',
                  description: 'Verify authentication events are logged.',
                  quickTip: 'Review authentication audit logs.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 9,
                  text: 'Are privileged account authentication requirements stronger?',
                  description: 'Confirm enhanced authentication for admin accounts.',
                  quickTip: 'Review privileged account authentication.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 10,
                  text: 'Is authentication technology regularly updated?',
                  description: 'Ensure authentication systems are kept current.',
                  quickTip: 'Check authentication system update procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 11,
                  text: 'Are authentication bypass procedures secure?',
                  description: 'Verify secure procedures for authentication bypass.',
                  quickTip: 'Review emergency authentication procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 12,
                  text: 'Is authentication performance monitored?',
                  description: 'Ensure authentication system performance is tracked.',
                  quickTip: 'Check authentication system monitoring.',
                  response: null,
                  evidence: [],
                  comments: ''
                }
              ]
            }
          }
        }
      }
    },
    'iso-27001': {
      name: 'ISO 27001',
      domains: {
        'information-security-policies': {
          name: 'Information Security Policies',
          controls: {
            'a-5-1-1': {
              name: 'A.5.1.1 - Information Security Policy',
              description: 'A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.',
              totalQuestions: 12,
              answeredQuestions: 6,
              questions: [
                {
                  id: 1,
                  text: 'Has an information security policy been established?',
                  description: 'Verify that a comprehensive information security policy exists.',
                  quickTip: 'Upload the current information security policy document.',
                  response: 'YES',
                  evidence: ['info_sec_policy_v2.0.pdf'],
                  comments: 'Policy established and covers all required areas.'
                },
                {
                  id: 2,
                  text: 'Is the policy approved by management?',
                  description: 'Confirm that senior management has approved the policy.',
                  quickTip: 'Look for management approval documentation.',
                  response: 'YES',
                  evidence: ['management_approval.pdf'],
                  comments: 'Board of directors approved the policy.'
                },
                {
                  id: 3,
                  text: 'Is the policy published and accessible?',
                  description: 'Ensure the policy is available to all relevant parties.',
                  quickTip: 'Check policy publication and distribution methods.',
                  response: 'YES',
                  evidence: ['policy_distribution_log.pdf'],
                  comments: 'Available on company intranet and distributed to all staff.'
                },
                {
                  id: 4,
                  text: 'Is the policy communicated to employees?',
                  description: 'Verify that employees are aware of the policy.',
                  quickTip: 'Review communication and training records.',
                  response: 'PLAN',
                  evidence: [],
                  comments: 'Planning comprehensive training program.'
                },
                {
                  id: 5,
                  text: 'Is the policy communicated to external parties?',
                  description: 'Ensure relevant external parties are informed.',
                  quickTip: 'Check external party communication procedures.',
                  response: 'NO',
                  evidence: [],
                  comments: 'Need to establish external communication process.'
                },
                {
                  id: 6,
                  text: 'Is the policy regularly reviewed?',
                  description: 'Confirm periodic review of the policy.',
                  quickTip: 'Check policy review schedule and history.',
                  response: 'YES',
                  evidence: ['policy_review_schedule.pdf'],
                  comments: 'Annual review process established.'
                },
                {
                  id: 7,
                  text: 'Does the policy address all security domains?',
                  description: 'Verify comprehensive coverage of security areas.',
                  quickTip: 'Review policy scope and coverage.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 8,
                  text: 'Is the policy aligned with business objectives?',
                  description: 'Ensure policy supports business goals.',
                  quickTip: 'Check alignment with business strategy.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 9,
                  text: 'Are policy violations addressed?',
                  description: 'Verify that policy breaches are handled appropriately.',
                  quickTip: 'Review incident response and disciplinary procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 10,
                  text: 'Is policy compliance monitored?',
                  description: 'Ensure adherence to the policy is tracked.',
                  quickTip: 'Check compliance monitoring mechanisms.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 11,
                  text: 'Are policy updates managed properly?',
                  description: 'Verify proper change management for policy updates.',
                  quickTip: 'Review policy change control procedures.',
                  response: null,
                  evidence: [],
                  comments: ''
                },
                {
                  id: 12,
                  text: 'Is policy effectiveness measured?',
                  description: 'Confirm that policy effectiveness is evaluated.',
                  quickTip: 'Check policy effectiveness metrics and reviews.',
                  response: null,
                  evidence: [],
                  comments: ''
                }
              ]
            }
          }
        }
      }
    }
  };

  // Get current data based on selections
  const currentFramework = mockData[selectedFramework];
  const currentDomain = currentFramework?.domains[selectedDomain];
  const currentControlData = currentDomain?.controls[selectedControl];
  const currentQuestion = currentControlData?.questions[currentQuestionIndex];

  // Calculate progress
  const totalQuestions = currentControlData?.totalQuestions || 0;
  const answeredQuestions = currentControlData?.answeredQuestions || 0;
  const progressPercentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  // Framework-level progress calculation
  const calculateFrameworkProgress = () => {
    let totalFrameworkQuestions = 0;
    let totalAnsweredQuestions = 0;
    
    Object.values(currentFramework?.domains || {}).forEach(domain => {
      Object.values(domain.controls).forEach(control => {
        totalFrameworkQuestions += control.totalQuestions;
        totalAnsweredQuestions += control.answeredQuestions;
      });
    });
    
    return totalFrameworkQuestions > 0 ? Math.round((totalAnsweredQuestions / totalFrameworkQuestions) * 100) : 0;
  };

  const frameworkProgress = calculateFrameworkProgress();

  // Handle response selection
  const handleResponseSelect = (response) => {
    // In a real app, this would update the backend
    console.log('Response selected:', response);
  };

  // Handle file upload
  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
  };

  // Navigation handlers
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentControlData?.questions.length - 1)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Get available options for dropdowns
  const getFrameworkOptions = () => {
    return Object.entries(mockData).map(([key, value]) => ({
      value: key,
      label: value.name
    }));
  };

  const getDomainOptions = () => {
    if (!currentFramework) return [];
    return Object.entries(currentFramework.domains).map(([key, value]) => ({
      value: key,
      label: value.name
    }));
  };

  const getControlOptions = () => {
    if (!currentDomain) return [];
    return Object.entries(currentDomain.controls).map(([key, value]) => ({
      value: key,
      label: value.name
    }));
  };

  // Handle dropdown changes
  const handleFrameworkChange = (value) => {
    setSelectedFramework(value);
    const firstDomain = Object.keys(mockData[value].domains)[0];
    setSelectedDomain(firstDomain);
    const firstControl = Object.keys(mockData[value].domains[firstDomain].controls)[0];
    setSelectedControl(firstControl);
    setCurrentQuestionIndex(0);
  };

  const handleDomainChange = (value) => {
    setSelectedDomain(value);
    const firstControl = Object.keys(currentFramework.domains[value].controls)[0];
    setSelectedControl(firstControl);
    setCurrentQuestionIndex(0);
  };

  const handleControlChange = (value) => {
    setSelectedControl(value);
    setCurrentQuestionIndex(0);
  };

  if (!currentFramework || !currentDomain || !currentControlData || !currentQuestion) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation - Sticky */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Framework Dropdown */}
            <div className="relative">
              <select
                value={selectedFramework}
                onChange={(e) => handleFrameworkChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getFrameworkOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            {/* Domain Dropdown */}
            <div className="relative">
              <select
                value={selectedDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getDomainOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            {/* Control Dropdown */}
            <div className="relative">
              <select
                value={selectedControl}
                onChange={(e) => handleControlChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getControlOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </button>
            <div className="text-sm text-gray-600">
              {frameworkProgress}% Complete
            </div>
          </div>
        </div>

        {/* Framework Progress */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Framework Progress</span>
            <span>{frameworkProgress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${frameworkProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <div className={`${showHelp ? 'flex-1' : 'w-full'} transition-all duration-300`}>
          {/* Control Header - Sticky */}
          <div className="sticky top-0 z-30 bg-blue-50 border-b border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentControlData.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentControlData.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-600 font-medium">
                  {answeredQuestions} / {totalQuestions} answered
                </div>
                <div className="w-32 bg-blue-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Questions Area */}
          <div className="p-4 space-y-6 pb-20">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {/* Question Header */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {currentQuestion.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    {currentQuestion.text}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Question {currentQuestionIndex + 1} of {totalQuestions} in {currentControlData.name}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {currentQuestion.description}
                  </p>
                  
                  {/* Quick Tip */}
                  {currentQuestion.quickTip && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Quick Tip:</p>
                          <p className="text-sm text-blue-800">{currentQuestion.quickTip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Response Buttons */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Your Response</p>
                <div className="grid grid-cols-4 gap-3">
                  {['YES', 'NO', 'PLAN', 'NOT APPLICABLE'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleResponseSelect(option)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        currentQuestion.response === option
                          ? option === 'YES'
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : option === 'NO'
                            ? 'bg-red-100 border-red-500 text-red-800'
                            : option === 'PLAN'
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                            : 'bg-gray-100 border-gray-500 text-gray-800'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                      {currentQuestion.response === option && (
                        <CheckCircle className="h-4 w-4 ml-2 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Supporting Evidence */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Supporting Evidence</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-600 font-medium">Upload</p>
                  <p className="text-xs text-gray-500">Upload documents, screenshots, or other evidence (PDF, DOC, JPG, PNG)</p>
                </div>
                
                {/* Show existing evidence */}
                {currentQuestion.evidence && currentQuestion.evidence.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {currentQuestion.evidence.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Comments */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Additional Comments</p>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Add any additional comments or notes..."
                  defaultValue={currentQuestion.comments}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Progress
                </button>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === (currentControlData?.questions.length - 1)}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Help Panel - Sticky */}
        {showHelp && (
          <div className="w-80 bg-white border-l border-gray-200 sticky top-0 h-screen overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Control Help</h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Control Description */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Control Description</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentControlData.description}
                </p>
              </div>

              {/* Relevant Documents */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Relevant Documents</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Access Control Policy Template</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>User Account Management Guide</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Identity Management Procedures</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Compliance Framework Guide</span>
                  </div>
                </div>
              </div>

              {/* Answering Tips */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
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
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-yellow-700">PLAN:</p>
                      <p className="text-gray-600">Choose when the control doesn't apply to your organization.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-700">NOT APPLICABLE:</p>
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
  );
};

export default ClientAssessments;