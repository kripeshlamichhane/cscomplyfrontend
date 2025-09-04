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

// New reusable dropdown/navigation bar for assessments
const AssessmentDropdownBar = ({
  frameworks,
  currentFramework,
  onFrameworkChange,
  selectedFramework,
  selectedDomainId,
  onDomainChange,
  apiControls,
  selectedControlId,
  onControlChange,
  canToggleHelp,
  onToggleHelp,
  progressPercent,
  frameworkProgress
}) => {
  const [open, setOpen] = useState(false);
  const selectedControl = apiControls?.find(c => String(c.id) === String(selectedControlId));
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-end space-x-4">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">Framework</label>
              <select
                value={currentFramework}
                onChange={(e) => onFrameworkChange(e.target.value)}
                className="min-w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                {frameworks.map((fw) => (
                  <option key={fw.assessment_id} value={fw.framework_id}>{fw.framework_name}</option>
                ))}
                {frameworks.length === 0 && (<option value="">Loading frameworks...</option>)}
              </select>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 mb-2" />
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">Domain</label>
              <select
                value={selectedDomainId ?? ""}
                onChange={(e) => onDomainChange(e.target.value)}
                className="min-w-[220px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                {Array.isArray(selectedFramework.domains) && selectedFramework.domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>{domain.name}</option>
                ))}
                {(!selectedFramework.domains || (Array.isArray(selectedFramework.domains) && selectedFramework.domains.length === 0)) && (
                  <option value="">Loading domains...</option>
                )}
              </select>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 mb-2" />
            <div className="flex flex-col min-w-[320px]">
              <label className="text-xs font-medium text-gray-700 mb-1">Control</label>
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between text-sm"
                  disabled={!apiControls?.length}
                >
                  <span className="truncate">{selectedControl ? `${selectedControl.id} - ${selectedControl.title}` : "Select control"}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && Array.isArray(apiControls) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-20">
                    {apiControls.length > 0 ? (
                      apiControls.map((control) => (
                        <button
                          key={control.id}
                          onClick={() => { onControlChange(control.id); setOpen(false); }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${String(control.id) === String(selectedControlId) ? "bg-blue-50 text-blue-700" : "text-gray-900"}`}
                        >
                          <div className="font-medium text-sm">{control.id} - {control.title}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">Loading controls...</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleHelp}
              disabled={!canToggleHelp}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </button>
            <div className="text-sm text-gray-600 font-medium">{progressPercent || 0}% Complete</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Framework Progress</span>
            <span className="text-xs text-blue-600 font-medium">{frameworkProgress.answered} / {frameworkProgress.total} questions ({frameworkProgress.percentage}% Complete)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${frameworkProgress.percentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientAssessments = ({
  user,
  selectedFrameworkId: propSelectedFrameworkId,
  onFrameworkChange,
  onBack,
}) => {
  const location = useLocation();
  const navigateSelectedFrameworkId = location.state?.selectedFrameworkId;
  const selectedFrameworkId = navigateSelectedFrameworkId || propSelectedFrameworkId;
  const [currentDomain, setCurrentDomain] = useState("access-control");
  const [currentControl, setCurrentControl] = useState("AC-1");
  const [showHelp, setShowHelp] = useState(false);
  const [showControlDropdown, setShowControlDropdown] = useState(false);
  const [responses, setResponses] = useState({});
  const [actionPlans, setActionPlans] = useState({});
  const [evidence, setEvidence] = useState({});
  const [comments, setComments] = useState({});
  const [frameworks, setFrameworks] = useState([]);
  const [currentFramework, setCurrentFramework] = useState({});
  const [selectedFramework, setSelectedFramework] = useState({});
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedControlId, setSelectedControlId] = useState(null);
  const [controlQuestions, setControlQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [allFrameworkQuestions, setAllFrameworkQuestions] = useState([]);
  const controlDropdownRef = useRef(null);
  const topNavRef = useRef(null);
  const helpPanelRef = useRef(null);
  // Track persisted response record IDs per question to support updates
  const [responseIds, setResponseIds] = useState({});

  // State persistence keys
  const PERSISTENCE_KEYS = {
    CURRENT_FRAMEWORK: 'assessment_current_framework',
    CURRENT_DOMAIN: 'assessment_current_domain',
    CURRENT_CONTROL: 'assessment_current_control',
    CURRENT_QUESTION_INDEX: 'assessment_current_question_index'
  };

  // Save current state to localStorage
  const saveCurrentState = () => {
    try {
      const stateToSave = {
        framework: currentFramework,
        domain: selectedDomainId,
        control: selectedControlId,
        questionIndex: 0 // We'll update this when we implement question-level persistence
      };
      localStorage.setItem('assessment_state', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save assessment state:', error);
    }
  };

  // Load saved state from localStorage
  const loadSavedState = () => {
    try {
      const savedState = localStorage.getItem('assessment_state');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Failed to load assessment state:', error);
    }
    return null;
  };

  // Save state whenever key values change
  useEffect(() => {
    if (currentFramework && selectedDomainId && selectedControlId) {
      saveCurrentState();
    }
  }, [currentFramework, selectedDomainId, selectedControlId]);

  useEffect(() => {
    const fetchData = async () => {
      const frameworksResponse = await axios.get("http://localhost:8001/organizations/1/frameworks/");
      setFrameworks(frameworksResponse.data);
      if (frameworksResponse.data.length > 0) {
        let targetFramework;
        let targetDomain = null;
        let targetControl = null;
        
        // Load saved state if no specific framework is selected via navigation
        const savedState = !selectedFrameworkId ? loadSavedState() : null;
        
        if (selectedFrameworkId) {
          // Find the specific framework that was selected via navigation
          targetFramework = frameworksResponse.data.find(fw => fw.framework_id == selectedFrameworkId);
        } else if (savedState && savedState.framework) {
          // Try to restore from saved state
          targetFramework = frameworksResponse.data.find(fw => fw.framework_id == savedState.framework);
          if (targetFramework) {
            targetDomain = savedState.domain;
            targetControl = savedState.control;
          } else {
            // If saved framework doesn't exist anymore, clear the saved state
            try {
              localStorage.removeItem('assessment_state');
            } catch (error) {
              console.error('Failed to clear invalid assessment state:', error);
            }
          }
        }
        
        // If no specific framework found or no framework ID provided, use the first one
        if (!targetFramework) {
          targetFramework = frameworksResponse.data[0];
        }
        
        setCurrentFramework(targetFramework.framework_id);
        const domainsResponse = await axios.get(
          `http://localhost:8001/frameworks/${targetFramework.framework_id}/domain/control`
        );
        setSelectedFramework(domainsResponse.data);
        
        // Determine which domain and control to select
        let selectedDomain = null;
        let selectedControl = null;
        
        if (targetDomain) {
          // Try to restore the saved domain
          selectedDomain = domainsResponse.data?.domains?.find(d => String(d.id) === String(targetDomain));
        }
        if (!selectedDomain) {
          selectedDomain = domainsResponse.data?.domains?.[0] || null;
        }
        
        if (targetControl && selectedDomain) {
          // Try to restore the saved control
          selectedControl = selectedDomain?.controls?.find(c => String(c.id) === String(targetControl));
        }
        if (!selectedControl) {
          selectedControl = selectedDomain?.controls?.[0] || null;
        }
        
        setSelectedDomainId(selectedDomain?.id ?? null);
        setSelectedControlId(selectedControl?.id ?? null);
        
        if (selectedControl?.id) {
          fetchControlQuestions(selectedControl.id);
        }
        
        // Fetch all questions for the framework to calculate overall progress
        fetchAllFrameworkQuestions(targetFramework.framework_id);
      }
    };
    fetchData();
  }, [selectedFrameworkId]);

  const frameworksData = [];

  // Get current framework data
  const getCurrentFrameworkData = () => {
    if (!currentFramework || !frameworksData[currentFramework]) {
      return frameworksData["cmmc-2.0"];
    }
    return frameworksData[currentFramework];
  };

  // Get current domain data
  const getCurrentDomainData = () => {
    const framework = getCurrentFrameworkData();
    if (!framework || !framework.domains) return null;
    return (
      framework.domains[currentDomain] || Object.values(framework.domains)[0]
    );
  };

  // Get current control data
  const getCurrentControlData = () => {
    const domain = getCurrentDomainData();
    if (!domain || !domain.controls) return null;
    return domain.controls[currentControl] || Object.values(domain.controls)[0];
  };

  // Get all controls for current domain
  const getCurrentDomainControls = () => {
    const domain = getCurrentDomainData();
    if (!domain || !domain.controls) return [];
    return Object.entries(domain.controls).map(([id, control]) => ({
      id,
      name: control.name,
      questionsCount: control.questions.length,
      answeredCount: control.questions.filter((q) => responses[q.id]).length,
    }));
  };

  // Calculate framework-level progress across all domains and controls
  const calculateFrameworkProgress = () => {
    if (!allFrameworkQuestions || allFrameworkQuestions.length === 0) {
      return { percentage: 0, answered: 0, total: 0 };
    }
    
    const totalQuestions = allFrameworkQuestions.length;
    const answeredQuestions = allFrameworkQuestions.filter(question => 
      responses[question.question_id]
    ).length;

    return {
      percentage: Math.round((answeredQuestions / totalQuestions) * 100),
      answered: answeredQuestions,
      total: totalQuestions
    };
  };

  // Calculate progress (keeping old function for backward compatibility)
  const calculateProgress = () => {
    const framework = getCurrentFrameworkData();
    if (!framework || !framework.domains) return 0;
    
    let totalQuestions = 0;
    let answeredQuestions = 0;

    Object.values(framework.domains).forEach((domain) => {
      if (domain && domain.controls) {
        Object.values(domain.controls).forEach((control) => {
          if (control && control.questions) {
            totalQuestions += control.questions.length;
            answeredQuestions += control.questions.filter(
              (q) => responses[q.id]
            ).length;
          }
        });
      }
    });

    return totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;
  };

  // Handle response change (auto-save)
  const handleResponseChange = async (questionId, response) => {
    if (!questionId || !response) return;
    
    console.log(`Saving response for question ${questionId}: ${response}`);
    
    // Update local state immediately for responsive UI
    setResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));

    // Clear action plan if not PLAN response
    if (response !== "plan") {
      setActionPlans((prev) => {
        const newPlans = { ...prev };
        delete newPlans[questionId];
        return newPlans;
      });
    }

    // Auto-save the response to API
    try {
      const existingRecordId = responseIds[questionId];
      
      if (existingRecordId) {
        // Update existing response by DB id
        await axios.put(`http://localhost:8001/assessment-responses/${existingRecordId}`, {
          response: response,
          updated_by: user?.username || "user"
        });
        console.log(`Response updated for question ${questionId}: ${response}`);
      } else {
        // Create new response
        const createRes = await axios.post('http://localhost:8001/assessment-responses', {
          assessment_id: 2,
          question_id: questionId,
          response: response,
          text_response: ""
        });
        // Persist returned id for future updates (assuming API returns created object)
        if (createRes?.data?.id) {
          setResponseIds(prev => ({ ...prev, [questionId]: createRes.data.id }));
        } else if (Array.isArray(createRes?.data) && createRes.data[0]?.id) {
          setResponseIds(prev => ({ ...prev, [questionId]: createRes.data[0].id }));
        }
        console.log(`Response saved for question ${questionId}: ${response}`);
      }
    } catch (error) {
      console.error('Failed to save response:', error);
      // Optionally revert the local state change on error
      // setResponses(prev => {
      //   const newResponses = { ...prev };
      //   delete newResponses[questionId];
      //   return newResponses;
      // });
    }
  };

  // Handle action plan change
  const handleActionPlanChange = async (questionId, field, value) => {
    if (!questionId || !field) return;
    
    // Update local state immediately
    setActionPlans((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));

    // Save action plan using existing response record id if available
    try {
      const existingRecordId = responseIds[questionId];
      const currentResponse = responses[questionId] || "";
      if (existingRecordId) {
        const actionPlanText = JSON.stringify({ ...(actionPlans[questionId] || {}), [field]: value });
        await axios.put(`http://localhost:8001/assessment-responses/${existingRecordId}`, {
          response: currentResponse,
          updated_by: user?.username || "user",
          text_response: actionPlanText
        });
      }
    } catch (error) {
      console.error('Failed to save action plan:', error);
    }
  };

  // Handle evidence upload
  const handleEvidenceUpload = (questionId, files) => {
    if (!questionId || !files || files.length === 0) return;
    
    setEvidence((prev) => ({
      ...prev,
      [questionId]: [
        ...(prev[questionId] || []),
        ...Array.from(files).map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
        })),
      ],
    }));
  };

  // Handle evidence removal
  const handleEvidenceRemove = (questionId, index) => {
    if (!questionId || index === undefined || index < 0) return;
    
    setEvidence((prev) => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, i) => i !== index),
    }));
  };

  // Handle comment change
  const handleCommentChange = async (questionId, comment) => {
    if (!questionId) return;
    
    // Update local state immediately
    setComments((prev) => ({
      ...prev,
      [questionId]: comment,
    }));

    // Save comment using existing response record id if available
    try {
      const existingRecordId = responseIds[questionId];
      const currentResponse = responses[questionId] || "";
      if (existingRecordId) {
        await axios.put(`http://localhost:8001/assessment-responses/${existingRecordId}`, {
          response: currentResponse,
          updated_by: user?.username || "user",
          text_response: comment
        });
      }
    } catch (error) {
      console.error('Failed to save comment:', error);
    }
  };

  // Handle framework change (API-based)
  const handleFrameworkChange = async (frameworkId) => {
    setCurrentFramework(frameworkId);
    if (onFrameworkChange) {
      onFrameworkChange(frameworkId);
    }
    
    // Clear existing responses when switching frameworks
    setResponses({});
    setActionPlans({});
    setComments({});
    setResponseIds({});
    setEvidence({});
    
    try {
      const domainsResponse = await axios.get(
        `http://localhost:8001/frameworks/${frameworkId}/domain/control`
      );
      setSelectedFramework(domainsResponse.data);
      const firstDomain = domainsResponse.data?.domains?.[0] || null;
      const firstControl = firstDomain?.controls?.[0] || null;      
      setSelectedDomainId(firstDomain?.id ?? null);
      setSelectedControlId(firstControl?.id ?? null);
      if (firstControl?.id) {
        fetchControlQuestions(firstControl.id);
      }
      
      // Fetch all questions for the new framework to calculate overall progress
      fetchAllFrameworkQuestions(frameworkId);
      
      // Save the new state
      saveCurrentState();
    } catch (error) {
      console.error("Failed to load framework domains/controls", error);
    }
  };

  // Handle API domain change
  const handleApiDomainChange = (domainId) => {
    setSelectedDomainId(domainId);
    const domain = selectedFramework?.domains?.find(
      (d) => String(d.id) === String(domainId)
    );
    const firstControl = domain?.controls?.[0] || null;
    setSelectedControlId(firstControl?.id ?? null);
    if (firstControl?.id) {
      fetchControlQuestions(firstControl.id);
    }
    // Save the new state
    saveCurrentState();
  };

  // Fetch all questions for the entire framework
  const fetchAllFrameworkQuestions = async (frameworkId) => {
    if (!frameworkId) return;
    
    try {
      // Get all domains and controls for the framework
      const frameworkResponse = await axios.get(`http://localhost:8001/frameworks/${frameworkId}/domain/control`);
      const framework = frameworkResponse.data;
      
      if (!framework.domains) return;
      
      // Fetch questions for all controls
      const allQuestions = [];
      for (const domain of framework.domains) {
        if (domain.controls) {
          for (const control of domain.controls) {
            try {
              const questionsResponse = await axios.get(`http://localhost:8001/assessments/2/responses?control_id=${control.id}`);
              allQuestions.push(...questionsResponse.data);
            } catch (error) {
              console.error(`Failed to fetch questions for control ${control.id}:`, error);
            }
          }
        }
      }
      
      setAllFrameworkQuestions(allQuestions);
    } catch (error) {
      console.error('Failed to fetch framework questions:', error);
      setAllFrameworkQuestions([]);
    }
  };

  // Fetch questions for selected control
  const fetchControlQuestions = async (controlId) => {
    if (!controlId) return;
    
    setIsLoadingQuestions(true);
    
    // Clear previous control's data
    setControlQuestions([]);
    
    try {
      const response = await axios.get(`http://localhost:8001/assessments/2/responses?control_id=${controlId}`);
      console.log('Fetched control questions:', response.data);
      setControlQuestions(response.data);
      
      // Load existing responses for these questions
      await loadExistingResponses(response.data);
    } catch (error) {
      console.error('Failed to fetch control questions:', error);
      setControlQuestions([]);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Load existing responses for the current control questions
  const loadExistingResponses = async (questions) => {
    if (!questions || questions.length === 0) return;
    
    console.log('Loading existing responses for questions:', questions.map(q => q.question_id));
    
    try {
      // Clear existing responses for the current control first
      const currentQuestionIds = questions.map(q => q.question_id);
      
      // Use the response data directly from the control questions API
      const newResponses = {};
      const newComments = {};
      const newActionPlans = {};
      const newResponseIds = {};
      
      questions.forEach((question) => {
        const questionId = question.question_id;
        
        // Only set response if it exists and is not null
        if (question.response && question.response_id) {
          newResponses[questionId] = question.response;
          newResponseIds[questionId] = question.response_id;
          
          // Handle text_response for comments and action plans
          if (question.text_response) {
            try {
              const parsed = JSON.parse(question.text_response);
              if (parsed && typeof parsed === 'object' && (parsed.dueDate || parsed.assignedTo || parsed.notes)) {
                newActionPlans[questionId] = parsed;
              } else {
                newComments[questionId] = question.text_response;
              }
            } catch (e) {
              // If not valid JSON, treat as comment
              newComments[questionId] = question.text_response;
            }
          }
        }
      });
      
      console.log('Setting responses:', newResponses);
      console.log('Setting response IDs:', newResponseIds);
      console.log('Current questions:', questions.map(q => ({ id: q.question_id, response: q.response, response_id: q.response_id })));
      
      // Update state with only the responses for the current control
      setResponses(prev => {
        // Remove responses for current control questions first, then add new ones
        const filteredPrev = { ...prev };
        currentQuestionIds.forEach(qId => {
          delete filteredPrev[qId];
        });
        return { ...filteredPrev, ...newResponses };
      });
      
      setComments(prev => {
        const filteredPrev = { ...prev };
        currentQuestionIds.forEach(qId => {
          delete filteredPrev[qId];
        });
        return { ...filteredPrev, ...newComments };
      });
      
      setActionPlans(prev => {
        const filteredPrev = { ...prev };
        currentQuestionIds.forEach(qId => {
          delete filteredPrev[qId];
        });
        return { ...filteredPrev, ...newActionPlans };
      });
      
      setResponseIds(prev => {
        const filteredPrev = { ...prev };
        currentQuestionIds.forEach(qId => {
          delete filteredPrev[qId];
        });
        return { ...filteredPrev, ...newResponseIds };
      });
      
    } catch (error) {
      console.error('Failed to load existing responses:', error);
    }
  };

  // Navigation helper functions
  const getCurrentControlIndex = () => {
    if (!selectedDomain || !selectedControlId || !apiControls.length) return -1;
    return apiControls.findIndex(control => String(control.id) === String(selectedControlId));
  };

  const canGoToPreviousControl = () => {
    const currentIndex = getCurrentControlIndex();
    return currentIndex > 0;
  };

  const canGoToNextControl = () => {
    const currentIndex = getCurrentControlIndex();
    return currentIndex >= 0 && currentIndex < apiControls.length - 1;
  };

  const isLastControl = () => {
    const currentIndex = getCurrentControlIndex();
    return currentIndex === apiControls.length - 1;
  };

  const handlePreviousControl = () => {
    const currentIndex = getCurrentControlIndex();
    if (currentIndex > 0) {
      const previousControl = apiControls[currentIndex - 1];
      setSelectedControlId(previousControl.id);
      fetchControlQuestions(previousControl.id);
      // Save the new state
      saveCurrentState();
    }
  };

  const handleNextControl = () => {
    const currentIndex = getCurrentControlIndex();
    if (currentIndex < apiControls.length - 1) {
      const nextControl = apiControls[currentIndex + 1];
      setSelectedControlId(nextControl.id);
      fetchControlQuestions(nextControl.id);
      // Save the new state
      saveCurrentState();
    }
  };

  const handleSaveAndContinue = async () => {
    // TODO: Implement API call to save all responses
    console.log('Saving all responses...', responses);
    // await saveAllResponses(responses);
    
    // Note: We don't clear the state here because we want to preserve the user's position
    // The state will be saved automatically by the useEffect that watches for changes
  };

  const handleFinishAssessment = async () => {
    // TODO: Implement API call to finish assessment
    console.log('Finishing assessment...', responses);
    // await finishAssessment(responses);
    
    // Clear saved state when assessment is finished
    try {
      localStorage.removeItem('assessment_state');
    } catch (error) {
      console.error('Failed to clear assessment state:', error);
    }
  };

  // Handle domain change
  const handleDomainChange = (domainId) => {
    setCurrentDomain(domainId);
    const framework = getCurrentFrameworkData();
    if (framework && framework.domains && framework.domains[domainId] && framework.domains[domainId].controls) {
      const firstControl = Object.keys(framework.domains[domainId].controls)[0];
      if (firstControl) {
        setCurrentControl(firstControl);
      }
    }
  };

  // Handle control change
  const handleControlChange = (controlId) => {
    if (controlId) {
      setCurrentControl(controlId);
      setShowControlDropdown(false);
    }
  };

  const currentFrameworkData = getCurrentFrameworkData();
  const currentDomainData = getCurrentDomainData();
  const currentControlData = getCurrentControlData();
  const domainControls = getCurrentDomainControls();
  const progress = calculateProgress();

  // API-driven selections for UI dropdowns
  const selectedDomain = selectedFramework?.domains?.find(
    (d) => String(d.id) === String(selectedDomainId)
  );
  const apiControls = selectedDomain?.controls || [];
  const selectedApiControl = apiControls.find(
    (c) => String(c.id) === String(selectedControlId)
  );

  // Don't render until we have framework data
  if (!selectedFramework.domains) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading framework data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Top Navigation with Dropdowns */}
      <div ref={topNavRef} className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-2 shadow-sm" style={{ position: 'sticky', top: '0px', zIndex: 40 }}>
        <div className="flex items-center justify-between">
          {/* Left side - Framework and Domain dropdowns */}
          <div className="flex items-center space-x-3">
            {/* Framework Selector */}
            <select
              value={currentFramework}
              onChange={(e) => handleFrameworkChange(e.target.value)}
              className="min-w-[140px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {frameworks.map((fw) => (
                <option key={fw.assessment_id} value={fw.framework_id}>
                  {fw.framework_name}
                </option>
              ))}
              {frameworks.length === 0 && (
                <option value="">Loading frameworks...</option>
              )}
            </select>

            <span className="text-gray-400">→</span>

            {/* Domain Selector (API) */}
            <select
              value={selectedDomainId ?? ""}
              onChange={(e) => handleApiDomainChange(e.target.value)}
              className="min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {Array.isArray(selectedFramework.domains) &&
                selectedFramework.domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              {(!selectedFramework.domains ||
                (Array.isArray(selectedFramework.domains) &&
                  selectedFramework.domains.length === 0)) && (
                <option value="">Loading domains...</option>
              )}
            </select>

            <span className="text-gray-400">→</span>

            {/* Control Selector (API) */}
            <div className="relative" ref={controlDropdownRef}>
              <button
                onClick={() => setShowControlDropdown(!showControlDropdown)}
                className="min-w-[280px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between"
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
                          // Save the new state
                          saveCurrentState();
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                          String(control.id) === String(selectedControlId)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-900"
                        }`}
                      >
                        <div className="font-medium">
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

          {/* Right side - Help toggle and progress */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHelp(!showHelp)}
              disabled={!selectedApiControl}
              className="flex items-center px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </button>
            <div className="text-sm text-gray-600">{progress || 0}% Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Framework Progress
            </span>
            <span className="text-xs text-blue-600 font-medium">
              {calculateFrameworkProgress().answered} / {calculateFrameworkProgress().total} questions ({calculateFrameworkProgress().percentage}% Complete)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${calculateFrameworkProgress().percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex relative gap-4 pt-2">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 pr-4 ${showHelp ? "mr-80" : ""}`}>
          <div className="p-6">
            {/* Control Header */}
            {selectedApiControl && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 mb-1">
                      {selectedApiControl.id}: {selectedApiControl.title}
                    </h1>
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedApiControl.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {controlQuestions.length} questions
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                      {controlQuestions.filter(q => responses[q.question_id]).length} / {controlQuestions.length} answered
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                  <div className="mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {question.question}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Question {index + 1} of {controlQuestions.length} in {selectedApiControl?.id}
                        </p>
                      </div>
                    </div>

                    {/* Quick Tip */}
                    <div className="mt-2 bg-blue-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-blue-900">
                            Quick Tip:
                          </p>
                          <p className="text-xs text-blue-800">
                            {question.help_text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Options */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Your Response
                    </h4>
                    <div className="grid grid-cols-4 gap-1 max-w-s">
                      {question.response_options.map((option) => {
                        const optionConfig = {
                          yes: { value: "yes", label: "YES", color: "green" },
                          no: { value: "no", label: "NO", color: "red" },
                          not_applicable: { value: "not_applicable", label: "NOT APPLICABLE", color: "gray" },
                          plan: { value: "plan", label: "PLAN", color: "orange" }
                        };
                        const config = optionConfig[option.toLowerCase()] || { value: option, label: option.toUpperCase(), color: "blue" };
                        return (
                        <button
                          key={config.value}
                          onClick={() =>
                            handleResponseChange(question.question_id, config.value)
                          }
                          className={`p-2 rounded-md border flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 ${
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
                          style={{ minWidth: "50px" }}
                        >
                          <span>{config.label}</span>
                          {responses[question.question_id] === config.value && (
                            <CheckCircle className="h-3 w-3 mt-0.5" />
                          )}
                        </button>
                      );
                      })}
                    </div>
                  </div>

                  {/* Action Plan (if PLAN selected) */}
                  {responses[question.question_id] === "plan" && (
                    <div className="mb-4 bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <h4 className="text-xs font-medium text-orange-900 mb-2">
                        Action Plan Required
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-2">
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
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Supporting Evidence
                    </h4>

                    {/* Existing Evidence */}
                    {evidence[question.question_id] &&
                      evidence[question.question_id].length > 0 && (
                        <div className="mb-2 space-y-1">
                          {evidence[question.question_id].map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
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
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Upload Button */}
                    <div className="border border-dashed border-gray-300 rounded-md p-2 text-center hover:border-gray-400 transition-colors">
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
                        <Upload className="h-4 w-4 text-gray-400 mb-0.5" />
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

            {/* Navigation */}
            {selectedApiControl && (
              <div className="mt-8 flex items-center justify-between">
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
            )}
          </div>
        </div>

        {/* Help Panel */}
        {showHelp && selectedApiControl && (
          <div 
            ref={helpPanelRef}
            id="control-help-panel" 
            className="fixed top-32 right-0 w-80 h-[calc(100vh-8rem)] bg-gradient-to-b from-blue-50 to-indigo-50 overflow-y-auto z-20 border-l-4 border-blue-500 shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
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
                <div className="mb-6">
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
              <div className="mb-6">
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
  );
};

export default ClientAssessments;