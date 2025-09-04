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
      answeredQuestions: 8,
      progress: 47
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

  // Expanded mock domains and controls data with more questions
  const mockDomainsAndControls = {
    'cmmc-level-1': [
      {
        id: 'access-control',
        name: 'Access Control',
        description: 'Limit information system access to authorized users, processes, and devices',
        totalQuestions: 10,
        answeredQuestions: 6,
        controls: [
          {
            id: '6-authorized-access-control',
            name: '6 - Authorized Access Control',
            description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, and devices.',
            totalQuestions: 10,
            answeredQuestions: 6,
            questions: [
              {
                id: 'ac-6-1',
                title: 'Are authorized users identified within the organization?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that the organization has a process to identify and maintain a list of authorized users.',
                quickTip: 'Upload a user access policy and ensure it includes identification methods.',
                currentResponse: 'YES',
                evidence: ['User Access Policy v2.1.pdf'],
                comments: 'We maintain a comprehensive user directory with role-based access controls.'
              },
              {
                id: 'ac-6-2',
                title: 'Is access to information systems limited to authorized users?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Confirm that only authorized users can access information systems.',
                quickTip: 'Document access control mechanisms and user authentication processes.',
                currentResponse: 'NO',
                evidence: [],
                comments: 'Currently implementing multi-factor authentication across all systems.'
              },
              {
                id: 'ac-6-3',
                title: 'Are user access rights reviewed regularly?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Ensure that user access rights are reviewed and updated on a regular basis.',
                quickTip: 'Provide evidence of regular access reviews and approval processes.',
                currentResponse: 'YES',
                evidence: ['Access Review Report Q1 2024.pdf', 'User Access Matrix.xlsx'],
                comments: 'Quarterly access reviews conducted by IT security team with management approval.'
              },
              {
                id: 'ac-6-4',
                title: 'Is there a process for removing access when no longer needed?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Verify that access is promptly removed when users no longer require it.',
                quickTip: 'Document the process for access removal and provide examples.',
                currentResponse: 'PLAN',
                evidence: ['HR Offboarding Checklist.pdf'],
                comments: 'Process documented but automation is planned for Q2 2024.'
              },
              {
                id: 'ac-6-5',
                title: 'Are privileged accounts managed separately?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Ensure that privileged accounts have additional controls and monitoring.',
                quickTip: 'Show how privileged accounts are identified and managed differently.',
                currentResponse: 'YES',
                evidence: ['Privileged Account Management Policy.pdf'],
                comments: 'Separate privileged account management with enhanced monitoring and approval workflows.'
              },
              {
                id: 'ac-6-6',
                title: 'Do you maintain an inventory of all user accounts?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Verify that all user accounts are documented and tracked in an inventory system.',
                quickTip: 'Provide evidence of account inventory management and regular updates.',
                currentResponse: 'YES',
                evidence: ['User Account Inventory.xlsx'],
                comments: 'Active Directory provides comprehensive account inventory with automated reporting.'
              },
              {
                id: 'ac-6-7',
                title: 'Are shared accounts prohibited or strictly controlled?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Ensure that shared accounts are either prohibited or have strict controls in place.',
                quickTip: 'Document policy on shared accounts and any exceptions with justification.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-8',
                title: 'Is there a formal process for granting access to new users?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Verify that new user access follows a formal approval and provisioning process.',
                quickTip: 'Show the workflow for new user access requests and approvals.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-9',
                title: 'Are access control policies communicated to all users?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Ensure that access control policies are properly communicated and acknowledged by users.',
                quickTip: 'Provide evidence of policy distribution and user acknowledgment.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-10',
                title: 'Is access control effectiveness monitored and measured?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Verify that the organization monitors and measures the effectiveness of access controls.',
                quickTip: 'Show metrics, reports, or KPIs used to measure access control effectiveness.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      },
      {
        id: 'identification-authentication',
        name: 'Identification and Authentication',
        description: 'Identify information system users, processes, and devices',
        totalQuestions: 7,
        answeredQuestions: 2,
        controls: [
          {
            id: '7-identification-authentication',
            name: '7 - Identification and Authentication',
            description: 'Identify information system users, processes acting on behalf of users, or devices.',
            totalQuestions: 7,
            answeredQuestions: 2,
            questions: [
              {
                id: 'ia-7-1',
                title: 'Are users uniquely identified before accessing information systems?',
                questionNumber: 1,
                totalInControl: 7,
                description: 'Verify that each user has a unique identifier for system access.',
                quickTip: 'Document user identification methods and ensure no shared identifiers.',
                currentResponse: 'YES',
                evidence: ['User ID Standards.pdf'],
                comments: 'Each user has unique username and employee ID for system access.'
              },
              {
                id: 'ia-7-2',
                title: 'Are users authenticated before accessing information systems?',
                questionNumber: 2,
                totalInControl: 7,
                description: 'Confirm that users must authenticate their identity before system access.',
                quickTip: 'Show authentication mechanisms like passwords, tokens, or biometrics.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Currently using passwords, planning to implement MFA by Q3 2024.'
              },
              {
                id: 'ia-7-3',
                title: 'Are authentication mechanisms protected from unauthorized disclosure?',
                questionNumber: 3,
                totalInControl: 7,
                description: 'Ensure that authentication credentials are properly protected.',
                quickTip: 'Document how passwords and other credentials are stored and transmitted securely.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-4',
                title: 'Is multi-factor authentication implemented for privileged accounts?',
                questionNumber: 4,
                totalInControl: 7,
                description: 'Verify that privileged accounts require multiple authentication factors.',
                quickTip: 'Show MFA implementation for administrative and privileged user accounts.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-5',
                title: 'Are authentication failures logged and monitored?',
                questionNumber: 5,
                totalInControl: 7,
                description: 'Ensure that failed authentication attempts are logged and reviewed.',
                quickTip: 'Provide evidence of authentication logging and monitoring procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-6',
                title: 'Are default passwords changed before system deployment?',
                questionNumber: 6,
                totalInControl: 7,
                description: 'Verify that all default passwords are changed before systems go live.',
                quickTip: 'Document procedures for changing default credentials on new systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-7',
                title: 'Is there a password policy that meets security requirements?',
                questionNumber: 7,
                totalInControl: 7,
                description: 'Ensure that password policies meet minimum security standards.',
                quickTip: 'Show password policy including complexity, length, and rotation requirements.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      }
    ],
    'cmmc-level-2': [
      {
        id: 'access-control-l2',
        name: 'Access Control',
        description: 'Enhanced access control requirements for Level 2',
        totalQuestions: 15,
        answeredQuestions: 10,
        controls: [
          {
            id: 'ac-l2-001',
            name: 'AC.L2-3.1.1 - Account Management',
            description: 'Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts.',
            totalQuestions: 8,
            answeredQuestions: 5,
            questions: [
              {
                id: 'ac-l2-001-1',
                title: 'Do you have documented procedures for account management?',
                questionNumber: 1,
                totalInControl: 8,
                description: 'Verify that account management procedures are documented and followed.',
                quickTip: 'Upload account management procedures and show how they are implemented.',
                currentResponse: 'YES',
                evidence: ['Account Management Procedures v3.0.pdf'],
                comments: 'Comprehensive account management procedures covering full lifecycle.'
              },
              {
                id: 'ac-l2-001-2',
                title: 'Are accounts established with proper authorization?',
                questionNumber: 2,
                totalInControl: 8,
                description: 'Ensure that new accounts require proper authorization before creation.',
                quickTip: 'Show the approval workflow for new account requests.',
                currentResponse: 'YES',
                evidence: ['Account Request Form Template.pdf', 'Approval Workflow Diagram.png'],
                comments: 'All new accounts require manager approval and IT security review.'
              },
              {
                id: 'ac-l2-001-3',
                title: 'Are accounts reviewed periodically for appropriateness?',
                questionNumber: 3,
                totalInControl: 8,
                description: 'Verify that accounts are regularly reviewed to ensure they are still appropriate.',
                quickTip: 'Provide evidence of periodic account reviews and any actions taken.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning to implement automated quarterly reviews starting Q2 2024.'
              },
              {
                id: 'ac-l2-001-4',
                title: 'Are inactive accounts disabled in a timely manner?',
                questionNumber: 4,
                totalInControl: 8,
                description: 'Ensure that inactive accounts are identified and disabled promptly.',
                quickTip: 'Document the process for identifying and disabling inactive accounts.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-5',
                title: 'Are account privileges assigned based on job functions?',
                questionNumber: 5,
                totalInControl: 8,
                description: 'Verify that account privileges align with user job responsibilities.',
                quickTip: 'Show role-based access control implementation and job function mapping.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-6',
                title: 'Is there a process for emergency account access?',
                questionNumber: 6,
                totalInControl: 8,
                description: 'Ensure procedures exist for emergency access when needed.',
                quickTip: 'Document emergency access procedures and approval requirements.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-7',
                title: 'Are shared accounts monitored more closely?',
                questionNumber: 7,
                totalInControl: 8,
                description: 'Verify that any shared accounts have enhanced monitoring and controls.',
                quickTip: 'Show additional monitoring and logging for shared accounts.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-8',
                title: 'Is account termination handled securely?',
                questionNumber: 8,
                totalInControl: 8,
                description: 'Ensure that account termination follows secure procedures.',
                quickTip: 'Document the account termination process and security considerations.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      }
    ],
    'iso-27001': [
      {
        id: 'information-security-policies',
        name: 'Information Security Policies',
        description: 'Management direction and support for information security',
        totalQuestions: 6,
        answeredQuestions: 3,
        controls: [
          {
            id: 'a5-1-1',
            name: 'A.5.1.1 - Information Security Policy',
            description: 'A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.',
            totalQuestions: 6,
            answeredQuestions: 3,
            questions: [
              {
                id: 'iso-a5-1-1-1',
                title: 'Has an information security policy been established?',
                questionNumber: 1,
                totalInControl: 6,
                description: 'Verify that a comprehensive information security policy exists.',
                quickTip: 'Upload the current information security policy document.',
                currentResponse: 'YES',
                evidence: ['Information Security Policy v4.2.pdf'],
                comments: 'Policy established and approved by executive management in January 2024.'
              },
              {
                id: 'iso-a5-1-1-2',
                title: 'Is the policy approved by management?',
                questionNumber: 2,
                totalInControl: 6,
                description: 'Ensure that the information security policy has formal management approval.',
                quickTip: 'Show evidence of management approval and sign-off.',
                currentResponse: 'YES',
                evidence: ['Policy Approval Memo.pdf'],
                comments: 'Approved by CEO and CTO with formal documentation.'
              },
              {
                id: 'iso-a5-1-1-3',
                title: 'Is the policy communicated to all employees?',
                questionNumber: 3,
                totalInControl: 6,
                description: 'Verify that the policy is effectively communicated to all relevant personnel.',
                quickTip: 'Provide evidence of policy distribution and employee acknowledgment.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning company-wide training session for Q2 2024.'
              },
              {
                id: 'iso-a5-1-1-4',
                title: 'Is the policy reviewed and updated regularly?',
                questionNumber: 4,
                totalInControl: 6,
                description: 'Ensure that the policy is reviewed and updated on a regular basis.',
                quickTip: 'Show the review schedule and any recent updates to the policy.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-5',
                title: 'Are roles and responsibilities clearly defined in the policy?',
                questionNumber: 5,
                totalInControl: 6,
                description: 'Verify that information security roles and responsibilities are clearly outlined.',
                quickTip: 'Show how roles and responsibilities are defined and assigned.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-6',
                title: 'Is compliance with the policy monitored and enforced?',
                questionNumber: 6,
                totalInControl: 6,
                description: 'Ensure that policy compliance is actively monitored and enforced.',
                quickTip: 'Provide evidence of compliance monitoring and enforcement actions.',
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

  const handleFrameworkChange = (frameworkId) => {
    const framework = mockFrameworks.find(f => f.id === frameworkId);
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
  };

  const handleDomainChange = (domainId) => {
    const domain = mockDomainsAndControls[selectedFramework.id]?.find(d => d.id === domainId);
    setSelectedDomain(domain);
    if (domain && domain.controls && domain.controls.length > 0) {
      setSelectedControl(domain.controls[0]);
      setCurrentQuestionIndex(0);
    }
  };

  const handleControlChange = (controlId) => {
    const control = selectedDomain?.controls?.find(c => c.id === controlId);
    setSelectedControl(control);
    setCurrentQuestionIndex(0);
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
        {/* Sticky Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            {/* Framework Dropdown */}
            <div className="relative">
              <select 
                value={selectedFramework?.id || ''}
                onChange={(e) => handleFrameworkChange(e.target.value)}
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
                onChange={(e) => handleDomainChange(e.target.value)}
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
                onChange={(e) => handleControlChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
              >
                {selectedDomain?.controls?.map(control => (
                  <option key={control.id} value={control.id}>
                    {control.name}
                  </option>
                )) || []}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Help Button and Progress */}
            <div className="ml-auto flex items-center space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
        <div className="flex-1 flex overflow-hidden">
          {/* Question Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
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

                    <p className="text-gray-600 mb-4">{currentQuestion.description}</p>

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

                  {/* Additional spacing for scrolling */}
                  <div className="h-20"></div>
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
          </div>

          {/* Sticky Help Panel */}
          {showHelp && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col sticky top-0 h-screen">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
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
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Access Control Policy Template</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">User Account Management Guide</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Identity Management Procedures</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Compliance Framework Guide</span>
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
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-700">PLAN:</p>
                        <p className="text-gray-600">Choose when you have plans to implement but haven't started yet.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-700">NOT APPLICABLE:</p>
                        <p className="text-gray-600">Choose when the control doesn't apply to your organization.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Progress Summary</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Control:</span>
                      <span className="font-medium text-gray-900">{getControlProgress()}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Framework:</span>
                      <span className="font-medium text-blue-600">{getFrameworkProgress()}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions Remaining:</span>
                      <span className="font-medium text-gray-900">
                        {(selectedFramework?.totalQuestions || 0) - (selectedFramework?.answeredQuestions || 0)}
                      </span>
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