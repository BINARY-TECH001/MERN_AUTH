# MERN Stack Authentication System

This project is a robust authentication system built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides essential features such as user registration, login, password reset with email verification, and OTP-based password reset functionality. This system ensures a secure and seamless user experience, making it an ideal foundation for applications that require user authentication and authorization.

## Features

- **User Registration:** Users can register by providing necessary information, including email and password.
  
- **User Login:** Registered users can securely log in to their accounts using their credentials.
  
- **Password Reset:** Users can request a password reset. A reset link is sent to the registered email address.

- **Email Verification:** A verification email is sent upon registration to verify the user's email address.

- **OTP-based Password Reset:** Users can reset their password by verifying their identity through a one-time password (OTP) sent to their email.

## Technologies Used

- **MongoDB:** A NoSQL database used to store user data securely.
  
- **Express.js:** A Node.js web application framework used for building robust APIs.
  
- **React.js:** A JavaScript library used for building user interfaces, providing a responsive and interactive user experience.
  
- **Node.js:** A JavaScript runtime environment used for server-side development.

- **Nodemailer:** A module for Node.js applications that allows sending email.

- **JSON Web Tokens (JWT):** Used for secure transmission of information between parties as a JSON object.

## Getting Started

1. **Clone the Repository:**

  git clone https://github.com/binary-tech001/mern_auth.git
  cd authentication-system


2. **Install Dependencies:**

  cd server
  npm install
  cd ../client
  npm install


3. **Set Up Environment Variables:**
Create a `.env` file in the `server` directory with the following variables:
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  EMAIL_USERNAME=your_email_provider_username
  EMAIL_PASSWORD=your_email_provider_password

4. **Run the Application:**
In the `server` directory, run:
  npm start

In the `client` directory, run:
  npm start


5. **Access the Application:**
The application will be accessible at `http://localhost:3000` in your web browser.

## Usage

- **Register:** Navigate to the registration page and provide the required information to create a new account.

- **Login:** Access the login page and enter your registered email and password to log in.

- **Password Reset:** If you forget your password, click on the "Forgot Password" link, provide your email address, and follow the instructions in the email sent to reset your password.

- **Email Verification:** Upon registration, check your email inbox for a verification email. Click on the verification link to confirm your email address.

- **OTP-based Password Reset:** To reset your password using OTP, click on the "Forgot Password" link, provide your email address, and follow the instructions to enter the OTP sent to your email.

## Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please create a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

Special thanks to the MERN stack community for their valuable resources and support in building this authentication system.

Happy coding! 😊
