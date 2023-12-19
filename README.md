# Learning Management System (LMS) with Next.js, Prisma, MongoDB, Uploadthing, Clerk, Mux, and Vidstack

![Instructor-hero](https://github.com/kcokoji/learnhub/assets/100976015/02e69b95-84bd-4899-8181-f54390d8a5e5)


## Project Overview

This repository contains the source code for a modern Learning Management System (LMS) built using Next.js as the frontend framework, Prisma and MongoDB for database management, Uploadthing for file uploads, Clerk for authentication, and Mux and Vidstack for handling video content. The LMS is designed to provide a comprehensive platform for managing and delivering educational content efficiently.

### Features

- **Next.js Frontend:** Utilizing the power of Next.js for building a dynamic and responsive user interface.
- **Prisma and MongoDB:** Employing Prisma as the database ORM and MongoDB as the database to store and retrieve data efficiently.
- **Uploadthing Integration:** Seamless integration with Uploadthing for easy and secure file uploads, catering to various content types.
- **Clerk Authentication:** Implementing Clerk for user authentication, ensuring a secure and user-friendly login experience.
- **Mux and Vidstack Integration:** Leveraging Mux and Vidstack for video processing, streaming, and management within the LMS.

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/kcokoji/learnhub.git
```
### 2. Install dependencies:
```bash
cd learnhub
npm install
```
### 3. Configure environment variables:
Create a .env file based on the provided .env.example template. Update the variables with your own API keys, database connection strings, and other configuration options.

### 4. Run the development server:
```bash
npm run dev
```
The application should now be accessible at http://localhost:3000.

### 5.Environment Variables
The project relies on several environment variables for configuration. Create a .env file in the root of your project based on the provided .env.example template. Update each variable with your own values.

Example .env File
```bash

# Prisma
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


# Uploadthing
UPLOADTHING_SECRET=

# Mux
MUX_TOKEN_ID=
MUX_SECRET_KEY=

#Paystack
PAYSTACK_PUBLIC_KEY
```
Ensure that you keep your .env file secure and do not expose sensitive information.

### Deployment
To deploy the LMS, follow the deployment guidelines for each service (Next.js, Prisma, MongoDB, Uploadthing, Clerk, Mux, and Vidstack) and ensure that all necessary environment variables are set correctly in the production environment.

### Contributing
If you would like to contribute to the project, please follow the contributing guidelines.

### License
This project is licensed under the MIT License. Feel free to fork and modify the code for your own educational or commercial purposes.

### Acknowledgments
Special thanks to the contributors and the open-source community for their valuable contributions and support.
