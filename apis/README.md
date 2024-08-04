# Serverless Node.js Template with Google Auth, JWT Token, and User CRUD

This is a boilerplate template for building serverless Node.js applications with Google authentication, JWT token generation, and user CRUD (Create, Read, Update, Delete) operations with authentication. It utilizes AWS Lambda functions, API Gateway, and other AWS services for serverless architecture.

## Dependencies

- `aws-sdk`: AWS SDK for interacting with AWS services.
- `axios`: Promise-based HTTP client for making requests.
- `bcryptjs`: Library for hashing passwords securely.
- `googleapis`: Google API client library for Node.js.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens (JWT).
- `mysql2`: MySQL client for Node.js.
- `sequelize`: Promise-based ORM for Node.js with support for MySQL.
- `stripe`: Stripe API client library for Node.js.
- `uuid`: Library for generating universally unique identifiers (UUIDs).

## Development Dependencies

- `nodemon`: Utility that monitors for changes in your source code and automatically restarts the server.
- `serverless`: Framework for building and deploying serverless applications.
- `serverless-http`: Plugin for running serverless functions as HTTP callbacks.
- `serverless-offline`: Plugin for simulating AWS Lambda and API Gateway locally for development and testing purposes.

## Scripts

- `start`: Starts the serverless offline environment using Nodemon for automatic server restarts. It listens on `http://localhost:4002` by default.

## Usage

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your AWS credentials and other necessary environment variables.
4. Customize the Google authentication settings and JWT token configuration as per your requirements.
5. Implement your user CRUD operations based on the provided boilerplate code.
6. Deploy your application to AWS Lambda using `serverless deploy`.

## Google Auth Configuration

To enable Google authentication, follow these steps:

1. Create a project on Google Cloud Console.
2. Enable the Google+ API and create OAuth 2.0 credentials.
3. Configure the redirect URIs and authorized JavaScript origins.
4. Set up the client ID and client secret in your environment variables or configuration files.

## JWT Token Configuration

JWT tokens are used for authentication and authorization. Customize the token expiration time, secret key, and other settings in your configuration file.

## User CRUD Operations

Implement CRUD operations for managing users in your application. Use Sequelize for interacting with the database and bcryptjs for securely hashing passwords.

## License

This project is licensed under the ISC License.

---

Feel free to extend and customize this template according to your project requirements. Happy coding! 🚀
