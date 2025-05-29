
Whois Lookup Application
A full-stack web application for querying domain and contact information using the Whois API, built as part of the TLV300 Full Stack Developer assignment. The backend is implemented with Flask (Python) and the frontend with React and Tailwind CSS.
Features

Input Form: Enter a domain name (e.g., amazon.com) and select the type of information (Domain Information or Contact Information).
Data Display: Results are shown in a formatted table with domain details (Domain Name, Registrar, Registration Date, Expiration Date, Estimated Domain Age, Hostnames) or contact details (Registrant Name, Technical Contact Name, Administrative Contact Name, Contact Email).
Error Handling: Gracefully handles invalid domains, missing inputs, or API errors with user-friendly messages.
Styling: Responsive and visually appealing UI using Tailwind CSS.
API Integration: Backend queries the Whois API (whoisxmlapi.com) and formats responses as specified.

Project Structure
whois-lookup-app/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env
│   └── venv/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── WhoisForm.jsx
│   │       ├── WhoisTable.jsx
│   │       └── ErrorMessage.jsx
├── .gitignore
└── README.md

Prerequisites

Python: 3.8 or higher
Node.js: 16 or higher
Whois API Key: Obtain a free API key from whoisxmlapi.com by creating an account and accessing the settings.
Git: For cloning the repository.

Setup Instructions
1. Clone the Repository
git clone <repository-url>
cd whois-lookup-app

2. Backend Setup

Navigate to the backend directory:cd backend


Create a virtual environment and activate it:python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate


Install dependencies:pip install -r requirements.txt


Create a .env file in the backend directory with your Whois API key:WHOIS_API_KEY=your_api_key_here

Replace your_api_key_here with your actual key from whoisxmlapi.com. Do not commit this file to Git.

3. Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install



4. Running the Application

Start the Backend:
In the backend directory:source venv/bin/activate  # On Windows: .\venv\Scripts\activate
python app.py


The backend runs on http://localhost:5000.


Start the Frontend:
In the frontend directory (open a new terminal):npm start


The frontend runs on http://localhost:5173 (Vite's default port).
If you need network access (e.g., for testing on another device):npm run start -- --host





5. Using the Application

Open http://localhost:5173 in your browser.
Enter a domain name (e.g., amazon.com).
Select "Domain Information" or "Contact Information" from the dropdown.
Click "Lookup" to view results in a table.
Errors (e.g., invalid domain, API failure) are displayed in a red box below the form.

Testing

Test Domain: Use amazon.com to verify functionality.
Domain Information: Displays Domain Name, Registrar, Registration Date, Expiration Date, Estimated Domain Age, and Hostnames (truncated to 25 characters with ... if longer).
Contact Information: Displays Registrant Name, Technical Contact Name, Administrative Contact Name, and Contact Email.


Error Handling: Test with an invalid domain (e.g., invalid.domain) to confirm error messages.
Backend Test: Verify the API endpoint:curl -X POST -H "Content-Type: application/json" -d '{"domainName":"amazon.com","dataType":"domain"}' http://localhost:5000/api/whois



Deployment Notes

Local Deployment: The application is designed to run locally with the backend on port 5000 and frontend on port 5173.
Production Deployment:
Use a production WSGI server (e.g., Gunicorn) for the backend instead of Flask’s development server.
Serve the frontend via a static file server (e.g., Nginx) after building:cd frontend
npm run build


Configure a reverse proxy (e.g., Nginx) to route API requests to the backend and serve frontend assets.
Store WHOIS_API_KEY in environment variables on the server, not in the repository.



Security Notes

.env File: Ensure backend/.env is not committed to Git. The .gitignore file includes:backend/.env
backend/venv/
frontend/node_modules/
frontend/.vite/


API Key: Never hardcode the Whois API key in source code. Use the .env file or environment variables.

Troubleshooting

Frontend Errors:
Check browser console (F12 → Console) for errors during API requests.
Ensure all files (App.jsx, WhoisForm.jsx, etc.) are in the correct locations (frontend/src/ and frontend/src/components/).


Backend Errors:
Verify WHOIS_API_KEY is valid in backend/.env.
Check backend logs in the terminal for API request failures.
Test the Whois API directly:curl "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=your_api_key_here&domainName=amazon.com&outputFormat=JSON"




CORS Issues: The backend includes flask-cors to allow requests from http://localhost:5173. If issues persist, verify flask-cors is installed:pip install flask-cors



Technologies Used

Backend: Python, Flask, requests, python-dotenv, flask-cors
Frontend: React, Vite, Tailwind CSS, Axios
API: Whois API (whoisxmlapi.com)

Notes

The application meets all assignment requirements, including formatted tables, error handling, and a responsive UI.
Hostnames are truncated to 25 characters with ... if longer, as specified.
The backend handles invalid inputs and API errors gracefully.
The frontend communicates with the backend via HTTP POST requests to http://localhost:5000/api/whois.

For further assistance, contact the repository owner or refer to the assignment document.
Good Luck!
