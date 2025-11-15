# Job Finder Front End

This is the front-end application for Job Finder, a platform designed to connect job seekers with potential employers. The application is built using React and Vite, and it leverages various modern web technologies to provide a seamless user experience.

To use the Admin Controls login with this Credentials 

Login ID-admin@example.com
Password-Admin@123

## Features

### User Authentication
- **Register**: Users can create a new account by providing their personal information, including name, email, password, profile picture, and resume.
- **Login**: Existing users can log in using their email and password.
- **Change Password**: Users can change their password from their profile.
- **Delete Account**: Users can delete their account if they no longer wish to use the platform.

### User Profile
- **View Profile**: Users can view their profile information, including their avatar, name, email, and skills.
- **Edit Profile**: Users can update their profile information, including their avatar, resume, and skills.

### Job Management
- **View Jobs**: Users can browse through a list of available jobs.
- **Job Details**: Users can view detailed information about a specific job, including the company name, job title, description, location, salary, and required skills.
- **Apply for Jobs**: Users can apply for jobs directly from the job details page.
- **Save Jobs**: Users can save jobs to review later.

### Applications Management
- **View Applications**: Users can view all the jobs they have applied for.
- **Application Details**: Users can view detailed information about their job applications, including the status and the date of application.

### Admin Features
- **Dashboard**: Admins can view a dashboard with statistics about the platform, including the number of jobs, applications, and users.
- **Manage Jobs**: Admins can create, edit, and delete job postings.
- **Manage Users**: Admins can view all users and update their roles.
- **Manage Applications**: Admins can view all job applications and update their statuses.

### Additional Features
- **Responsive Design**: The application is fully responsive and works well on both desktop and mobile devices.
- **Loading Indicators**: The application shows loading indicators while fetching data to improve user experience.
- **Notifications**: Users receive notifications for various actions, such as successful login, application submission, and profile updates.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Redux Toolkit**: A library for managing application state.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Framer Motion**: A library for animations in React.
- **React Icons**: A library for including icons in React applications.

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/job-finder-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd job-finder-frontend
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. The application will be running on `http://localhost:3000`.

---

## Installation Guide for Backend

If you want to set up the backend, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Prithipponraj/Job-portal-Backend
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add your environment variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. The server will be running on `http://localhost:5000`.

---

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository**: Create a personal copy of the repository by clicking the "Fork" button at the top-right of the repository page.
2. **Clone your fork**: Clone the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/Prithipponraj/job-finder-frontend.git
    ```

3. **Create a new branch**: Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature
    ```

4. **Make your changes**: Implement the desired changes or improvements to the project.
5. **Commit your changes**: Commit your changes with a clear and concise commit message:

    ```bash
    git commit -m "Implement feature X"
    ```

6. **Push to your fork**: Push the changes to your forked repository:

    ```bash
    git push origin feature/your-feature
    ```

7. **Submit a pull request**: Go to the original repository and click on "New Pull Request" to propose your changes.

Ensure that your code follows the existing coding style and includes tests for new features. We appreciate any improvements or bug fixes!

Feel free to update the repository and project-specific details to match your actual setup. This will help other developers (or yourself in the future) understand the structure and purpose of your project!
