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
  Download,
  BarChart3
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
        totalQuestions: 25,
        answeredQuestions: 12,
        controls: [
          {
            id: '6-authorized-access-control',
            name: '6 - Authorized Access Control',
            description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, and devices.',
            totalQuestions: 15,
            answeredQuestions: 8,
            questions: [
              {
                id: 'ac-6-1',
                title: 'Are authorized users identified within the organization?',
                questionNumber: 1,
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
                description: 'Ensure that shared accounts are either prohibited or have strict controls in place.',
                quickTip: 'Document policy on shared accounts and any exceptions with justification.',
                currentResponse: 'PLAN',
                evidence: ['Shared Account Policy Draft.pdf'],
                comments: 'Developing policy to eliminate shared accounts by Q3 2024.'
              },
              {
                id: 'ac-6-8',
                title: 'Is there a formal process for granting access to new users?',
                questionNumber: 8,
                totalInControl: 15,
                description: 'Verify that new user access follows a formal approval and provisioning process.',
                quickTip: 'Show the workflow for new user access requests and approvals.',
                currentResponse: 'YES',
                evidence: ['Access Request Workflow.pdf', 'New User Checklist.docx'],
                comments: 'Formal process with manager approval and IT provisioning workflow.'
              },
              {
                id: 'ac-6-9',
                title: 'Are access control policies communicated to all users?',
                questionNumber: 9,
                totalInControl: 15,
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
                totalInControl: 15,
                description: 'Verify that the organization monitors and measures the effectiveness of access controls.',
                quickTip: 'Show metrics, reports, or KPIs used to measure access control effectiveness.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-11',
                title: 'Are access control violations logged and investigated?',
                questionNumber: 11,
                totalInControl: 15,
                description: 'Ensure that access control violations are properly logged and investigated.',
                quickTip: 'Provide evidence of logging mechanisms and investigation procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-12',
                title: 'Is there a process for emergency access override?',
                questionNumber: 12,
                totalInControl: 15,
                description: 'Verify that emergency access procedures exist with proper controls.',
                quickTip: 'Document emergency access procedures and approval requirements.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-13',
                title: 'Are access control systems regularly tested?',
                questionNumber: 13,
                totalInControl: 15,
                description: 'Ensure that access control systems undergo regular testing and validation.',
                quickTip: 'Show evidence of access control testing and validation procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-14',
                title: 'Is access granted based on least privilege principle?',
                questionNumber: 14,
                totalInControl: 15,
                description: 'Verify that users are granted only the minimum access necessary for their job functions.',
                quickTip: 'Document how least privilege is implemented and maintained.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-6-15',
                title: 'Are access control changes properly documented and approved?',
                questionNumber: 15,
                totalInControl: 15,
                description: 'Ensure that all access control changes follow proper documentation and approval processes.',
                quickTip: 'Show change management procedures for access control modifications.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: '7-access-enforcement',
            name: '7 - Access Enforcement',
            description: 'Enforce approved authorizations for logical access to information and system resources.',
            totalQuestions: 10,
            answeredQuestions: 4,
            questions: [
              {
                id: 'ac-7-1',
                title: 'Are approved authorizations enforced at the point of access?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that access controls are enforced when users attempt to access systems.',
                quickTip: 'Show how access controls are technically enforced at system entry points.',
                currentResponse: 'YES',
                evidence: ['Access Control Configuration.pdf'],
                comments: 'Technical controls enforce approved access at all system entry points.'
              },
              {
                id: 'ac-7-2',
                title: 'Is logical access to information systems controlled?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Ensure that logical access to information systems is properly controlled.',
                quickTip: 'Document logical access control mechanisms and their implementation.',
                currentResponse: 'YES',
                evidence: ['Logical Access Controls.pdf'],
                comments: 'Comprehensive logical access controls implemented across all systems.'
              },
              {
                id: 'ac-7-3',
                title: 'Are access permissions enforced consistently across all systems?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Verify that access permissions are consistently enforced across the organization.',
                quickTip: 'Show how access permissions are standardized and enforced.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Working on standardizing access controls across legacy systems.'
              },
              {
                id: 'ac-7-4',
                title: 'Is unauthorized access prevented through technical controls?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Ensure that technical controls prevent unauthorized access attempts.',
                quickTip: 'Document technical controls that block unauthorized access.',
                currentResponse: 'YES',
                evidence: ['Firewall Rules.pdf', 'Access Control Lists.xlsx'],
                comments: 'Multiple layers of technical controls prevent unauthorized access.'
              },
              {
                id: 'ac-7-5',
                title: 'Are access control decisions logged for audit purposes?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Verify that access control decisions are logged for security auditing.',
                quickTip: 'Show access control logging and audit trail capabilities.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-7-6',
                title: 'Is access automatically terminated after a period of inactivity?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Ensure that user sessions are automatically terminated after inactivity.',
                quickTip: 'Document session timeout policies and their implementation.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-7-7',
                title: 'Are concurrent sessions limited for users?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Verify that users cannot have unlimited concurrent sessions.',
                quickTip: 'Show how concurrent session limits are enforced.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-7-8',
                title: 'Is access to security functions restricted to authorized personnel?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Ensure that security functions are only accessible to authorized security personnel.',
                quickTip: 'Document how security functions are protected and who has access.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-7-9',
                title: 'Are access control mechanisms regularly reviewed and updated?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Verify that access control mechanisms are periodically reviewed and updated.',
                quickTip: 'Show the review schedule and update procedures for access controls.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-7-10',
                title: 'Is access enforcement consistent with organizational policies?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Ensure that access enforcement aligns with organizational security policies.',
                quickTip: 'Show how access enforcement is aligned with organizational policies.',
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
        totalQuestions: 22,
        answeredQuestions: 8,
        controls: [
          {
            id: '7-identification-authentication',
            name: '7 - Identification and Authentication',
            description: 'Identify information system users, processes acting on behalf of users, or devices.',
            totalQuestions: 12,
            answeredQuestions: 6,
            questions: [
              {
                id: 'ia-7-1',
                title: 'Are users uniquely identified before accessing information systems?',
                questionNumber: 1,
                totalInControl: 12,
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
                totalInControl: 12,
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
                totalInControl: 12,
                description: 'Ensure that authentication credentials are properly protected.',
                quickTip: 'Document how passwords and other credentials are stored and transmitted securely.',
                currentResponse: 'YES',
                evidence: ['Password Security Policy.pdf'],
                comments: 'Passwords are hashed and stored securely with encryption in transit.'
              },
              {
                id: 'ia-7-4',
                title: 'Is multi-factor authentication implemented for privileged accounts?',
                questionNumber: 4,
                totalInControl: 12,
                description: 'Verify that privileged accounts require multiple authentication factors.',
                quickTip: 'Show MFA implementation for administrative and privileged user accounts.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'MFA implementation planned for all privileged accounts by Q2 2024.'
              },
              {
                id: 'ia-7-5',
                title: 'Are authentication failures logged and monitored?',
                questionNumber: 5,
                totalInControl: 12,
                description: 'Ensure that failed authentication attempts are logged and reviewed.',
                quickTip: 'Provide evidence of authentication logging and monitoring procedures.',
                currentResponse: 'YES',
                evidence: ['Authentication Logs Sample.pdf'],
                comments: 'All authentication failures are logged and monitored for suspicious activity.'
              },
              {
                id: 'ia-7-6',
                title: 'Are default passwords changed before system deployment?',
                questionNumber: 6,
                totalInControl: 12,
                description: 'Verify that all default passwords are changed before systems go live.',
                quickTip: 'Document procedures for changing default credentials on new systems.',
                currentResponse: 'YES',
                evidence: ['System Hardening Checklist.pdf'],
                comments: 'Standard procedure requires all default passwords to be changed during system setup.'
              },
              {
                id: 'ia-7-7',
                title: 'Is there a password policy that meets security requirements?',
                questionNumber: 7,
                totalInControl: 12,
                description: 'Ensure that password policies meet minimum security standards.',
                quickTip: 'Show password policy including complexity, length, and rotation requirements.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-8',
                title: 'Are user identities verified before account creation?',
                questionNumber: 8,
                totalInControl: 12,
                description: 'Verify that user identities are properly verified before creating accounts.',
                quickTip: 'Document the identity verification process for new users.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-9',
                title: 'Is authentication required for all system access?',
                questionNumber: 9,
                totalInControl: 12,
                description: 'Ensure that authentication is required for all types of system access.',
                quickTip: 'Show that no anonymous or unauthenticated access is allowed.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-10',
                title: 'Are authentication credentials regularly updated?',
                questionNumber: 10,
                totalInControl: 12,
                description: 'Verify that authentication credentials are updated on a regular basis.',
                quickTip: 'Document password rotation policies and enforcement.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-11',
                title: 'Is there a process for handling compromised credentials?',
                questionNumber: 11,
                totalInControl: 12,
                description: 'Ensure procedures exist for handling compromised authentication credentials.',
                quickTip: 'Document incident response procedures for credential compromise.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-7-12',
                title: 'Are authentication systems regularly tested and validated?',
                questionNumber: 12,
                totalInControl: 12,
                description: 'Verify that authentication systems undergo regular testing and validation.',
                quickTip: 'Show testing procedures and validation results for authentication systems.',
                currentResponse: null,
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
          },
          {
            id: '8-device-identification',
            name: '8 - Device Identification and Authentication',
            description: 'Identify and authenticate devices before establishing network connections.',
            totalQuestions: 10,
            answeredQuestions: 2,
            questions: [
              {
                id: 'ia-8-1',
                title: 'Are devices uniquely identified before network connection?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that devices are uniquely identified before being allowed network access.',
                quickTip: 'Document device identification mechanisms like MAC addresses or certificates.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning to implement device certificates for network access.'
              },
              {
                id: 'ia-8-2',
                title: 'Are devices authenticated before network access is granted?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Ensure that devices must authenticate before gaining network access.',
                quickTip: 'Show device authentication mechanisms and policies.',
                currentResponse: 'NO',
                evidence: [],
                comments: 'Currently working on implementing device authentication controls.'
              },
              {
                id: 'ia-8-3',
                title: 'Is there an inventory of authorized devices?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Verify that an inventory of authorized devices is maintained.',
                quickTip: 'Provide evidence of device inventory management.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-4',
                title: 'Are unauthorized devices prevented from connecting?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Ensure that unauthorized devices cannot connect to the network.',
                quickTip: 'Document controls that prevent unauthorized device connections.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-5',
                title: 'Is device authentication information protected?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Verify that device authentication credentials are properly protected.',
                quickTip: 'Show how device certificates or keys are secured.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-6',
                title: 'Are mobile devices subject to additional authentication requirements?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Ensure that mobile devices have enhanced authentication requirements.',
                quickTip: 'Document mobile device management and authentication policies.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-7',
                title: 'Is device authentication regularly reviewed and updated?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Verify that device authentication mechanisms are regularly reviewed.',
                quickTip: 'Show review procedures for device authentication systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-8',
                title: 'Are guest devices isolated from internal networks?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Ensure that guest devices are properly isolated from internal systems.',
                quickTip: 'Document network segmentation for guest device access.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-9',
                title: 'Is device authentication failure handled appropriately?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Verify that device authentication failures are properly handled.',
                quickTip: 'Show procedures for handling device authentication failures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ia-8-10',
                title: 'Are device authentication logs monitored for anomalies?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Ensure that device authentication logs are monitored for suspicious activity.',
                quickTip: 'Document monitoring procedures for device authentication events.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      },
      {
        id: 'audit-accountability',
        name: 'Audit and Accountability',
        description: 'Create, protect, and retain information system audit records',
        totalQuestions: 15,
        answeredQuestions: 3,
        controls: [
          {
            id: '9-audit-events',
            name: '9 - Audit Events',
            description: 'Create and retain information system audit records to enable monitoring, analysis, investigation, and reporting.',
            totalQuestions: 15,
            answeredQuestions: 3,
            questions: [
              {
                id: 'au-9-1',
                title: 'Are audit events defined and documented?',
                questionNumber: 1,
                totalInControl: 15,
                description: 'Verify that the organization has defined what events should be audited.',
                quickTip: 'Document the types of events that are audited and why.',
                currentResponse: 'YES',
                evidence: ['Audit Events Policy.pdf'],
                comments: 'Comprehensive audit events policy defines all auditable events.'
              },
              {
                id: 'au-9-2',
                title: 'Are audit records generated for defined events?',
                questionNumber: 2,
                totalInControl: 15,
                description: 'Ensure that audit records are actually generated for the defined events.',
                quickTip: 'Show examples of audit logs and their content.',
                currentResponse: 'YES',
                evidence: ['Sample Audit Logs.pdf'],
                comments: 'Automated logging systems generate comprehensive audit records.'
              },
              {
                id: 'au-9-3',
                title: 'Do audit records contain sufficient information for analysis?',
                questionNumber: 3,
                totalInControl: 15,
                description: 'Verify that audit records contain enough detail for security analysis.',
                quickTip: 'Show that audit records include timestamps, user IDs, event types, and outcomes.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Working on enhancing audit record detail and standardization.'
              },
              {
                id: 'au-9-4',
                title: 'Are audit records protected from unauthorized access?',
                questionNumber: 4,
                totalInControl: 15,
                description: 'Ensure that audit records are protected from unauthorized modification or deletion.',
                quickTip: 'Document controls that protect audit log integrity.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-5',
                title: 'Are audit records retained for an appropriate period?',
                questionNumber: 5,
                totalInControl: 15,
                description: 'Verify that audit records are retained according to policy requirements.',
                quickTip: 'Show audit retention policies and implementation.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-6',
                title: 'Are audit records regularly reviewed and analyzed?',
                questionNumber: 6,
                totalInControl: 15,
                description: 'Ensure that audit records are regularly reviewed for security incidents.',
                quickTip: 'Document audit review procedures and frequency.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-7',
                title: 'Is audit processing failure handled appropriately?',
                questionNumber: 7,
                totalInControl: 15,
                description: 'Verify that audit system failures are detected and handled properly.',
                quickTip: 'Show procedures for handling audit system failures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-8',
                title: 'Are audit records synchronized across systems?',
                questionNumber: 8,
                totalInControl: 15,
                description: 'Ensure that audit records have synchronized timestamps across systems.',
                quickTip: 'Document time synchronization procedures for audit systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-9',
                title: 'Is audit capacity planning performed?',
                questionNumber: 9,
                totalInControl: 15,
                description: 'Verify that audit system capacity is planned and monitored.',
                quickTip: 'Show capacity planning for audit log storage and processing.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-10',
                title: 'Are audit tools and techniques documented?',
                questionNumber: 10,
                totalInControl: 15,
                description: 'Ensure that audit tools and analysis techniques are documented.',
                quickTip: 'Document the tools and methods used for audit analysis.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-11',
                title: 'Is audit data backed up and recoverable?',
                questionNumber: 11,
                totalInControl: 15,
                description: 'Verify that audit data is properly backed up and can be recovered.',
                quickTip: 'Show backup procedures and recovery testing for audit data.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-12',
                title: 'Are audit responsibilities clearly assigned?',
                questionNumber: 12,
                totalInControl: 15,
                description: 'Ensure that audit responsibilities are clearly defined and assigned.',
                quickTip: 'Document roles and responsibilities for audit management.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-13',
                title: 'Is audit system performance monitored?',
                questionNumber: 13,
                totalInControl: 15,
                description: 'Verify that audit system performance is monitored and maintained.',
                quickTip: 'Show monitoring procedures for audit system performance.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-14',
                title: 'Are audit findings reported to appropriate personnel?',
                questionNumber: 14,
                totalInControl: 15,
                description: 'Ensure that audit findings are reported to the right people.',
                quickTip: 'Document reporting procedures for audit findings.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'au-9-15',
                title: 'Is audit system configuration managed and controlled?',
                questionNumber: 15,
                totalInControl: 15,
                description: 'Verify that audit system configurations are properly managed.',
                quickTip: 'Show configuration management procedures for audit systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      },
      {
        id: 'system-communications-protection',
        name: 'System and Communications Protection',
        description: 'Monitor, control, and protect organizational communications',
        totalQuestions: 20,
        answeredQuestions: 5,
        controls: [
          {
            id: '10-boundary-protection',
            name: '10 - Boundary Protection',
            description: 'Monitor, control, and protect communications at the external boundaries and key internal boundaries.',
            totalQuestions: 10,
            answeredQuestions: 3,
            questions: [
              {
                id: 'sc-10-1',
                title: 'Are network boundaries identified and documented?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that all network boundaries are clearly identified and documented.',
                quickTip: 'Provide network diagrams showing all network boundaries.',
                currentResponse: 'YES',
                evidence: ['Network Boundary Diagram.pdf'],
                comments: 'Network boundaries clearly documented in network architecture diagrams.'
              },
              {
                id: 'sc-10-2',
                title: 'Are firewalls or equivalent devices deployed at network boundaries?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Ensure that appropriate boundary protection devices are deployed.',
                quickTip: 'Document firewall deployment and configuration.',
                currentResponse: 'YES',
                evidence: ['Firewall Configuration.pdf'],
                comments: 'Enterprise firewalls deployed at all network perimeters.'
              },
              {
                id: 'sc-10-3',
                title: 'Is network traffic monitored at boundaries?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Verify that network traffic is monitored at organizational boundaries.',
                quickTip: 'Show network monitoring tools and procedures.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning to implement enhanced network monitoring by Q3 2024.'
              },
              {
                id: 'sc-10-4',
                title: 'Are boundary protection devices configured to deny traffic by default?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Ensure that boundary devices use a default-deny configuration.',
                quickTip: 'Show firewall rules demonstrating default-deny configuration.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-5',
                title: 'Is remote access controlled through managed access control points?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Verify that remote access goes through controlled access points.',
                quickTip: 'Document remote access architecture and control points.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-6',
                title: 'Are boundary protection devices regularly updated?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Ensure that boundary protection devices receive regular updates.',
                quickTip: 'Show update procedures and schedules for boundary devices.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-7',
                title: 'Is network segmentation implemented where appropriate?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Verify that network segmentation is used to isolate sensitive systems.',
                quickTip: 'Document network segmentation strategy and implementation.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-8',
                title: 'Are boundary protection rules regularly reviewed?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Ensure that boundary protection rules are periodically reviewed.',
                quickTip: 'Show review procedures for firewall and boundary protection rules.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-9',
                title: 'Is boundary protection effectiveness monitored?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Verify that the effectiveness of boundary protection is monitored.',
                quickTip: 'Document monitoring and metrics for boundary protection effectiveness.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-10-10',
                title: 'Are boundary protection incidents properly handled?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Ensure that boundary protection incidents are detected and responded to.',
                quickTip: 'Show incident response procedures for boundary protection events.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: '11-transmission-confidentiality',
            name: '11 - Transmission Confidentiality and Integrity',
            description: 'Protect the confidentiality and integrity of transmitted information.',
            totalQuestions: 10,
            answeredQuestions: 2,
            questions: [
              {
                id: 'sc-11-1',
                title: 'Is data encrypted during transmission over public networks?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that data is encrypted when transmitted over public networks.',
                quickTip: 'Document encryption methods used for data transmission.',
                currentResponse: 'YES',
                evidence: ['Encryption Standards.pdf'],
                comments: 'All data transmitted over public networks uses TLS 1.3 encryption.'
              },
              {
                id: 'sc-11-2',
                title: 'Is the integrity of transmitted data protected?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Ensure that transmitted data integrity is protected against modification.',
                quickTip: 'Show integrity protection mechanisms like digital signatures or checksums.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning to implement digital signatures for critical data transmissions.'
              },
              {
                id: 'sc-11-3',
                title: 'Are encryption keys properly managed for transmission?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Verify that encryption keys used for transmission are properly managed.',
                quickTip: 'Document key management procedures for transmission encryption.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-4',
                title: 'Is wireless transmission properly secured?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Ensure that wireless communications are properly secured.',
                quickTip: 'Document wireless security controls and encryption methods.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-5',
                title: 'Are transmission protocols regularly updated?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Verify that transmission protocols are kept up to date.',
                quickTip: 'Show procedures for updating transmission protocols and standards.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-6',
                title: 'Is transmission monitoring implemented?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Ensure that data transmissions are monitored for security events.',
                quickTip: 'Document transmission monitoring capabilities and procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-7',
                title: 'Are transmission errors detected and handled?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Verify that transmission errors are detected and properly handled.',
                quickTip: 'Show error detection and handling procedures for transmissions.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-8',
                title: 'Is transmission path validation performed?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Ensure that transmission paths are validated for security.',
                quickTip: 'Document path validation procedures for secure transmissions.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-9',
                title: 'Are transmission security policies enforced?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Verify that transmission security policies are consistently enforced.',
                quickTip: 'Show how transmission security policies are implemented and enforced.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'sc-11-10',
                title: 'Is transmission security regularly tested?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Ensure that transmission security controls are regularly tested.',
                quickTip: 'Document testing procedures for transmission security controls.',
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
        totalQuestions: 30,
        answeredQuestions: 15,
        controls: [
          {
            id: 'ac-l2-001',
            name: 'AC.L2-3.1.1 - Account Management',
            description: 'Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts.',
            totalQuestions: 15,
            answeredQuestions: 8,
            questions: [
              {
                id: 'ac-l2-001-1',
                title: 'Do you have documented procedures for account management?',
                questionNumber: 1,
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
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
                totalInControl: 15,
                description: 'Ensure that inactive accounts are identified and disabled promptly.',
                quickTip: 'Document the process for identifying and disabling inactive accounts.',
                currentResponse: 'YES',
                evidence: ['Inactive Account Report.xlsx'],
                comments: 'Automated process disables accounts after 90 days of inactivity.'
              },
              {
                id: 'ac-l2-001-5',
                title: 'Are account privileges assigned based on job functions?',
                questionNumber: 5,
                totalInControl: 15,
                description: 'Verify that account privileges align with user job responsibilities.',
                quickTip: 'Show role-based access control implementation and job function mapping.',
                currentResponse: 'YES',
                evidence: ['RBAC Matrix.xlsx', 'Job Function Mapping.pdf'],
                comments: 'Role-based access control implemented with job function alignment.'
              },
              {
                id: 'ac-l2-001-6',
                title: 'Is there a process for emergency account access?',
                questionNumber: 6,
                totalInControl: 15,
                description: 'Ensure procedures exist for emergency access when needed.',
                quickTip: 'Document emergency access procedures and approval requirements.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Developing emergency access procedures with break-glass functionality.'
              },
              {
                id: 'ac-l2-001-7',
                title: 'Are shared accounts monitored more closely?',
                questionNumber: 7,
                totalInControl: 15,
                description: 'Verify that any shared accounts have enhanced monitoring and controls.',
                quickTip: 'Show additional monitoring and logging for shared accounts.',
                currentResponse: 'YES',
                evidence: ['Shared Account Monitoring.pdf'],
                comments: 'Enhanced logging and monitoring for the few remaining shared accounts.'
              },
              {
                id: 'ac-l2-001-8',
                title: 'Is account termination handled securely?',
                questionNumber: 8,
                totalInControl: 15,
                description: 'Ensure that account termination follows secure procedures.',
                quickTip: 'Document the account termination process and security considerations.',
                currentResponse: 'YES',
                evidence: ['Account Termination Checklist.pdf'],
                comments: 'Secure account termination process integrated with HR offboarding.'
              },
              {
                id: 'ac-l2-001-9',
                title: 'Are account management activities audited?',
                questionNumber: 9,
                totalInControl: 15,
                description: 'Verify that all account management activities are properly audited.',
                quickTip: 'Show audit logs for account creation, modification, and deletion.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-10',
                title: 'Is account information kept current and accurate?',
                questionNumber: 10,
                totalInControl: 15,
                description: 'Ensure that account information is maintained accurately and kept current.',
                quickTip: 'Document procedures for maintaining accurate account information.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-11',
                title: 'Are account management roles and responsibilities defined?',
                questionNumber: 11,
                totalInControl: 15,
                description: 'Verify that roles and responsibilities for account management are clearly defined.',
                quickTip: 'Show role definitions and responsibilities for account management.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-12',
                title: 'Is account management training provided to relevant personnel?',
                questionNumber: 12,
                totalInControl: 15,
                description: 'Ensure that personnel responsible for account management receive appropriate training.',
                quickTip: 'Document training programs for account management personnel.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-13',
                title: 'Are account management procedures regularly tested?',
                questionNumber: 13,
                totalInControl: 15,
                description: 'Verify that account management procedures are regularly tested and validated.',
                quickTip: 'Show testing procedures and results for account management processes.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-14',
                title: 'Is account management integrated with HR processes?',
                questionNumber: 14,
                totalInControl: 15,
                description: 'Ensure that account management is properly integrated with HR processes.',
                quickTip: 'Document integration between account management and HR systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-001-15',
                title: 'Are account management metrics collected and analyzed?',
                questionNumber: 15,
                totalInControl: 15,
                description: 'Verify that metrics are collected and analyzed for account management effectiveness.',
                quickTip: 'Show metrics and analysis for account management processes.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: 'ac-l2-002',
            name: 'AC.L2-3.1.2 - Access Enforcement',
            description: 'Enforce approved authorizations for logical access to information and system resources.',
            totalQuestions: 15,
            answeredQuestions: 7,
            questions: [
              {
                id: 'ac-l2-002-1',
                title: 'Are access control policies enforced through technical means?',
                questionNumber: 1,
                totalInControl: 15,
                description: 'Verify that access control policies are technically enforced.',
                quickTip: 'Show technical implementation of access control policies.',
                currentResponse: 'YES',
                evidence: ['Technical Access Controls.pdf'],
                comments: 'Access control policies enforced through Active Directory and security groups.'
              },
              {
                id: 'ac-l2-002-2',
                title: 'Is logical access to information and system resources controlled?',
                questionNumber: 2,
                totalInControl: 15,
                description: 'Ensure that logical access to resources is properly controlled.',
                quickTip: 'Document logical access control mechanisms and their scope.',
                currentResponse: 'YES',
                evidence: ['Logical Access Matrix.xlsx'],
                comments: 'Comprehensive logical access controls implemented across all systems.'
              },
              {
                id: 'ac-l2-002-3',
                title: 'Are access permissions granted based on approved authorizations?',
                questionNumber: 3,
                totalInControl: 15,
                description: 'Verify that access permissions match approved authorizations.',
                quickTip: 'Show how access permissions are validated against authorizations.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Implementing automated validation of permissions against authorizations.'
              },
              {
                id: 'ac-l2-002-4',
                title: 'Is access enforcement consistent across all systems?',
                questionNumber: 4,
                totalInControl: 15,
                description: 'Ensure that access enforcement is consistent across the organization.',
                quickTip: 'Document standardization of access enforcement across systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-5',
                title: 'Are access control violations detected and reported?',
                questionNumber: 5,
                totalInControl: 15,
                description: 'Verify that access control violations are detected and properly reported.',
                quickTip: 'Show violation detection mechanisms and reporting procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-6',
                title: 'Is access enforcement tested regularly?',
                questionNumber: 6,
                totalInControl: 15,
                description: 'Ensure that access enforcement mechanisms are regularly tested.',
                quickTip: 'Document testing procedures for access enforcement controls.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-7',
                title: 'Are access enforcement logs maintained and reviewed?',
                questionNumber: 7,
                totalInControl: 15,
                description: 'Verify that access enforcement activities are logged and reviewed.',
                quickTip: 'Show access enforcement logging and review procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-8',
                title: 'Is access enforcement configuration managed?',
                questionNumber: 8,
                totalInControl: 15,
                description: 'Ensure that access enforcement configurations are properly managed.',
                quickTip: 'Document configuration management for access enforcement systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-9',
                title: 'Are access enforcement exceptions properly documented?',
                questionNumber: 9,
                totalInControl: 15,
                description: 'Verify that any exceptions to access enforcement are documented and approved.',
                quickTip: 'Show exception handling procedures and documentation.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-10',
                title: 'Is access enforcement effectiveness measured?',
                questionNumber: 10,
                totalInControl: 15,
                description: 'Ensure that the effectiveness of access enforcement is measured and reported.',
                quickTip: 'Document metrics and measurements for access enforcement effectiveness.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-11',
                title: 'Are access enforcement controls integrated with other security controls?',
                questionNumber: 11,
                totalInControl: 15,
                description: 'Verify that access enforcement is integrated with other security controls.',
                quickTip: 'Show integration between access enforcement and other security systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-12',
                title: 'Is access enforcement scalable to meet organizational needs?',
                questionNumber: 12,
                totalInControl: 15,
                description: 'Ensure that access enforcement can scale with organizational growth.',
                quickTip: 'Document scalability considerations for access enforcement systems.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-13',
                title: 'Are access enforcement policies regularly updated?',
                questionNumber: 13,
                totalInControl: 15,
                description: 'Verify that access enforcement policies are kept current and relevant.',
                quickTip: 'Show policy update procedures and recent revisions.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-14',
                title: 'Is access enforcement training provided to administrators?',
                questionNumber: 14,
                totalInControl: 15,
                description: 'Ensure that administrators receive training on access enforcement systems.',
                quickTip: 'Document training programs for access enforcement administrators.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'ac-l2-002-15',
                title: 'Are access enforcement incidents properly investigated?',
                questionNumber: 15,
                totalInControl: 15,
                description: 'Verify that access enforcement incidents are thoroughly investigated.',
                quickTip: 'Show incident investigation procedures for access enforcement events.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      },
      {
        id: 'awareness-training',
        name: 'Awareness and Training',
        description: 'Ensure that organizational personnel are adequately trained',
        totalQuestions: 25,
        answeredQuestions: 10,
        controls: [
          {
            id: 'at-l2-001',
            name: 'AT.L2-3.2.1 - Security Awareness',
            description: 'Ensure that organizational personnel are provided with security awareness education.',
            totalQuestions: 12,
            answeredQuestions: 5,
            questions: [
              {
                id: 'at-l2-001-1',
                title: 'Is security awareness training provided to all personnel?',
                questionNumber: 1,
                totalInControl: 12,
                description: 'Verify that all organizational personnel receive security awareness training.',
                quickTip: 'Document training programs and attendance records.',
                currentResponse: 'YES',
                evidence: ['Security Training Program.pdf', 'Training Attendance Records.xlsx'],
                comments: 'Annual security awareness training mandatory for all employees.'
              },
              {
                id: 'at-l2-001-2',
                title: 'Is training content updated regularly to address current threats?',
                questionNumber: 2,
                totalInControl: 12,
                description: 'Ensure that training content reflects current security threats and best practices.',
                quickTip: 'Show how training content is updated and kept current.',
                currentResponse: 'YES',
                evidence: ['Training Content Updates.pdf'],
                comments: 'Training content updated quarterly to address emerging threats.'
              },
              {
                id: 'at-l2-001-3',
                title: 'Is training effectiveness measured and evaluated?',
                questionNumber: 3,
                totalInControl: 12,
                description: 'Verify that the effectiveness of security training is measured.',
                quickTip: 'Document training effectiveness metrics and evaluation methods.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning to implement training effectiveness metrics and testing.'
              },
              {
                id: 'at-l2-001-4',
                title: 'Is role-specific security training provided?',
                questionNumber: 4,
                totalInControl: 12,
                description: 'Ensure that personnel receive training specific to their security roles.',
                quickTip: 'Show role-specific training programs and their content.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Developing role-specific training modules for different job functions.'
              },
              {
                id: 'at-l2-001-5',
                title: 'Are training records maintained and tracked?',
                questionNumber: 5,
                totalInControl: 12,
                description: 'Verify that training records are properly maintained and tracked.',
                quickTip: 'Show training record keeping and tracking systems.',
                currentResponse: 'YES',
                evidence: ['Training Records Database.xlsx'],
                comments: 'Comprehensive training records maintained in HR system.'
              },
              {
                id: 'at-l2-001-6',
                title: 'Is refresher training provided on a regular basis?',
                questionNumber: 6,
                totalInControl: 12,
                description: 'Ensure that refresher training is provided to maintain awareness.',
                quickTip: 'Document refresher training schedule and requirements.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-7',
                title: 'Is training provided for new security technologies?',
                questionNumber: 7,
                totalInControl: 12,
                description: 'Verify that training is provided when new security technologies are implemented.',
                quickTip: 'Show training procedures for new technology implementations.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-8',
                title: 'Are training requirements defined for different roles?',
                questionNumber: 8,
                totalInControl: 12,
                description: 'Ensure that training requirements are defined based on job roles.',
                quickTip: 'Document training requirements matrix by role.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-9',
                title: 'Is training compliance monitored and enforced?',
                questionNumber: 9,
                totalInControl: 12,
                description: 'Verify that training compliance is monitored and enforced.',
                quickTip: 'Show compliance monitoring and enforcement procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-10',
                title: 'Is training feedback collected and used for improvement?',
                questionNumber: 10,
                totalInControl: 12,
                description: 'Ensure that training feedback is collected and used to improve programs.',
                quickTip: 'Document feedback collection and program improvement processes.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-11',
                title: 'Are training materials accessible to all required personnel?',
                questionNumber: 11,
                totalInControl: 12,
                description: 'Verify that training materials are accessible to all who need them.',
                quickTip: 'Show how training materials are distributed and accessed.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-001-12',
                title: 'Is specialized training provided for high-risk roles?',
                questionNumber: 12,
                totalInControl: 12,
                description: 'Ensure that personnel in high-risk roles receive specialized training.',
                quickTip: 'Document specialized training programs for high-risk positions.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: 'at-l2-002',
            name: 'AT.L2-3.2.2 - Insider Threat Awareness',
            description: 'Ensure that organizational personnel are trained to identify and report potential indicators of insider threats.',
            totalQuestions: 13,
            answeredQuestions: 5,
            questions: [
              {
                id: 'at-l2-002-1',
                title: 'Is insider threat awareness training provided to all personnel?',
                questionNumber: 1,
                totalInControl: 13,
                description: 'Verify that all personnel receive training on identifying insider threats.',
                quickTip: 'Document insider threat training programs and content.',
                currentResponse: 'YES',
                evidence: ['Insider Threat Training.pdf'],
                comments: 'Comprehensive insider threat awareness training provided annually.'
              },
              {
                id: 'at-l2-002-2',
                title: 'Are potential insider threat indicators clearly defined?',
                questionNumber: 2,
                totalInControl: 13,
                description: 'Ensure that indicators of potential insider threats are clearly defined.',
                quickTip: 'Show documentation of insider threat indicators and warning signs.',
                currentResponse: 'YES',
                evidence: ['Insider Threat Indicators.pdf'],
                comments: 'Clear documentation of behavioral and technical indicators.'
              },
              {
                id: 'at-l2-002-3',
                title: 'Is there a process for reporting suspected insider threats?',
                questionNumber: 3,
                totalInControl: 13,
                description: 'Verify that personnel know how to report suspected insider threats.',
                quickTip: 'Document reporting procedures and communication channels.',
                currentResponse: 'YES',
                evidence: ['Threat Reporting Procedures.pdf'],
                comments: 'Clear reporting procedures with multiple communication channels.'
              },
              {
                id: 'at-l2-002-4',
                title: 'Are insider threat reports investigated promptly?',
                questionNumber: 4,
                totalInControl: 13,
                description: 'Ensure that reported insider threats are investigated in a timely manner.',
                quickTip: 'Show investigation procedures and response timelines.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Developing formal investigation procedures with defined timelines.'
              },
              {
                id: 'at-l2-002-5',
                title: 'Is insider threat training tailored to different roles?',
                questionNumber: 5,
                totalInControl: 13,
                description: 'Verify that insider threat training is customized for different organizational roles.',
                quickTip: 'Document role-specific insider threat training content.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Planning role-specific training modules for managers and technical staff.'
              },
              {
                id: 'at-l2-002-6',
                title: 'Are insider threat policies communicated organization-wide?',
                questionNumber: 6,
                totalInControl: 13,
                description: 'Ensure that insider threat policies are communicated to all personnel.',
                quickTip: 'Show policy communication and acknowledgment procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-7',
                title: 'Is insider threat training effectiveness evaluated?',
                questionNumber: 7,
                totalInControl: 13,
                description: 'Verify that the effectiveness of insider threat training is evaluated.',
                quickTip: 'Document evaluation methods for insider threat training.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-8',
                title: 'Are insider threat scenarios included in training?',
                questionNumber: 8,
                totalInControl: 13,
                description: 'Ensure that training includes realistic insider threat scenarios.',
                quickTip: 'Show training scenarios and case studies used.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-9',
                title: 'Is insider threat training updated based on lessons learned?',
                questionNumber: 9,
                totalInControl: 13,
                description: 'Verify that training is updated based on actual incidents and lessons learned.',
                quickTip: 'Document how lessons learned are incorporated into training.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-10',
                title: 'Are managers trained to recognize insider threat indicators?',
                questionNumber: 10,
                totalInControl: 13,
                description: 'Ensure that managers receive specific training on recognizing insider threats.',
                quickTip: 'Document manager-specific insider threat training.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-11',
                title: 'Is insider threat awareness reinforced through ongoing communications?',
                questionNumber: 11,
                totalInControl: 13,
                description: 'Verify that insider threat awareness is reinforced through regular communications.',
                quickTip: 'Show ongoing communication strategies for insider threat awareness.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-12',
                title: 'Are insider threat training records maintained?',
                questionNumber: 12,
                totalInControl: 13,
                description: 'Ensure that records of insider threat training are properly maintained.',
                quickTip: 'Document training record keeping for insider threat programs.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'at-l2-002-13',
                title: 'Is insider threat training integrated with general security training?',
                questionNumber: 13,
                totalInControl: 13,
                description: 'Verify that insider threat training is integrated with broader security training.',
                quickTip: 'Show integration between insider threat and general security training.',
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
        totalQuestions: 18,
        answeredQuestions: 8,
        controls: [
          {
            id: 'a5-1-1',
            name: 'A.5.1.1 - Information Security Policy',
            description: 'A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.',
            totalQuestions: 12,
            answeredQuestions: 6,
            questions: [
              {
                id: 'iso-a5-1-1-1',
                title: 'Has an information security policy been established?',
                questionNumber: 1,
                totalInControl: 12,
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
                totalInControl: 12,
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
                totalInControl: 12,
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
                totalInControl: 12,
                description: 'Ensure that the policy is reviewed and updated on a regular basis.',
                quickTip: 'Show the review schedule and any recent updates to the policy.',
                currentResponse: 'YES',
                evidence: ['Policy Review Schedule.pdf'],
                comments: 'Annual policy review with updates as needed for regulatory changes.'
              },
              {
                id: 'iso-a5-1-1-5',
                title: 'Are roles and responsibilities clearly defined in the policy?',
                questionNumber: 5,
                totalInControl: 12,
                description: 'Verify that information security roles and responsibilities are clearly outlined.',
                quickTip: 'Show how roles and responsibilities are defined and assigned.',
                currentResponse: 'YES',
                evidence: ['Security Roles Matrix.pdf'],
                comments: 'Clear definition of security roles and responsibilities across the organization.'
              },
              {
                id: 'iso-a5-1-1-6',
                title: 'Is compliance with the policy monitored and enforced?',
                questionNumber: 6,
                totalInControl: 12,
                description: 'Ensure that policy compliance is actively monitored and enforced.',
                quickTip: 'Provide evidence of compliance monitoring and enforcement actions.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Implementing automated compliance monitoring tools.'
              },
              {
                id: 'iso-a5-1-1-7',
                title: 'Are policy violations investigated and addressed?',
                questionNumber: 7,
                totalInControl: 12,
                description: 'Verify that policy violations are properly investigated and addressed.',
                quickTip: 'Document violation investigation and remediation procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-8',
                title: 'Is the policy aligned with business objectives?',
                questionNumber: 8,
                totalInControl: 12,
                description: 'Ensure that the security policy aligns with organizational business objectives.',
                quickTip: 'Show how policy objectives align with business goals.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-9',
                title: 'Are policy exceptions properly documented and approved?',
                questionNumber: 9,
                totalInControl: 12,
                description: 'Verify that any exceptions to the policy are documented and approved.',
                quickTip: 'Document exception handling procedures and approvals.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-10',
                title: 'Is the policy accessible to all relevant personnel?',
                questionNumber: 10,
                totalInControl: 12,
                description: 'Ensure that the policy is easily accessible to all who need it.',
                quickTip: 'Show how the policy is made available and accessible.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-11',
                title: 'Is policy training effectiveness measured?',
                questionNumber: 11,
                totalInControl: 12,
                description: 'Verify that the effectiveness of policy training is measured.',
                quickTip: 'Document training effectiveness measurement methods.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-1-12',
                title: 'Are policy updates communicated in a timely manner?',
                questionNumber: 12,
                totalInControl: 12,
                description: 'Ensure that policy updates are communicated promptly to all affected personnel.',
                quickTip: 'Show communication procedures for policy updates.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: 'a5-1-2',
            name: 'A.5.1.2 - Review of Information Security Policies',
            description: 'Information security policies should be reviewed at planned intervals or if significant changes occur.',
            totalQuestions: 6,
            answeredQuestions: 2,
            questions: [
              {
                id: 'iso-a5-1-2-1',
                title: 'Are information security policies reviewed at planned intervals?',
                questionNumber: 1,
                totalInControl: 6,
                description: 'Verify that policies are reviewed according to a planned schedule.',
                quickTip: 'Document the review schedule and recent review activities.',
                currentResponse: 'YES',
                evidence: ['Policy Review Schedule.pdf'],
                comments: 'Annual policy reviews conducted with documented schedule.'
              },
              {
                id: 'iso-a5-1-2-2',
                title: 'Are policies reviewed when significant changes occur?',
                questionNumber: 2,
                totalInControl: 6,
                description: 'Ensure that policies are reviewed when significant organizational changes occur.',
                quickTip: 'Show how policy reviews are triggered by organizational changes.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Developing triggers for policy review based on organizational changes.'
              },
              {
                id: 'iso-a5-1-2-3',
                title: 'Are review results documented and acted upon?',
                questionNumber: 3,
                totalInControl: 6,
                description: 'Verify that policy review results are documented and appropriate actions taken.',
                quickTip: 'Document review findings and resulting policy updates.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-2-4',
                title: 'Are stakeholders involved in policy reviews?',
                questionNumber: 4,
                totalInControl: 6,
                description: 'Ensure that appropriate stakeholders participate in policy reviews.',
                quickTip: 'Show stakeholder involvement in policy review processes.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-2-5',
                title: 'Are policy review criteria established?',
                questionNumber: 5,
                totalInControl: 6,
                description: 'Verify that criteria for policy reviews are established and followed.',
                quickTip: 'Document the criteria used for evaluating policies during reviews.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a5-1-2-6',
                title: 'Are policy review responsibilities assigned?',
                questionNumber: 6,
                totalInControl: 6,
                description: 'Ensure that responsibilities for policy reviews are clearly assigned.',
                quickTip: 'Show role assignments for policy review activities.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          }
        ]
      },
      {
        id: 'organization-information-security',
        name: 'Organization of Information Security',
        description: 'Establish a management framework to initiate and control implementation of information security',
        totalQuestions: 20,
        answeredQuestions: 6,
        controls: [
          {
            id: 'a6-1-1',
            name: 'A.6.1.1 - Information Security Roles and Responsibilities',
            description: 'All information security responsibilities should be defined and allocated.',
            totalQuestions: 10,
            answeredQuestions: 4,
            questions: [
              {
                id: 'iso-a6-1-1-1',
                title: 'Are information security roles clearly defined?',
                questionNumber: 1,
                totalInControl: 10,
                description: 'Verify that all information security roles are clearly defined and documented.',
                quickTip: 'Document all security roles and their specific responsibilities.',
                currentResponse: 'YES',
                evidence: ['Security Roles Definition.pdf'],
                comments: 'Comprehensive definition of all security roles across the organization.'
              },
              {
                id: 'iso-a6-1-1-2',
                title: 'Are security responsibilities allocated to specific individuals?',
                questionNumber: 2,
                totalInControl: 10,
                description: 'Ensure that security responsibilities are assigned to specific personnel.',
                quickTip: 'Show responsibility assignments and accountability matrix.',
                currentResponse: 'YES',
                evidence: ['Security Responsibility Matrix.xlsx'],
                comments: 'Clear assignment of security responsibilities to named individuals.'
              },
              {
                id: 'iso-a6-1-1-3',
                title: 'Are conflicting duties and areas of responsibility separated?',
                questionNumber: 3,
                totalInControl: 10,
                description: 'Verify that conflicting duties are identified and separated.',
                quickTip: 'Document separation of duties analysis and implementation.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Conducting separation of duties analysis for critical security functions.'
              },
              {
                id: 'iso-a6-1-1-4',
                title: 'Are security responsibilities communicated to personnel?',
                questionNumber: 4,
                totalInControl: 10,
                description: 'Ensure that security responsibilities are clearly communicated.',
                quickTip: 'Show how security responsibilities are communicated and acknowledged.',
                currentResponse: 'YES',
                evidence: ['Security Responsibility Communication.pdf'],
                comments: 'Security responsibilities communicated through job descriptions and training.'
              },
              {
                id: 'iso-a6-1-1-5',
                title: 'Are security roles reviewed and updated regularly?',
                questionNumber: 5,
                totalInControl: 10,
                description: 'Verify that security roles are reviewed and updated as needed.',
                quickTip: 'Document role review procedures and update history.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-1-6',
                title: 'Is there adequate coverage for all security functions?',
                questionNumber: 6,
                totalInControl: 10,
                description: 'Ensure that all necessary security functions have assigned personnel.',
                quickTip: 'Show coverage analysis for all security functions.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-1-7',
                title: 'Are backup personnel identified for critical security roles?',
                questionNumber: 7,
                totalInControl: 10,
                description: 'Verify that backup personnel are identified for critical security functions.',
                quickTip: 'Document backup assignments for critical security roles.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-1-8',
                title: 'Are security role qualifications defined?',
                questionNumber: 8,
                totalInControl: 10,
                description: 'Ensure that qualifications for security roles are clearly defined.',
                quickTip: 'Document required qualifications and competencies for security roles.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-1-9',
                title: 'Is security role performance monitored?',
                questionNumber: 9,
                totalInControl: 10,
                description: 'Verify that performance in security roles is monitored and evaluated.',
                quickTip: 'Show performance monitoring and evaluation procedures.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-1-10',
                title: 'Are security responsibilities included in job descriptions?',
                questionNumber: 10,
                totalInControl: 10,
                description: 'Ensure that security responsibilities are formally included in job descriptions.',
                quickTip: 'Show job descriptions that include security responsibilities.',
                currentResponse: null,
                evidence: [],
                comments: ''
              }
            ]
          },
          {
            id: 'a6-1-2',
            name: 'A.6.1.2 - Segregation of Duties',
            description: 'Conflicting duties and areas of responsibility should be segregated to reduce opportunities for unauthorized or unintentional modification or misuse of the organization\'s assets.',
            totalQuestions: 6,
            answeredQuestions: 2,
            questions: [
              {
                id: 'iso-a6-1-2-1',
                title: 'Have conflicting duties been identified?',
                questionNumber: 1,
                totalInControl: 6,
                description: 'Verify that conflicting duties have been identified and documented.',
                quickTip: 'Document analysis of conflicting duties and potential conflicts.',
                currentResponse: 'YES',
                evidence: ['Conflicting Duties Analysis.pdf'],
                comments: 'Comprehensive analysis of conflicting duties completed.'
              },
              {
                id: 'iso-a6-1-2-2',
                title: 'Are conflicting duties properly segregated?',
                questionNumber: 2,
                totalInControl: 6,
                description: 'Ensure that identified conflicting duties are properly segregated.',
                quickTip: 'Show how conflicting duties are separated in practice.',
                currentResponse: 'PLAN',
                evidence: [],
                comments: 'Implementing segregation controls for identified conflicts.'
              },
              {
                id: 'iso-a6-1-2-3',
                title: 'Are compensating controls implemented where segregation is not possible?',
                questionNumber: 3,
                totalInControl: 6,
                description: 'Verify that compensating controls exist where complete segregation is not feasible.',
                quickTip: 'Document compensating controls for unavoidable conflicts.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-2-4',
                title: 'Is segregation of duties regularly reviewed?',
                questionNumber: 4,
                totalInControl: 6,
                description: 'Ensure that segregation of duties is periodically reviewed and updated.',
                quickTip: 'Show review procedures for segregation of duties.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-2-5',
                title: 'Are segregation violations detected and reported?',
                questionNumber: 5,
                totalInControl: 6,
                description: 'Verify that violations of segregation of duties are detected and reported.',
                quickTip: 'Document detection and reporting mechanisms for segregation violations.',
                currentResponse: null,
                evidence: [],
                comments: ''
              },
              {
                id: 'iso-a6-1-2-6',
                title: 'Is segregation of duties training provided?',
                questionNumber: 6,
                totalInControl: 6,
                description: 'Ensure that personnel understand segregation of duties requirements.',
                quickTip: 'Document training on segregation of duties principles and requirements.',
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
      <div className="flex-1 flex overflow-hidden">
            <div className="p-6">
        <div className={`bg-gray-50 transition-all duration-300 ${showHelp ? 'flex-1' : 'w-full'}`}>
                <div className="max-w-4xl">
          <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                      <div className="text-sm text-blue-600">
                        {selectedControl.answeredQuestions} / {selectedControl.totalQuestions} answered
                <p className="text-gray-600 mb-3 text-sm">{currentControl.description}</p>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedControl.description}</p>
                    
                  <div className="flex-1 max-w-sm">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getControlProgress()}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-700">
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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          className="cursor-pointer inline-block mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Choose Files
                        </label>
                      </div>
                        <p className="text-xs font-medium text-blue-900 mb-1">Quick Tip:</p>
                        <p className="text-xs text-blue-800">{question.quickTip}</p>
                    {/* Additional Comments */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Comments
                      </label>
                      <textarea
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Your Response</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
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
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Supporting Evidence</label>
                        >
                          {saving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <div className="mb-3 space-y-1">
                            <Save className="h-4 w-4 mr-2" />
                        <div key={fileIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                            <span className="text-xs font-medium text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-400">({file.size})</span>
                          onClick={() => {
                            if (currentQuestionIndex < selectedControl.questions.length - 1) {
                            <button className="text-blue-600 hover:text-blue-800 text-xs">View</button>
                            <button className="text-red-600 hover:text-red-800 text-xs">Remove</button>
                          }}
                          disabled={currentQuestionIndex === selectedControl.questions.length - 1}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </button>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    </div>
                    <p className="text-xs font-medium text-blue-600 mb-1">Upload</p>
                    <p className="text-xs text-gray-400">Upload documents, screenshots, or other evidence (PDF, DOC, JPG, PNG)</p>
                  {/* Additional spacing for scrolling */}
                  <div className="h-20"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Additional Comments</label>
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Available</h3>
                    <p className="text-gray-600">Select a framework and control to begin the assessment.</p>
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    rows={2}
              )}
            </div>
          </div>

          {/* Sticky Help Panel */}
          {showHelp && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col sticky top-0 h-screen">
            <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200 sticky bottom-0 z-30">
                <h3 className="font-semibold text-gray-900">Control Help</h3>
                <button
                  onClick={() => setShowHelp(false)}
                className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {/* Control Description */}
                <div>
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    <Info className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Control Description</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedControl?.description || 'Select a control to view its description.'}
                  </p>
                </div>
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
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
          <div className="w-80 bg-white border-l border-gray-200 sticky top-0 h-screen overflow-hidden">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">User Account Management Guide</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Identity Management Procedures</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-gray-500" />
            <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
                    </div>
                  </div>
                </div>

                  <h4 className="font-medium text-gray-900 text-sm">Control Description</h4>
                <div>
                <p className="text-xs text-gray-600 leading-relaxed">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Answering Tips</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-700">YES:</p>
                  <h4 className="font-medium text-gray-900 text-sm">Relevant Documents</h4>
                      </div>
                <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded border hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                      <span className="text-xs text-gray-700">{doc}</span>
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
                  <h4 className="font-medium text-gray-900 text-sm">Answering Tips</h4>
                      <div>
                <div className="space-y-2">
                        <p className="text-gray-600">Choose when the control doesn't apply to your organization.</p>
                      </div>
                    </div>
                      <p className="text-xs font-medium text-green-700">YES:</p>
                      <p className="text-xs text-green-600">Choose when the control is fully implemented and documented with evidence.</p>

                {/* Progress Summary */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                      <p className="text-xs font-medium text-red-700">NO:</p>
                      <p className="text-xs text-red-600">Choose when the control is not implemented or significantly lacking.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Control:</span>
                      <span className="font-medium text-gray-900">{getControlProgress()}%</span>
                    </div>
                      <p className="text-xs font-medium text-yellow-700">PLAN:</p>
                      <p className="text-xs text-yellow-600">Choose when you have a plan to implement but haven't started yet.</p>
          <div className="p-4 space-y-6 overflow-y-auto h-full">
                    </div>
              <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <span className="text-gray-600">Questions Remaining:</span>
                <div className="flex items-start space-x-3 mb-4">
                      <p className="text-xs font-medium text-gray-700">NOT APPLICABLE:</p>
                      <p className="text-xs text-gray-600">Choose when the control doesn't apply to your organization.</p>
                <p className="text-sm font-semibold text-blue-600">
                  </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
              </div>
            </div>
                    <p className="text-gray-600 text-xs mb-3">{question.description}</p>
                    <p className="text-xs text-gray-400">
      </div>
    </div>
  );
};

export default ClientAssessments;