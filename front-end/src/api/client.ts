// this address will be used to make API requests to the backend server
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if(!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined in the environment variables.");
}


/* this method is used to send HTTP requests to the backend server and
 we can use it to send GET, POST, PUT, DELETE requests to the backend server */
async function sendRequest(endpoint:string, method: string, body?: any) {

    // Set up the request options, including the HTTP method and headers
    if(!method || !endpoint) throw new Error("HTTP method or endpoint is not defined.");
    const url = `${BASE_URL}${endpoint}`;// Construct the full URL by appending the endpoint to the base URL

    const response = await fetch(
        url,
        {
            method: method,
            headers: {'Content-Type': 'application/json'},
            //check if body is defined, if yes then convert it to JSON string, otherwise set it to undefined
            body: body !== undefined ? JSON.stringify(body) : undefined, 

        }
    );

    const data = await response.json();

    // Check if the response is successful (status code 200-299)
    if (!response.ok) throw new Error("Request failed");

}
