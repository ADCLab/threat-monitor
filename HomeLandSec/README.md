# HomeLandSec Project

The **HomeLandSec Project** is a modular front-end application designed for the rapid deployment of research surveys. The project is intended to facilitate volunteer participation in data collection for training classifiers by gathering human evaluations alongside ChatGPT rankings. By comparing these evaluations, the system aims to bridge the gap between human intuition and AI assessments, ultimately contributing to the development of a highly accurate classifier.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Customization](#customization)
- [Setup and Installation](#setup-and-installation)
- [Deployment](#deployment)
- [Future Directions](#future-directions)
- [Additional Information](#additional-information)
- [Contributing](#contributing)

---

## Overview

The HomeLandSec Project provides a containerized solution that includes both a frontend and a backend designed for research surveys. Volunteers use the frontend to answer customizable survey questions, providing valuable data to evaluate discrepancies between human and ChatGPT rankings. This comparison is crucial in refining the classifier's accuracy, as it helps to pinpoint areas where human judgment may differ from AI assessment.

The current backend is implemented as a boilerplate Flask application, which is planned to be replaced by the more comprehensive [ADC Backend project](https://github.com/ADC-Lab/adc-backend) upon its completion.

---

## Features

- **Modular Survey Design**: Easily deploy surveys with customizable questions and criteria.
- **Volunteer Data Collection**: Gather training data through human evaluation, supplementing AI-generated rankings.
- **Customizability**: Non-technical users can modify survey details by editing a JSON configuration file.
- **Containerized Environment**: Includes both frontend and backend in a reproducible Docker environment.
- **Data Consistency**: Changes in the survey configuration file automatically propagate through the project, ensuring consistent data serving.

---

## Architecture

The project follows a containerized architecture comprising:

- **Frontend**: A modular TypeScript application that renders surveys to volunteers. Users can modify survey questions, question quantity, criteria, and other parameters by editing the configuration file located at:
  - [HomeLandSec/frontend/public/survey.json](HomeLandSec/frontend/public/survey.json)
  
- **Backend**: Currently a boilerplate Flask backend that handles data submissions. Future updates will integrate the backend with the ADC Backend project for enhanced functionality.

This separation of concerns allows for scalable updates and easier maintenance of individual components.

---

## Customization

### Modifying Survey Content

The survey itself is highly configurable. All survey parameters such as questions, question counts, evaluation criteria, and other metadata are managed via a JSON file. To customize the survey:

1. Navigate to the file:
   - `HomeLandSec/frontend/public/survey.json`
2. Edit the contents to:
   - Change the text of the survey questions.
   - Adjust the number of questions.
   - Modify evaluation criteria as required by your research parameters.

This design ensures that even non-technical team members can update the survey content without the need to modify the underlying codebase.

### Customization Considerations

- **Validation**: Ensure that any modifications maintain the JSON structure to avoid breaking the application.
- **Synchronization**: Changes made in the JSON file are automatically reflected in the application, maintaining consistency across the system.

---

## Setup and Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- Basic understanding of containerized applications

### Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone git@github.com:ADCLab/threat-monitor.git
   cd threat-monitor
   ```

2. **Review the Survey Configuration**
   - Open and update `HomeLandSec/frontend/public/survey.json` if needed.

3. **Setup the Environment**
   - Ensure that all necessary files, including the Docker configuration files, are present in the repository.

---

## Deployment

The project has been containerized to ensure a consistent and reproducible environment. To build and run the containers, follow these steps:

1. **Build the Docker Images**
   ```bash
   docker-compose build
   ```

2. **Start the Containers**
   ```bash
   docker-compose up
   ```

These commands initialize both the frontend and backend containers, providing an environment for testing and further development. The reproducible setup allows for consistent testing across different environments.

---

## Additional Information

For further details or if you require customization guidance, please provide:

- **Specific requirements** for the survey questions and criteria.
- **Feedback** on the current data collection process.
- **Suggestions** for additional features or improvements.

Your input is invaluable in ensuring that the project meets the needs of both volunteers and the research team.

---

## Contributing

Contributions to the HomeLandSec Project are welcome. If you wish to contribute:

1. Fork the repository.
2. Create a feature branch for your changes.
3. Submit a pull request with a detailed description of your changes and improvements.

---

This README provides an overview of the HomeLandSec Project, instructions for setup and deployment, and points of customization for survey content. For any inquiries or further details, please contact the project maintainers or open an issue on our [GitHub repository](https://github.com/ADC-Lab/threat-monitor/issues).
