// Set dark mode based on user preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

document.addEventListener('DOMContentLoaded', function() {

    // Common symptom list by categories
    const commonSymptoms = {
        head: [
            { id: 'severe-headache', name: 'Severe headache', icon: 'fa-head-side-virus' },
            { id: 'mild-headache', name: 'Mild headache', icon: 'fa-head-side' },
            { id: 'sensitivity-to-light', name: 'Sensitivity to light', icon: 'fa-eye' },
            { id: 'dizziness', name: 'Dizziness', icon: 'fa-person-falling' },
            { id: 'blurred-vision', name: 'Blurred vision', icon: 'fa-eye-low-vision' },
            { id: 'ear-pain', name: 'Ear pain', icon: 'fa-ear' },
            { id: 'ringing-in-ears', name: 'Ringing in ears', icon: 'fa-ear-listen' },
            { id: 'sinus-pressure', name: 'Sinus pressure', icon: 'fa-head-side-cough' }
        ],
        chest: [
            { id: 'chest-pain', name: 'Chest pain', icon: 'fa-heart-crack' },
            { id: 'shortness-of-breath', name: 'Shortness of breath', icon: 'fa-lungs' },
            { id: 'rapid-heartbeat', name: 'Rapid heartbeat', icon: 'fa-heart-pulse' },
            { id: 'cough', name: 'Cough', icon: 'fa-head-side-cough' },
            { id: 'wheezing', name: 'Wheezing', icon: 'fa-wind' },
            { id: 'difficulty-breathing', name: 'Difficulty breathing', icon: 'fa-lungs-virus' }
        ],
        abdomen: [
            { id: 'abdominal-pain', name: 'Abdominal pain', icon: 'fa-stomach' },
            { id: 'nausea', name: 'Nausea', icon: 'fa-face-dizzy' },
            { id: 'vomiting', name: 'Vomiting', icon: 'fa-toilet' },
            { id: 'diarrhea', name: 'Diarrhea', icon: 'fa-toilet-paper' },
            { id: 'constipation', name: 'Constipation', icon: 'fa-toilet-paper-slash' },
            { id: 'bloating', name: 'Bloating', icon: 'fa-expand' }
        ],
        skin: [
            { id: 'rash', name: 'Rash', icon: 'fa-allergies' },
            { id: 'itching', name: 'Itching', icon: 'fa-hand-dots' },
            { id: 'skin-redness', name: 'Skin redness', icon: 'fa-hand-dots' },
            { id: 'swelling', name: 'Swelling', icon: 'fa-droplet' },
            { id: 'bruising', name: 'Bruising', icon: 'fa-circle' }
        ],
        general: [
            { id: 'fever', name: 'Fever', icon: 'fa-temperature-high' },
            { id: 'fatigue', name: 'Fatigue', icon: 'fa-battery-quarter' },
            { id: 'weakness', name: 'Weakness', icon: 'fa-dumbbell' },
            { id: 'chills', name: 'Chills', icon: 'fa-snowflake' },
            { id: 'sweating', name: 'Sweating', icon: 'fa-droplet' },
            { id: 'joint-pain', name: 'Joint pain', icon: 'fa-bone' },
            { id: 'muscle-pain', name: 'Muscle pain', icon: 'fa-person-walking' },
            { id: 'loss-of-appetite', name: 'Loss of appetite', icon: 'fa-utensils-slash' },
            { id: 'weight-loss', name: 'Weight loss', icon: 'fa-weight-scale' },
            { id: 'sleep-problems', name: 'Sleep problems', icon: 'fa-bed' }
        ]
    };

    // Variables to store user selections
    let selectedSymptoms = [];
    let currentStep = 1;

    // DOM elements
    const stepIndicators = {
        1: document.getElementById('step1'),
        2: document.getElementById('step2'),
        3: document.getElementById('step3'),
        4: document.getElementById('step4')
    };

    const stepContents = {
        1: document.getElementById('step1Content'),
        2: document.getElementById('step2Content'),
        3: document.getElementById('step3Content'),
        4: document.getElementById('step4Content')
    };

    // Functions to manage steps
    function showStep(step) {
        // Hide all steps
        Object.values(stepContents).forEach(content => {
            content.classList.add('hidden');
        });

        // Show the current step
        stepContents[step].classList.remove('hidden');

        // Reset step indicators
        Object.entries(stepIndicators).forEach(([stepNum, indicator]) => {
            indicator.classList.remove('step-active', 'step-completed');
            if (parseInt(stepNum) < step) {
                indicator.classList.add('step-completed');
            } else if (parseInt(stepNum) === step) {
                indicator.classList.add('step-active');
            }
        });

        currentStep = step;
    }

    // Populate symptoms grid
    function displaySymptoms(category = 'all') {
        const symptomGrid = document.getElementById('symptomGrid');
        symptomGrid.innerHTML = '';

        let symptomsToShow = [];
        if (category === 'all') {
            // Flatten all categories and add them to symptomsToShow
            Object.values(commonSymptoms).forEach(categorySymptoms => {
                symptomsToShow = [...symptomsToShow, ...categorySymptoms];
            });
        } else {
            symptomsToShow = commonSymptoms[category] || [];
        }

        if (symptomsToShow.length === 0) {
            symptomGrid.innerHTML = '<p class="col-span-3 text-center text-gray-500 dark:text-gray-400 py-10">No symptoms found in this category.</p>';
            return;
        }

        symptomsToShow.forEach(symptom => {
            const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
            const card = document.createElement('div');
            card.className = `symptom-card cursor-pointer rounded-lg p-4 transition flex items-center gap-3 ${
                isSelected
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`;
            card.setAttribute('data-symptom-id', symptom.id);

            card.innerHTML = `
                      <div class="flex items-center justify-center w-10 h-10 rounded-full ${
                isSelected
                    ? 'bg-white bg-opacity-20'
                    : 'bg-primary-100 dark:bg-primary-900'
            }">
                          <i class="fas ${symptom.icon} ${
                isSelected
                    ? 'text-white'
                    : 'text-primary-500 dark:text-primary-400'
            }"></i>
                      </div>
                      <span>${symptom.name}</span>
                      ${isSelected ? '<i class="fas fa-check ml-auto text-white"></i>' : ''}
                  `;

            card.addEventListener('click', () => toggleSymptom(symptom));
            symptomGrid.appendChild(card);
        });
    }

    // Toggle symptom selection
    function toggleSymptom(symptom) {
        const index = selectedSymptoms.findIndex(s => s.id === symptom.id);

        if (index === -1) {
            // Add symptom
            selectedSymptoms.push(symptom);
        } else {
            // Remove symptom
            selectedSymptoms.splice(index, 1);
        }

        // Update UI
        updateSelectedSymptomsUI();
        displaySymptoms(document.querySelector('.category-button-selected')?.getAttribute('data-category') || 'all');
    }

    // Update the selected symptoms display
    function updateSelectedSymptomsUI() {
        const selectedSymptomsContainer = document.getElementById('selectedSymptoms');
        const noSymptomsMessage = document.getElementById('noSymptomsMessage');

        // Clear container
        selectedSymptomsContainer.innerHTML = '';

        if (selectedSymptoms.length === 0) {
            selectedSymptomsContainer.appendChild(noSymptomsMessage);
            return;
        }

        // Add each selected symptom
        selectedSymptoms.forEach(symptom => {
            const tag = document.createElement('div');
            tag.className = 'animate-slide-in bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-2 rounded-full flex items-center gap-2';
            tag.innerHTML = `
                      <i class="fas ${symptom.icon} text-primary-500"></i>
                      <span>${symptom.name}</span>
                      <button class="remove-symptom text-gray-500 hover:text-red-500 transition ml-1" data-symptom-id="${symptom.id}">
                          <i class="fas fa-times"></i>
                      </button>
                  `;
            selectedSymptomsContainer.appendChild(tag);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-symptom').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const symptomId = button.getAttribute('data-symptom-id');
                const symptomIndex = selectedSymptoms.findIndex(s => s.id === symptomId);

                if (symptomIndex !== -1) {
                    selectedSymptoms.splice(symptomIndex, 1);
                    updateSelectedSymptomsUI();
                    displaySymptoms(document.querySelector('.category-button-selected')?.getAttribute('data-category') || 'all');
                }
            });
        });
    }

    // Initialize UI
    function initializeUI() {
        // Display "all" symptoms by default
        displaySymptoms('all');

        // Set first category as selected
        document.querySelector('[data-category="all"]').classList.add('category-button-selected');

        // Add default selected symptoms
        const defaultSymptoms = [
            commonSymptoms.head.find(s => s.id === 'severe-headache'),
            commonSymptoms.general.find(s => s.id === 'fever'),
            commonSymptoms.general.find(s => s.id === 'fatigue'),
            commonSymptoms.head.find(s => s.id === 'sensitivity-to-light')
        ].filter(Boolean);

        selectedSymptoms = [...defaultSymptoms];
        updateSelectedSymptomsUI();
        displaySymptoms('all');

        // Set up category buttons
        document.querySelectorAll('.category-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove selected class from all buttons
                document.querySelectorAll('.category-button').forEach(btn => {
                    btn.classList.remove('category-button-selected');
                });

                // Add selected class to clicked button
                button.classList.add('category-button-selected');

                // Display symptoms for the selected category
                displaySymptoms(button.getAttribute('data-category'));
            });
        });

        // Set up symptom search
        const symptomSearch = document.getElementById('symptomSearch');
        symptomSearch.addEventListener('input', () => {
            const searchTerm = symptomSearch.value.toLowerCase();

            if (searchTerm.trim() === '') {
                // If search is empty, show the selected category
                const selectedCategory = document.querySelector('.category-button-selected')?.getAttribute('data-category') || 'all';
                displaySymptoms(selectedCategory);
                return;
            }

            // Filter symptoms across all categories
            const symptomGrid = document.getElementById('symptomGrid');
            symptomGrid.innerHTML = '';

            let matchedSymptoms = [];

            Object.values(commonSymptoms).forEach(categorySymptoms => {
                const filtered = categorySymptoms.filter(symptom =>
                    symptom.name.toLowerCase().includes(searchTerm)
                );
                matchedSymptoms = [...matchedSymptoms, ...filtered];
            });

            if (matchedSymptoms.length === 0) {
                symptomGrid.innerHTML = '<p class="col-span-3 text-center text-gray-500 dark:text-gray-400 py-10">No symptoms found matching your search.</p>';
                return;
            }

            matchedSymptoms.forEach(symptom => {
                const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
                const card = document.createElement('div');
                card.className = `symptom-card cursor-pointer rounded-lg p-4 transition flex items-center gap-3 ${
                    isSelected
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`;
                card.setAttribute('data-symptom-id', symptom.id);

                card.innerHTML = `
                          <div class="flex items-center justify-center w-10 h-10 rounded-full ${
                    isSelected
                        ? 'bg-white bg-opacity-20'
                        : 'bg-primary-100 dark:bg-primary-900'
                }">
                              <i class="fas ${symptom.icon} ${
                    isSelected
                        ? 'text-white'
                        : 'text-primary-500 dark:text-primary-400'
                }"></i>
                          </div>
                          <span>${symptom.name}</span>
                          ${isSelected ? '<i class="fas fa-check ml-auto text-white"></i>' : ''}
                      `;

                card.addEventListener('click', () => toggleSymptom(symptom));
                symptomGrid.appendChild(card);
            });
        });

        // Setup tag inputs
        setupTagInput('medicalHistoryInput', 'medicalHistoryTags', 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200');
        setupTagInput('medicationsInput', 'medicationTags', 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200');
        setupTagInput('allergiesInput', 'allergyTags', 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200');
    }

    // Setup tag input
    function setupTagInput(inputId, tagsContainerId, tagClass) {
        const input = document.getElementById(inputId);
        const tagsContainer = document.getElementById(tagsContainerId);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                e.preventDefault();

                const tag = document.createElement('span');
                tag.className = `tag ${tagClass}`;
                tag.innerHTML = `
                          ${input.value.trim()} <i class="fas fa-times"></i>
                      `;

                // Add click event to remove tag
                tag.querySelector('i').addEventListener('click', () => {
                    tag.remove();
                });

                tagsContainer.appendChild(tag);
                input.value = '';
            }
        });

        // Make sure existing tags can be removed
        tagsContainer.querySelectorAll('.tag i').forEach(icon => {
            icon.addEventListener('click', () => {
                icon.parentElement.remove();
            });
        });
    }

    // Update review page with current data
    function updateReviewPage() {
        // Update symptoms
        const reviewSymptoms = document.getElementById('reviewSymptoms');
        reviewSymptoms.innerHTML = '';

        selectedSymptoms.forEach(symptom => {
            const tag = document.createElement('span');
            tag.className = 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm';
            tag.innerHTML = `
                      <i class="fas ${symptom.icon} text-primary-500"></i>
                      <span>${symptom.name}</span>
                  `;
            reviewSymptoms.appendChild(tag);
        });

        // Update patient info
        document.getElementById('reviewName').textContent = document.getElementById('patientName').value || '-';
        document.getElementById('reviewAge').textContent = document.getElementById('patientAge').value;
        document.getElementById('reviewGender').textContent = document.querySelector('input[name="gender"]:checked').value;
        document.getElementById('reviewHeight').textContent = `${document.getElementById('patientHeight').value} cm`;
        document.getElementById('reviewWeight').textContent = `${document.getElementById('patientWeight').value} kg`;

        // Update medical history, medications, allergies
        updateReviewTags('medicalHistoryTags', 'reviewMedicalHistory', 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200');
        updateReviewTags('medicationTags', 'reviewMedications', 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200');
        updateReviewTags('allergyTags', 'reviewAllergies', 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200');

        // Update lifestyle
        document.getElementById('reviewSmoking').textContent = document.getElementById('lifestyleSmoking').options[document.getElementById('lifestyleSmoking').selectedIndex].text;
        document.getElementById('reviewAlcohol').textContent = document.getElementById('lifestyleAlcohol').options[document.getElementById('lifestyleAlcohol').selectedIndex].text;
        document.getElementById('reviewExercise').textContent = document.getElementById('lifestyleExercise').options[document.getElementById('lifestyleExercise').selectedIndex].text;
        document.getElementById('reviewDiet').textContent = document.getElementById('lifestyleDiet').options[document.getElementById('lifestyleDiet').selectedIndex].text;
    }

    // Helper function to update review tags
    function updateReviewTags(sourceId, targetId, tagClass) {
        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);
        target.innerHTML = '';

        const tags = source.querySelectorAll('.tag');

        if (tags.length === 0) {
            const noneTag = document.createElement('span');
            noneTag.className = 'text-gray-500 dark:text-gray-400';
            noneTag.textContent = 'None';
            target.appendChild(noneTag);
            return;
        }

        tags.forEach(tag => {
            const reviewTag = document.createElement('span');
            reviewTag.className = `${tagClass} px-3 py-1 rounded-full inline-block text-sm`;
            reviewTag.textContent = tag.textContent.replace('×', '').trim();
            target.appendChild(reviewTag);
        });
    }

    // Submit diagnosis request to API
    async function submitDiagnosis() {
        // Show loading state
        document.getElementById('diagnosisLoading').classList.remove('hidden');
        document.getElementById('diagnosisResults').classList.add('hidden');
        document.getElementById('diagnosisError').classList.add('hidden');

        // Gather all patient data
        const patientName = document.getElementById('patientName').value;
        const symptomsList = selectedSymptoms.map(s => s.name.toLowerCase());
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('patientAge').value);
        const height = parseInt(document.getElementById('patientHeight').value);
        const weight = parseInt(document.getElementById('patientWeight').value);

        // Gather medical history, medications, allergies
        const medicalHistory = Array.from(document.getElementById('medicalHistoryTags').querySelectorAll('.tag'))
            .map(tag => tag.textContent.replace('×', '').trim());

        const medications = Array.from(document.getElementById('medicationTags').querySelectorAll('.tag'))
            .map(tag => tag.textContent.replace('×', '').trim());

        const allergies = Array.from(document.getElementById('allergyTags').querySelectorAll('.tag'))
            .map(tag => tag.textContent.replace('×', '').trim());

        // Gather lifestyle info
        const smoking = document.getElementById('lifestyleSmoking').value;
        const alcohol = document.getElementById('lifestyleAlcohol').value;
        const exercise = document.getElementById('lifestyleExercise').value;
        const diet = document.getElementById('lifestyleDiet').value;

        // Prepare data for API call
        const data = JSON.stringify({
            symptoms: symptomsList,
            patientInfo: {
                age: age,
                gender: gender,
                height: height,
                weight: weight,
                medicalHistory: medicalHistory,
                currentMedications: medications,
                allergies: allergies,
                lifestyle: {
                    smoking: smoking === 'false' ? false : smoking,
                    alcohol: alcohol,
                    exercise: exercise,
                    diet: diet
                }
            },
            lang: 'en'
        });
// API call for the analysis by the help of AI MEDICAL DIAGNOSIS API

        try {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            // Set a timeout to ensure we don't wait forever
            xhr.timeout = 15000; // 15 seconds timeout

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                        try {
                            const response = JSON.parse(this.responseText);
                            displayDiagnosisResults(response);
                        } catch (e) {
                            showDiagnosisError("Error parsing API response: " + e.message);
                        }
                    } else {
                        showDiagnosisError("API request failed with status: " + this.status);
                    }
                }
            });

            xhr.addEventListener('timeout', function() {
                showDiagnosisError("Request timed out. Please try again later.");
            });

            xhr.addEventListener('error', function() {
                showDiagnosisError("Network error occurred. Please check your connection.");
            });

            xhr.open('POST', 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1');
            xhr.setRequestHeader('x-rapidapi-key', '85270c2e8fmshadf2fcbab140ad3p11072bjsn6091dbbd3b34');
            xhr.setRequestHeader('x-rapidapi-host', 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.send(data);
        } catch (error) {
            showDiagnosisError("Error making API request: " + error.message);
        }
    }

    // Display diagnosis results
    function displayDiagnosisResults(response) {
        try {
            // Hide loading and show results
            document.getElementById('diagnosisLoading').classList.add('hidden');
            document.getElementById('diagnosisResults').classList.remove('hidden');

            // Parse the response
            let result = response;
            if (response.result) {
                result = response.result;
            }

            const analysis = result.analysis || {};

            // Display possible conditions
            const conditionsList = document.getElementById('conditionsList');
            conditionsList.innerHTML = '';

            if (analysis.possibleConditions && analysis.possibleConditions.length > 0) {
                analysis.possibleConditions.forEach((condition, index) => {
                    const conditionEl = document.createElement('div');
                    conditionEl.className = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition hover:shadow-md';

                    let riskLevelClass = 'bg-blue-500';
                    if (condition.riskLevel === 'High') {
                        riskLevelClass = 'bg-red-500';
                    } else if (condition.riskLevel === 'Medium') {
                        riskLevelClass = 'bg-yellow-500';
                    } else if (condition.riskLevel === 'Low') {
                        riskLevelClass = 'bg-green-500';
                    }

                    conditionEl.innerHTML = `
                              <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                  <div class="flex flex-col flex-grow">
                                      <div class="flex items-center">
                                          <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${condition.condition}</h4>
                                          ${condition.riskLevel ? `
                                              <span class="ml-3 px-2 py-1 text-xs font-medium text-white rounded-full ${riskLevelClass}">
                                                  ${condition.riskLevel} Risk
                                              </span>
                                          ` : ''}
                                      </div>
                                  </div>
                              </div>
                              <div class="p-4">
                                  <p class="text-gray-600 dark:text-gray-400 mb-3">${condition.description || ''}</p>

                                  ${condition.matchingSymptoms ? `
                                      <div class="mb-3">
                                          <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Matching Symptoms</h5>
                                          <div class="flex flex-wrap gap-2">
                                              ${condition.matchingSymptoms.map(symptom =>
                        `<span class="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-sm">
                                                      <i class="fas fa-check-circle text-green-500 mr-1"></i> ${symptom}
                                                  </span>`
                    ).join('')}
                                          </div>
                                      </div>
                                  ` : ''}

                                  ${condition.additionalInfo ? `
                                      <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                          <p><i class="fas fa-info-circle text-blue-500 mr-1"></i> ${condition.additionalInfo}</p>
                                      </div>
                                  ` : ''}
                              </div>
                          `;

                    conditionsList.appendChild(conditionEl);
                });
            } else {
                conditionsList.innerHTML = `
                          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
                              <i class="fas fa-info-circle text-blue-500 text-2xl mb-2"></i>
                              <p class="text-gray-600 dark:text-gray-400">No specific conditions were identified based on the provided symptoms.</p>
                              <p class="text-gray-600 dark:text-gray-400 mt-2">Please consult with a healthcare professional for a proper diagnosis.</p>
                          </div>
                      `;
            }

            // General advice
            const advice = analysis.generalAdvice || {};

            // Recommended actions
            const recommendedActions = document.getElementById('recommendedActions');
            recommendedActions.innerHTML = '';

            if (advice.recommendedActions && advice.recommendedActions.length > 0) {
                advice.recommendedActions.forEach(action => {
                    const li = document.createElement('li');
                    li.className = 'text-gray-700 dark:text-gray-300';
                    li.textContent = action;
                    recommendedActions.appendChild(li);
                });
            } else {
                recommendedActions.innerHTML = `
                          <li class="text-gray-700 dark:text-gray-300">Stay hydrated and get adequate rest.</li>
                          <li class="text-gray-700 dark:text-gray-300">Monitor your symptoms and seek medical attention if they worsen.</li>
                      `;
            }

            // Lifestyle considerations
            const lifestyleConsiderations = document.getElementById('lifestyleConsiderations');
            lifestyleConsiderations.innerHTML = '';

            if (advice.lifestyleConsiderations && advice.lifestyleConsiderations.length > 0) {
                advice.lifestyleConsiderations.forEach(consideration => {
                    const li = document.createElement('li');
                    li.className = 'text-gray-700 dark:text-gray-300';
                    li.textContent = consideration;
                    lifestyleConsiderations.appendChild(li);
                });
            } else {
                lifestyleConsiderations.innerHTML = `
                          <li class="text-gray-700 dark:text-gray-300">Maintain a balanced diet and regular sleep schedule.</li>
                          <li class="text-gray-700 dark:text-gray-300">Avoid triggers that may worsen your symptoms.</li>
                      `;
            }

            // When to seek medical attention
            const whenToSeekMedical = document.getElementById('whenToSeekMedical');
            whenToSeekMedical.innerHTML = '';

            if (advice.whenToSeekMedicalAttention && advice.whenToSeekMedicalAttention.length > 0) {
                advice.whenToSeekMedicalAttention.forEach(advice => {
                    const li = document.createElement('li');
                    li.className = 'text-gray-700 dark:text-gray-300';
                    li.textContent = advice;
                    whenToSeekMedical.appendChild(li);
                });
            } else {
                whenToSeekMedical.innerHTML = `
                          <li class="text-gray-700 dark:text-gray-300">If symptoms persist for more than a few days.</li>
                          <li class="text-gray-700 dark:text-gray-300">If you develop new or worsening symptoms.</li>
                          <li class="text-gray-700 dark:text-gray-300">If you have difficulty breathing, severe pain, or feel extremely unwell.</li>
                      `;
            }

            // Medical terminology
            const medicalTerminology = document.getElementById('medicalTerminology');
            medicalTerminology.innerHTML = '';

            const resources = result.educationalResources || {};
            const terminology = resources.medicalTerminology || {};

            if (Object.keys(terminology).length > 0) {
                Object.entries(terminology).forEach(([term, definition]) => {
                    const div = document.createElement('div');
                    div.className = 'bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700';
                    div.innerHTML = `
                              <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">${term}</h4>
                              <p class="text-gray-600 dark:text-gray-400 text-sm">${definition}</p>
                          `;
                    medicalTerminology.appendChild(div);
                });
            } else {
                medicalTerminology.innerHTML = `
                          <div class="col-span-2 text-center py-3 text-gray-500 dark:text-gray-400">
                              <p>No specific medical terminology provided.</p>
                          </div>
                      `;
            }
        } catch (error) {
            console.error("Error displaying results:", error);
            showDiagnosisError("Error displaying results: " + error.message);
        }
    }

    // Show diagnosis error
    function showDiagnosisError(message) {
        document.getElementById('diagnosisLoading').classList.add('hidden');
        document.getElementById('diagnosisResults').classList.add('hidden');

        const errorState = document.getElementById('diagnosisError');
        errorState.classList.remove('hidden');

        document.getElementById('errorMessage').textContent = message;
    }

    // Modal functionality
    function setupModalFunctionality() {
        const helpModal = document.getElementById('helpModal');
        const helpBtn = document.getElementById('helpBtn');
        const closeHelpBtn = document.getElementById('closeHelpBtn');
        const helpGotItBtn = document.getElementById('helpGotItBtn');

        function openModal() {
            helpModal.classList.remove('hidden');
        }

        function closeModal() {
            helpModal.classList.add('hidden');
        }

        helpBtn.addEventListener('click', openModal);
        closeHelpBtn.addEventListener('click', closeModal);
        helpGotItBtn.addEventListener('click', closeModal);
    }

    // Step navigation
    function setupStepNavigation() {
        // Step 1 -> Step 2
        document.getElementById('nextToStep2').addEventListener('click', () => {
            if (selectedSymptoms.length === 0) {
                alert('Please select at least one symptom before continuing.');
                return;
            }
            showStep(2);
        });

        // Step 2 -> Step 1
        document.getElementById('backToStep1').addEventListener('click', () => {
            showStep(1);
        });

        // Step 2 -> Step 3
        document.getElementById('nextToStep3').addEventListener('click', () => {
            updateReviewPage();
            showStep(3);
        });

        // Step 3 -> Step 2
        document.getElementById('backToStep2').addEventListener('click', () => {
            showStep(2);
        });

        // Step 3 -> Edit symptoms (Step 1)
        document.getElementById('editSymptoms').addEventListener('click', () => {
            showStep(1);
        });

        // Step 3 -> Edit patient info (Step 2)
        document.getElementById('editPatientInfo').addEventListener('click', () => {
            showStep(2);
        });

        // Step 3 -> Step 4 (Submit Diagnosis)
        document.getElementById('submitDiagnosis').addEventListener('click', () => {
            showStep(4);
            submitDiagnosis();
        });

        // Step 4 -> Try Again
        document.getElementById('tryAgainBtn').addEventListener('click', () => {
            submitDiagnosis();
        });

        // Step 4 -> Start Over
        document.getElementById('startOverBtn').addEventListener('click', () => {
            // Reset to default state
            showStep(1);
        });

        // Step 4 -> Print Results
        document.getElementById('printResultsBtn').addEventListener('click', () => {
            window.print();
        });

        // Step 4 -> Find Doctor (placeholder functionality)
        document.getElementById('findDoctorBtn').addEventListener('click', () => {
            alert('This feature would connect you with healthcare providers in your area.');
        });
    }

    // Initialize everything
    initializeUI();
    setupModalFunctionality();
    setupStepNavigation();
});
