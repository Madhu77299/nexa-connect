/**
 * API Mock and service abstraction for PMK Nexa Solutions Pvt. Ltd.
 */

// Centralized Config for Base Url or endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Delay helper to mock network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Submit contact form lead details
 * @param {Object} data 
 * @returns {Promise<Object>}
 */
export async function submitContactForm(data) {
  await delay(1200);

  // Client-side simple validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    throw new Error("Validation Failed: Please fill in all required fields.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Validation Failed: Please provide a valid email address.");
  }

  // If a real API base URL is specified, run the actual request
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Server returned status code: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      throw new Error(`Network Error: ${err.message}`);
    }
  }

  // Mock Success Response
  return {
    success: true,
    message: "Thank you! Your contact message has been recorded.",
    refId: `NEXA-MSG-${Math.floor(100000 + Math.random() * 900000)}`
  };
}

/**
 * Submit a Job Application
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function submitJobApplication(data) {
  await delay(1500);

  // Validations
  if (!data.name || !data.email || !data.phone || !data.jobId) {
    throw new Error("Validation Failed: Missing required personal details.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Validation Failed: Invalid email format.");
  }

  if (!data.resumeFile) {
    throw new Error("Validation Failed: Please upload your resume (PDF/DOCX).");
  }

  // If real API configured
  if (API_BASE_URL) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'resumeFile') {
          formData.append('resume', data.resumeFile);
        } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/careers/apply`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Server returned status code: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      throw new Error(`Network Error: ${err.message}`);
    }
  }

  // Mock Success Response
  return {
    success: true,
    message: "Your application has been received successfully.",
    applicationId: `NEXA-APP-${Math.floor(100000 + Math.random() * 900000)}`
  };
}
