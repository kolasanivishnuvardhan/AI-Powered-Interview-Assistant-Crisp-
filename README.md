# AI Interview Assistant

An interactive web application designed to simulate a real-world AI-powered job interview. This project provides a complete end-to-end experience for both the interviewee and the interviewer, featuring automated resume parsing, a timed question-and-answer session, and a dashboard for reviewing results.

---

**[➡️ Watch the Demo Video Here](https://example.com/demo-video-link)**

---

## Features

###  interviewee Flow
1.  **Resume Upload**: Candidates begin by uploading their resume in either **PDF** or **DOCX** format.
2.  **Automated Information Extraction**: The system automatically parses the resume to extract the candidate's Name, Email, and Phone Number using regular expressions.
3.  **Pre-interview Chatbot**: If any information is missing, a friendly chatbot prompts the user to provide the details manually. It then confirms the collected information before proceeding.
4.  **Timed Interview Session**: The core of the experience is a timed interview consisting of 6 questions with varying difficulty:
    *   **2 Easy Questions** (20 seconds each)
    *   **2 Medium Questions** (60 seconds each)
    *   **2 Hard Questions** (120 seconds each)
5.  **Interactive UI**: During the interview, a **progress bar** shows the candidate's overall progress, and a circular **countdown timer** is displayed for each question. If the timer runs out, the current answer is submitted automatically.
6.  **Automated Scoring & Summary**: Upon completion, the system provides an instant mock score out of 110 and a qualitative summary of the candidate's performance.
7.  **Session Persistence**: If the candidate accidentally closes the tab or refreshes the page mid-interview, a "Welcome Back" modal appears, allowing them to **resume exactly where they left off**, with the timer adjusted accordingly.

### Interviewer Flow
1.  **Candidate Dashboard**: Interviewers have access to a dashboard that displays a table of all candidates who have completed the interview.
2.  **Search and Sort**: The dashboard table is fully interactive, allowing the interviewer to:
    *   **Search** for candidates by name or email.
    *   **Sort** the list by name or final score (highest first by default).
3.  **Detailed Interview Review**: Clicking on a candidate opens a detailed modal view that includes:
    *   The candidate's full profile information.
    *   The final score and AI-generated summary.
    *   A complete list of all questions, the candidate's answers, and the score awarded for each individual answer.

## Tech Stack

-   **Frontend**: React, Vite, TypeScript
-   **State Management**: Redux Toolkit, Redux Persist
-   **UI Library**: Ant Design
-   **Routing**: React Router DOM
-   **File Parsing**: `pdf-parse` for PDFs, `mammoth` for DOCX
-   **Unique IDs**: `uuid` for session management

## Project Setup

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

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

## Deployment

This project is a standard React single-page application (SPA) and can be deployed to any static hosting service. Below are instructions for Vercel and Netlify.

### Vercel
1.  Sign up or log in to [Vercel](https://vercel.com).
2.  Click "Add New..." -> "Project".
3.  Import the Git repository for this project.
4.  Vercel will automatically detect that it is a Vite project and configure the build settings.
5.  Click **Deploy**. Vercel will build and deploy the site, providing you with a live URL.

### Netlify
1.  Sign up or log in to [Netlify](https://app.netlify.com).
2.  Click "Add new site" -> "Import an existing project".
3.  Connect to your Git provider and select the repository.
4.  Netlify will detect it's a Vite project. Ensure the build settings are:
    *   **Build command**: `npm run build` or `vite build`
    *   **Publish directory**: `dist`
5.  Click **Deploy site**. Netlify will build and deploy the site.