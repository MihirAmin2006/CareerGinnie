// AI Service Configuration
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Resume Generation Function
async function generateResume(userProfile) {
    try {
        const prompt = `Generate a professional resume in HTML format with the following details:
            Full Name: ${userProfile.fullName}
            Professional Title: ${userProfile.title}
            Experience: ${userProfile.experience}
            Skills: ${userProfile.skills}
            Education: ${userProfile.education}
            Achievements: ${userProfile.achievements}`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error generating resume:', error);
        throw error;
    }
}

// Resume Analysis Function
async function analyzeResume(resumeText) {
    try {
        const prompt = `Analyze this resume and provide detailed feedback on:
            1. Overall impression
            2. Key strengths
            3. Areas for improvement
            4. Formatting suggestions
            5. Content recommendations
            Resume text: ${resumeText}`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
}

// ATS Compatibility Check Function
async function checkATSCompatibility(resumeText) {
    try {
        const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility and provide:
            1. Compatibility score (0-100)
            2. Keyword analysis
            3. Format compatibility
            4. Specific improvements for ATS optimization
            Resume text: ${resumeText}`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error checking ATS compatibility:', error);
        throw error;
    }
}

// Export functions
export {
    generateResume,
    analyzeResume,
    checkATSCompatibility
};