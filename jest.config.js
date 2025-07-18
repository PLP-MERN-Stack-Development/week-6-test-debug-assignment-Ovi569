const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
import { add } from '../math';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
const auth = require('../../src/middleware/auth');

// jest.config.js - Root Jest configuration file

module.exports = {
  // Base configuration for all tests
  projects: [
    // Server-side tests configuration
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/tests/**/*.test.js'],
      moduleFileExtensions: ['js', 'json', 'node'],
      setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
      coverageDirectory: '<rootDir>/coverage/server',
      collectCoverageFrom: [
        'server/src/**/*.js',
        '!server/src/config/**',
        '!**/node_modules/**',
      ],
    },
    
    // Client-side tests configuration
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/src/**/*.test.{js,jsx}'],
      moduleFileExtensions: ['js', 'jsx', 'json'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/client/src/tests/__mocks__/fileMock.js',
      },
      setupFilesAfterEnv: ['<rootDir>/client/src/tests/setup.js'],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
      coverageDirectory: '<rootDir>/coverage/client',
      collectCoverageFrom: [
        'client/src/**/*.{js,jsx}',
        '!client/src/index.js',
        '!**/node_modules/**',
      ],
    },
  ],
  
  // Global configuration
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },
  testTimeout: 10000,
}; 


/*
This jest.config.js file covers Task 1 (Jest config for client/server, coverage, setup files).
To fully complete all tasks, you need additional files and code:

1. Testing Utilities:
  - Install: jest, @testing-library/react, @testing-library/jest-dom, supertest, identity-obj-proxy, babel-jest, etc.
  - For React: 
    - client/src/tests/setup.js (setup React Testing Library, e.g., import '@testing-library/jest-dom')
  - For Server:
    - server/tests/setup.js (setup test DB, e.g., connect to test MongoDB, clear DB before/after tests)

2. Supertest for API:
  - Install supertest.
  - Example test: server/tests/api/user.test.js
    ```js
    describe('User API', () => {
     it('should register a user', async () => {
      const res = await request(app).post('/api/register').send({ username: 'test', password: 'pass' });
      expect(res.statusCode).toBe(201);
     });
    });
    ```

3. Test Database:
  - Use a separate MongoDB URI for tests (e.g., process.env.MONGO_URI_TEST).
  - In server/tests/setup.js:
    ```js
    beforeAll(async () => {
     await mongoose.connect(process.env.MONGO_URI_TEST);
    });
    afterAll(async () => {
     await mongoose.connection.close();
    });
    ```

4. package.json scripts:
  ```json
  "scripts": {
    "test": "jest",
    "test:client": "jest --selectProjects client",
    "test:server": "jest --selectProjects server",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run"
  }
  ```

5. Cypress/Playwright for E2E:
  - Install cypress or playwright.
  - Add cypress.config.js or playwright.config.js.
  - Example Cypress test: cypress/e2e/login.cy.js
    ```js
    describe('Login Flow', () => {
     it('logs in user', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type('test');
      cy.get('input[name="password"]').type('pass');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
     });
    });
    ```

6. Example Unit Test (client/src/utils/__tests__/math.test.js):
  ```js
  test('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  ```

7. Example React Component Test (client/src/components/__tests__/Button.test.jsx):
  ```js
  test('renders button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  ```

8. Express Middleware Test (server/tests/middleware/auth.test.js):
  ```js
  test('calls next if authenticated', () => {
    const req = { user: { id: 1 } }, res = {}, next = jest.fn();
    auth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  ```

9. Debugging:
  - Add error boundaries in React (client/src/components/ErrorBoundary.jsx).
  - Add global error handler in Express (server/src/middleware/errorHandler.js).
  - Use logging (e.g., morgan, winston) in server.

10. Documentation:
  - Add README.md with testing strategy and instructions.

This config is a strong foundation, but you must add the above files and scripts to fully meet all requirements.