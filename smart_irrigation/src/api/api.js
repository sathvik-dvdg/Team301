// This file manages communication with the backend API.

/**
 * Fetches data from the /dashboard route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the data from the /dashboard route, or rejects with an error.
 */
const getDashboardData = async () => {
  try {
    // Make a GET request to the /dashboard route.
    const response = await fetch('http://localhost:3000/dashboard');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching dashboard data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

/**
 * Fetches historical data from the /dashboard-history route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the historical data from the /dashboard-history route, or rejects with an error.
 */
const getDashboardHistoryData = async () => {
  try {
    // Make a GET request to the /dashboard-history route.
    const response = await fetch('http://localhost:3000/dashboard-history');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching dashboard history data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

/**
 * Fetches data from the /firstpage route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the data from the /firstpage route, or rejects with an error.
 */
const getFirstPageData = async () => {
  try {
    // Make a GET request to the /firstpage route.
    const response = await fetch('http://localhost:3000/firstpage');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching first page data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

/**
 * Fetches historical data from the /firstpage-history route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the historical data from the /firstpage-history route, or rejects with an error.
 */
const getFirstPageHistory = async () => {
  try {
    // Make a GET request to the /firstpage-history route.
    const response = await fetch('http://localhost:3000/firstpage-history');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching first page history data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};



/**
 * Fetches data from the /secondpage route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the data from the /secondpage route, or rejects with an error.
 */
const getSecondPageData = async () => {
  try {
    // Make a GET request to the /secondpage route.
    const response = await fetch('http://localhost:3000/secondpage');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching second page data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

/**
 * Fetches historical data from the /secondpage-history route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the historical data from the /secondpage-history route, or rejects with an error.
 */
const getSecondPageHistory = async () => {
    try {
      // Make a GET request to the /secondpage-history route.
      const response = await fetch('http://localhost:3000/secondpage-history');
  
      // Check if the request was successful (status code 200-299).
      if (!response.ok) {
        // If not, throw an error with the status code and status text.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response body.
      const data = await response.json();
  
      // Return the data.
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch operation.
      console.error('Error fetching second page history data:', error);
      throw error; // Re-throw the error to be handled by the caller.
    }
  };


/**
 * Fetches data from the /thirdpage route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the data from the /thirdpage route, or rejects with an error.
 */
const getThirdPageData = async () => {
  try {
    // Make a GET request to the /thirdpage route.
    const response = await fetch('http://localhost:3000/thirdpage');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching third page data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

/**
 * Fetches historical data from the /thirdpage-history route of the backend API.
 * @returns {Promise<any>} A promise that resolves with the historical data from the /thirdpage-history route, or rejects with an error.
 */
const getThirdPageHistory = async () => {
  try {
    // Make a GET request to the /thirdpage-history route.
    const response = await fetch('http://localhost:3000/thirdpage-history');

    // Check if the request was successful (status code 200-299).
    if (!response.ok) {
      // If not, throw an error with the status code and status text.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body.
    const data = await response.json();

    // Return the data.
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation.
    console.error('Error fetching third page history data:', error);
    throw error; // Re-throw the error to be handled by the caller.
  }
};

// Export the functions so they can be used in other parts of the frontend.
export { getDashboardData, getFirstPageData, getSecondPageData, getThirdPageData, getDashboardHistoryData, getFirstPageHistory, getSecondPageHistory, getThirdPageHistory };
