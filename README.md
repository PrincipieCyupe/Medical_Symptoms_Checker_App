**MEDIASSIST SYMPTOM CHECKER**
-----------------------------------

**Table of Contents**

1. Overview
2. Features
3. Demo
4. Technologies Used
5. API Integration
6. Local Development Setup
7. Deployment (_Prerequisites_ , _Web Server Configuration_,  _Load Balancer Setup_)
8. Challenges and Solutions
9. Credits and Acknowledgments
-----------------------------------------------------------------------------------------------------

**1. OVERVIEW**
-------------------------

MediAssist Symptom Checker is a user-friendly web application designed to help users identify potential medical conditions based on their symptoms. The application guides users through a structured process of symptom selection, personal health information input, and generates a comprehensive health assessment using AI-powered medical diagnosis.

Important Disclaimer: This application is for educational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for medical concerns.

**2. FEATURES**
------------------------------------------

 **2.1 Interactive Symptom Selection**
- Category-based filtering (head, chest, abdomen, skin, general)
- Searchable symptom database
- Visual selection with clear feedback
  
**2.2 Comprehensive Patient Information Collection**
- Demographics (name, age, gender, height, weight)
- Medical history with tagging system
- Current medications and allergies tracking
- Lifestyle factors assessment
  
**2.3 AI-Powered Symptom Analysis**
- Integration with medical diagnosis API
- Risk level assessment for potential conditions
- Symptom-condition correlation analysis
  
**2.4 Personalized Health Recommendations**
- Condition-specific action recommendations
- Lifestyle modification suggestions
- Guidelines for when to seek medical attention
  
**2.4 Responsive User Experience**
- Mobile-first design approach
- Step-by-step guided process with progress indicators
- Accessible design considerations
  
 **3. DEMO**
 --------------------
 **A link to a demo video (demonstrating how to use application locally and how to access it online)** : [https://drive.google.com/file/d/1kOi_aiEHSykTmvyIAZEdMFm_C68cGeyq/view?usp=sharing](url)
 
 Open this link to access Medical Symptom Checker; [https://www.principie.tech](url)
 
 **4. Technology used:**
 ---------------------------------
 - Frontend:
      -HTML: for structuring a webpage
      -CSS: for styling
      -JavaScripts
- API Interactions:
     - AI Medical Diagnosis API from[ RapidAPI.com](url)
- Deployment:
    Deployed on nginx and haproxy for load balancing

**5. API INTERACTION**
  -------------------------------------
The application integrates with the AI Medical Diagnosis API from RapidAPI to process symptoms and provide potential diagnoses. This API analyzes user-provided symptoms against a comprehensive medical database to identify potential conditions and offers recommendations.

API Documententation: via this link to access the documentation [https://rapidapi.com/bilgisamapi-api2/api/ai-medical-diagnosis-api-symptoms-to-results](url)

**6. LOCAL DEVELOPMENT SETUP**
----------------------------------

Follow these steps to set up the project for local development:
 **Step 1**:
  Clone this repo: Medical_Symptoms_Checker_App .
   by: git clone [https://github.com/PrincipieCyupe/Medical_Symptoms_Checker_App](url)
   then move inside it by: cd Medical_Symptoms_Checker_App 
 **Step 2**:
   OPEN THE PROJECT:
     You can simply open the index.html file in your browser as this is a purely front-end application

**7. DEPLOYMENT**
------------------------------------
**7.1 Prerequisites**

Two web servers:
  - **Web-01** and **Web-02** (where nginx is installed, and I configured /etc/nginx/sites_available/default, this file is where I hosted my application for instance: I put all my files used to make application including; HTML, CSS, and JS, all were put inside this /var/www/html so that it can be accessed by visiting the IP_Address)
    
Load balancer:
  -Through **lb-01** (where **haproxy** is installed **to distribute the requests** through those two servers. And those were done through configuring an haproxy config file ( /etc/haproxy/haproxy.cfg ), So you can access it through linking up to the IP_address of this lb-01)
  
**7.2 Domain name**
  - A domain used, was created from DotTech domain where I used to link up with the IP_Address so if you vist my domain you will get the same by visiting via IP_Address.
    
**7.3 SSL certificate**
  -  From lb-01 , I created a certificate using **certbot**, issued by Letsencrypt and signed by it. So, it can be secure as it is.
    
**8. CHALLENGES AND SOLUTIONS**
-------------------------------------------------
**API Rate Limiting**
     Challenge: RapidAPI imposes request limits on free tier accounts.
     solution: upgrading to a paid plan

**9. CREDITS and ACKNOWLEDGEMENT**
----------------------------------------------------

API USED: ** AI MEDICAL DIAGNOSIS API from RapidAPI**
  [https://rapidapi.com/bilgisamapi-api2/api/ai-medical-diagnosis-api-symptoms-to-results](url)
Visit the link above for it's documentation.
    
