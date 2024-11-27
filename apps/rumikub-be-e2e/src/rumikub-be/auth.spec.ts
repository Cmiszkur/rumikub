import axios from 'axios';

describe('Guest Login E2E Test', () => {
  let serverUrl: string;

  beforeAll(() => {
    // Base URL of your NestJS application (adjust as needed)
    serverUrl = 'http://localhost:3000/api';
  });

  it('should generate a guest login token', async () => {
    const response = await axios.post(`${serverUrl}/auth/guest-login`, { username: 'guest' });

    // Assertions
    expect(response.status).toBe(201); // Assuming 201 Created is the response
    expect(response.data).toHaveProperty('access_token'); // Ensure token is returned
    expect(typeof response.data.access_token).toBe('string');
  });
});
