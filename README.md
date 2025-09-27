# AI Interview Assistant

This project is a web application designed to assist with AI-powered job interviews. It provides separate interfaces for interviewees and interviewers.

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ai-interview-assistant
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Features

- **Interviewee Mode:** Allows candidates to upload their resume, practice answering interview questions, and receive AI-driven feedback.
- **Interviewer Mode:** Enables interviewers to define job roles, manage candidates, and conduct interviews.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **State Management:** Redux Toolkit, Redux Persist
- **Routing:** React Router DOM
- **UI Library:** Ant Design
- **File Parsing:** pdf-parse, docx