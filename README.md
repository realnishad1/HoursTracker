# HoursTracker

HoursTracker is a persistent web application designed for tracking professional development hours, including volunteering, shadowing, research, and extracurricular activities. The application provides a robust alternative to browser-based storage by utilizing a cloud-native architecture to ensure data longevity and cross-device accessibility.

## System Architecture

The project is built using a serverless architecture on the Microsoft Azure platform. It separates the presentation layer from the data persistence layer to ensure security and scalability.

* **Frontend:** A responsive single-page application built with HTML5, CSS3, and vanilla JavaScript.
* **Backend:** Azure Functions (Node.js) serve as a secure API layer to manage data transactions.
* **Database:** Azure Table Storage provides a high-performance, NoSQL key-value store for user entries and application settings.

## Security and Data Integrity

The application follows security best practices by abstracting sensitive credentials from the client-side code.

* Credential Masking: Database connection strings are stored as environment variables within the Azure Portal.

* Server-Side Processing: Data operations are performed within the protected Azure Functions environment, preventing the exposure of storage keys to the end-user.

* Hybrid Storage: The application utilizes a "Local-First" approach, saving data to the browser's localStorage for immediate performance while asynchronously syncing with Azure for permanent persistence.

## Deployment Configuration
To deploy this application successfully:

1. Host the repository as an Azure Static Web App.

2. Configure the api_location in the GitHub Actions workflow file to point to the /api directory.

3. Define the [AZURE_STORAGE_CONNECTION_STRING] within the Environment Variables section of the Azure Static Web App configuration.

> [!NOTE]
> _This project incorporates AI-generated elements that have been reviewed and human-confirmed by me._

## Repository Structure

```text
HoursTracker/
├── index.html            # Client-side interface and application logic
└── api/                  # Serverless backend directory
    └── saveData/
        ├── index.js      # API logic for data synchronization
        ├── function.json # Azure Function trigger configuration
        └── package.json  # Backend dependency management
