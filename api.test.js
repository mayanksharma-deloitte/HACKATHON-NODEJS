const axios = require('axios');

// test for login

describe('Auth Controller Test Suite', () => {
    test('Login Employee API - Successful login', async () => {
        const loginCredentials = {
            username: 'john_doe',
            password: 'Password123',
        };

        try {
            // Make the HTTP POST request to the login endpoint
            const response = await axios.post('http://localhost:5000/auth/login', loginCredentials);

            // Check if the response status and JSON are correct
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('token');
            
        
            // Continue with further tests for the protected API...
        } catch (error) {
            // Handle errors if needed
        }
    });

    test('Login Employee API - Error', async () => {
        const loginCredentials = {
            username: 'invaliduser',
            password: 'invalidpassword',
        };

        try {
            // Make the HTTP POST request to the login endpoint
            const response = await axios.post('http://localhost:5000/auth/login', loginCredentials);

            // Check if the response status and JSON are correct for the error case
            expect(response.status).toBe(500);
            expect(response.data).toHaveProperty('error');
            const error = response.data.error;

            // Continue with further tests for the error case...
        } catch (error) {
            // Handle errors if needed
        }
    });
});
