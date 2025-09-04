import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

const ClientAssessments = () => {
  const location = useLocation();
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedControl, setSelectedControl] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [evidence, setEvidence] = useState({});
  const [actionPlans, setActionPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [frameworks, setFrameworks] = useState([]);
  const [currentFramework, setCurrentFramework] = useState('');
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedControlId, setSelectedControlId] = useState(null);
  const [apiControls, setApiControls] = useState([]);
  const [controlQuestions, setControlQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [showControlDropdown, setShowControlDropdown] = useState(false);
  const [progress, setProgress] = useState(0);

  const topNavRef = useRef(null);
  const controlDropdownRef = useRef(null);
  const helpPanelRef = useRef(null);

  // Mock frameworks data
  const mockFrameworks = [
    {
      id: 'cmmc-level-1',
      name: 'CMMC Level 1',
      description: 'Cybersecurity Maturity Model Certification Level 1',
      version: 'Level 1',
      totalQuestions: 17,
      answeredQuestions: 8,
      progress: 47,
      domains: []
    },
    {
      id: 'cmmc-level-2',
      name: 'CMMC Level 2',
      description: 'Cybersecurity Maturity Model Certification Level 2',
      version: 'Level 2',
      totalQuestions: 110,
      answeredQuestions: 72,
      progress: 65,
      domains: []
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      version: '2022',
      totalQuestions: 95,
      answeredQuestions: 43,
      progress: 45,
      domains: []
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      // Check if a specific framework was selected from navigation
      const selectedFrameworkId = location.state?.selectedFrameworkId || 'cmmc-level-1';
      
      const framework = mockFrameworks.find(f => f.id === selectedFrameworkId);
      if (framework) {
        setSelectedFramework(framework);
        setCurrentFramework(framework.id);
        setFrameworks(mockFrameworks);
      }
      
      setLoading(false);
    }, 500);
  }, [location.state]);

  const selectedApiControl = selectedControl;

  const handleResponseChange = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleCommentChange = (questionId, comment) => {
    setComments(prev => ({
      ...prev,
      [questionId]: comment
    }));
  };

  const handleActionPlanChange = (questionId, field, value) => {
    setActionPlans(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const handleEvidenceUpload = (questionId, files) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString()
      }));
      
      setEvidence(prev => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), ...newFiles]
      }));
    }
  };

  const handleEvidenceRemove = (questionId, index) => {
    setEvidence(prev => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, i) => i !== index)
    }));
  };

  const handleFrameworkChange = (frameworkId) => {
    const framework = mockFrameworks.find(f => f.id === frameworkId);
    setSelectedFramework(framework);
    setCurrentFramework(frameworkId);
    if (framework) {
      // Reset selections when framework changes
      setSelectedDomain(null);
      setSelectedControl(null);
      setSelectedDomainId(null);
      setSelectedControlId(null);
      setControlQuestions([]);
    }
  };

  const handleApiDomainChange = (domainId) => {
    setSelectedDomainId(domainId);
    // Reset control selection when domain changes
    setSelectedControl(null);
    setSelectedControlId(null);
    setControlQuestions([]);
  };

  const fetchControlQuestions = async (controlId) => {
    setIsLoadingQuestions(true);
    // Mock API call
    setTimeout(() => {
      const mockQuestions = [
        {
          question_id: 1,
          question: "Are users uniquely identified before accessing information systems?",
          description: "Verify that each user has a unique identifier for system access.",
          quick_tip: "Document user identification methods and ensure no shared identifiers.",
          response_options: ["yes", "no", "plan", "not_applicable"]
        },
        {
          question_id: 2,
          question: "Are users authenticated before accessing information systems?",
          description: "Confirm that users must authenticate their identity before system access.",
          quick_tip: "Show authentication mechanisms like passwords, tokens, or biometrics.",
          response_options: ["yes", "no", "plan", "not_applicable"]
        }
      ];
      setControlQuestions(mockQuestions);
      setIsLoadingQuestions(false);
    }, 1000);
  };

  const saveCurrentState = () => {
    // Mock save function
    console.log('Saving current state...');
  };

  const calculateFrameworkProgress = () => {
    const answered = Object.keys(responses).length;
    const total = controlQuestions.length || 1;
    const percentage = Math.round((answered / total) * 100);
    return { answered, total, percentage };
  };

  const handlePreviousControl = () => {
    // Mock navigation to previous control
    console.log('Navigate to previous control');
  };

  const handleNextControl = () => {
    // Mock navigation to next control
    console.log('Navigate to next control');
  };

  const handleSaveAndContinue = () => {
    // Mock save and continue
    console.log('Save and continue later');
  };

  const handleFinishAssessment = () => {
    // Mock finish assessment
    console.log('Finish assessment');
  };

  const canGoToPreviousControl = () => {
    return true; // Mock implementation
  };

  const isLastControl = () => {
    return false; // Mock implementation
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sticky Top Navigation with Dropdowns */}
      <div className="flex-1 flex flex-col">
        <div ref={topNavRef} className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-700 mb-1">Framework</label>
                  <select
                    value={currentFramework}
                    onChange={(e) => handleFrameworkChange(e.target.value)}
                    className="min-w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  >
                    {frameworks.map((fw) => (
                      <option key={fw.id} value={fw.id}>
                        {fw.name}
                      </option>
                    ))}
                    {frameworks.length === 0 && (
                      <option value="">Loading frameworks...</option>
                    )}
                  </select>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 mb-2" />
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-700 mb-1">Domain</label>
                  <select
                    value={selectedDomainId ?? ""}
                    onChange={(e) => handleApiDomainChange(e.target.value)}
                    className="min-w-[220px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  >
                    {Array.isArray(selectedFramework?.domains) &&
                      selectedFramework.domains.map((domain) => (
                        <option key={domain.id} value={domain.id}>
                          {domain.name}
                        </option>
                      ))}
                    {(!selectedFramework?.domains ||
                      (Array.isArray(selectedFramework?.domains) &&
                        selectedFramework.domains.length === 0)) && (
                      <option value="">Loading domains...</option>
                    )}
                  </select>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 mb-2" />
                <div className="flex flex-col min-w-[320px]">
                  <label className="text-xs font-medium text-gray-700 mb-1">Control</label>
                  <div className="relative" ref={controlDropdownRef}>
                    <button
                      onClick={() => setShowControlDropdown(!showControlDropdown)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between text-sm"
                      disabled={!apiControls.length}
                    >
                      <span className="truncate">
                        {selectedApiControl
                          ? `${selectedApiControl.id} - ${selectedApiControl.title}`
                          : "Select control"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          showControlDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showControlDropdown && Array.isArray(apiControls) && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-20">
                        {apiControls.length > 0 ? (
                          apiControls.map((control) => (
                            <button
                              key={control.id}
                              onClick={() => {
                                setSelectedControlId(control.id);
                                setShowControlDropdown(false);
                                fetchControlQuestions(control.id);
                                saveCurrentState();
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                                String(control.id) === String(selectedControlId)
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-900"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {control.id} - {control.title}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500 text-center">
                            Loading controls...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  disabled={!selectedApiControl}
                  className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </button>
                <div className="text-sm text-gray-600 font-medium">{progress || 0}% Complete</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Framework Progress</span>
                <span className="text-xs text-blue-600 font-medium">
                  {calculateFrameworkProgress().answered} / {calculateFrameworkProgress().total} questions ({calculateFrameworkProgress().percentage}% Complete)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateFrameworkProgress().percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Questions Content */}
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${showHelp ? '' : 'w-full'}`}>
            {/* Sticky Control Header */}
            {selectedApiControl && (
              <div className="sticky top-0 z-30 bg-blue-600 text-white p-4 border-b border-blue-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold mb-1">
                      {selectedApiControl.id} - {selectedApiControl.title}
                    </h1>
                    <p className="text-blue-100 text-sm">
                      {selectedApiControl.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs">
                      {controlQuestions.length} questions
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {controlQuestions.filter(q => responses[q.question_id]).length} / {controlQuestions.length} answered
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-blue-500 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${controlQuestions.length > 0 ? Math.round((controlQuestions.filter(q => responses[q.question_id]).length / controlQuestions.length) * 100) : 0}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="p-4">
              {/* Questions */}
              {isLoadingQuestions ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading questions...</p>
                  </div>
                </div>
              ) : controlQuestions.length > 0 ? (
                <div className="space-y-4">
                  {controlQuestions.map((question, index) => (
                <div
                  key={question.question_id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
                >
                  {/* Question Header */}
                  <div className="mb-3">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {question.question}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {question.description}
                        </p>
                      </div>
                    </div>

                    {/* Quick Tip */}
                    <div className="mt-2 bg-blue-50 rounded-lg p-2">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-blue-900">
                            Quick Tip:
                          </p>
                          <p className="text-xs text-blue-800">
                            {question.quick_tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Options */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Your Response
                    </h4>
                    <div className="grid grid-cols-4 gap-1">
                      {question.response_options.map((option) => {
                        const optionConfig = {
                          yes: { value: "yes", label: "YES", color: "green" },
                          no: { value: "no", label: "NO", color: "red" },
                          plan: { value: "plan", label: "PLAN", color: "orange" },
                          not_applicable: { value: "not_applicable", label: "NOT APPLICABLE", color: "gray" },
                        };

                        const config = optionConfig[option];
                        if (!config) return null;

                        return (
                          <button
                            key={option}
                            onClick={() =>
                              handleResponseChange(question.question_id, config.value)
                            }
                            className={`p-1.5 rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 ${
                              responses[question.question_id] === config.value
                                ? config.color === "green"
                                  ? "border-green-500 bg-green-50 text-green-800"
                                  : config.color === "red"
                                  ? "border-red-500 bg-red-50 text-red-800"
                                  : config.color === "orange"
                                  ? "border-orange-500 bg-orange-50 text-orange-800"
                                  : "border-gray-500 bg-gray-50 text-gray-800"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span>{config.label}</span>
                            {responses[question.question_id] === config.value && (
                              <CheckCircle className="h-2.5 w-2.5 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Plan (if PLAN selected) */}
                  {responses[question.question_id] === "plan" && (
                    <div className="mb-3 bg-orange-50 rounded-lg p-2 border border-orange-200">
                      <h4 className="text-xs font-medium text-orange-900 mb-2">
                        Action Plan Required
                      </h4>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        <div>
                          <label className="block text-xs font-medium text-orange-800 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={actionPlans[question.question_id]?.dueDate || ""}
                            onChange={(e) =>
                              handleActionPlanChange(
                                question.question_id,
                                "dueDate",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-orange-800 mb-1">
                            Assigned To
                          </label>
                          <select
                            value={actionPlans[question.question_id]?.assignedTo || ""}
                            onChange={(e) =>
                              handleActionPlanChange(
                                question.question_id,
                                "assignedTo",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                          >
                            <option value="">Select assignee</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Sarah Johnson">Sarah Johnson</option>
                            <option value="Mike Wilson">Mike Wilson</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-orange-800 mb-1">
                          Action Plan Notes
                        </label>
                        <textarea
                          value={actionPlans[question.question_id]?.notes || ""}
                          onChange={(e) =>
                            handleActionPlanChange(
                              question.question_id,
                              "notes",
                              e.target.value
                            )
                          }
                          placeholder="Describe the steps needed..."
                          className="w-full px-2 py-1 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-xs"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {/* Evidence Upload */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Supporting Evidence
                    </h4>

                    {/* Existing Evidence */}
                    {evidence[question.question_id] &&
                      evidence[question.question_id].length > 0 && (
                        <div className="mb-1 space-y-1">
                          {evidence[question.question_id].map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-blue-600 text-[10px] font-medium">
                                    {file.name?.split(".").pop()?.toUpperCase() || 'FILE'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-900">
                                    {file.name || 'Unknown file'}
                                  </p>
                                  <p className="text-[10px] text-gray-500">
                                    {file.size ? (file.size / 1024).toFixed(1) : '0'} KB •{" "}
                                    {file.uploadDate ? new Date(file.uploadDate).toLocaleDateString() : 'Unknown date'}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleEvidenceRemove(question.question_id, index)
                                }
                                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                              >
                                <X className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Upload Button */}
                    <div className="border border-dashed border-gray-300 rounded-md p-1.5 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        onChange={(e) =>
                          handleEvidenceUpload(question.question_id, e.target.files)
                        }
                        className="hidden"
                        id={`evidence-${question.question_id}`}
                      />
                      <label
                        htmlFor={`evidence-${question.question_id}`}
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-3 w-3 text-gray-400 mb-0.5" />
                        <span className="text-[11px] font-medium text-blue-600">
                          Upload
                        </span>
                        <span className="text-[9px] text-gray-500">
                          Upload documents, screenshots, or other evidence (PDF,
                          DOC, JPG, PNG)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Additional Comments
                    </h4>
                    <textarea
                      value={comments[question.question_id] || ""}
                      onChange={(e) =>
                        handleCommentChange(question.question_id, e.target.value)
                      }
                      placeholder="Add any additional context..."
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-xs"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No questions available for this control.</p>
                </div>
              )}

              {/* Sticky Navigation Buttons */}
              {selectedApiControl && (
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-6">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handlePreviousControl()}
                      disabled={!canGoToPreviousControl()}
                      className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                      Previous Control
                    </button>

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleSaveAndContinue()}
                        className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Save & Continue Later
                      </button>
                      {isLastControl() ? (
                        <button 
                          onClick={() => handleFinishAssessment()}
                          className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Finish Assessment
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleNextControl()}
                          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Next Control
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Help Panel */}
          {showHelp && selectedApiControl && (
            <div 
              ref={helpPanelRef}
              className="sticky top-0 w-80 h-screen bg-white border-l border-gray-200 overflow-hidden z-20"
            >
              <div className="h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Control Help
                  </h3>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Control Description */}
                {selectedApiControl && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Control Description
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedApiControl?.description || 'No description available'}
                    </p>
                  </div>
                )}

                {/* Relevant Documents */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Relevant Documents
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Access Control Policy Template",
                      "User Account Management Guide",
                      "Identity Management Procedures",
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-gray-50 rounded text-sm"
                      >
                        <svg
                          className="h-4 w-4 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Answering Tips */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Answering Tips
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>YES:</strong> Choose when the control is fully
                        implemented and documented with evidence.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>NO:</strong> Choose when the control is not
                        implemented or significantly lacking.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>NOT APPLICABLE:</strong> Choose when the control
                        doesn't apply to your organization.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>
                        <strong>PLAN:</strong> Choose when you need to create an
                        action plan to implement the control.
                      </p>
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