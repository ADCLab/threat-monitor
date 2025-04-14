# Home Security Project

The **Home Security Project** is an ADC Lab initiative focused on the collection and detection of dangerous comments. By leveraging advanced natural language processing techniques, the project processes and analyzes large datasets of comments to identify potential risks and generate high-quality training data for model refinement.

This repository integrates multiple components written in different languages, including Python for backend processing and TypeScript for frontend survey deployment. The project is organized into several modules—each dedicated to a specific aspect of the overall system.

## Table of Contents
- [Background and Motivation](#background-and-motivation)
- [Repository Structure](#repository-structure)
  - [OpenAI_v2.py](#openai_v2py)
  - [HomeLandSec Module](#homelandsec-module)
  - [Classifier Module](#classifier-module)
- [Architecture and Components](#architecture-and-components)
- [Prerequisites](#prerequisites)
- [Contribution Guidelines](#contribution-guidelines)
- [Acknowledgements](#acknowledgements)



## Background and Motivation

This project includes:

- **Data Collection**: Efficiently gathering approximately 600,000 comments for evaluation.
- **Risk Assessment**: Utilizing NLP techniques and models such as [ChatGPT](https://openai.com/research) to rank comments based on predetermined criteria.
- **Survey Deployment**: Implementing a modular TypeScript-based survey application to support Homeland Security sub-projects, ensuring interactive and user-friendly data collection.
- **Model Development**: Experimenting with various classifiers through iterative Jupyter Notebook experiments to optimize detection accuracy.

The insights derived contribute not only to immediate security responses but also to enhanced training data for future security-related applications.


## Repository Structure

### OpenAI_v2.py
- **Location**: [OpenAI_v2.py](RANKING.md)
- **Description**: A Python script that automates the ranking of approximately 600K comments. It interacts with ChatGPT to assign an integer ranking to each comment based on a predefined criterion.
- **Key Features**:
  - Batch processing of large comment datasets.
  - Integration with ChatGPT for dynamic evaluation.
  - Extensive logging and error handling.
  - Exponential backoff for managing rate limits.

### HomeLandSec Module
- **Location**: [HomeLandSec/](HomeLandSec/README.md)
- **Description**: A modular TypeScript application that serves as a deployable survey for Homeland Security sub-projects. Its design ensures that survey responses from volunteers are collected reliably.
- **Key Features**:
  - User-friendly survey interface.
  - Modular architecture for easy updates.
  - Seamless integration with ADC Lab’s data collection frameworks.
  - Designed for future integration with ADC’s modular backend systems.

### Classifier Module
- **Location**: [Classifier/](Classifier/README.md)
- **Description**: A collection of Jupyter Notebooks documenting different iterations of classifiers trained on the Homeland Security comments dataset. It tracks the evolution of the models with details on parameter adjustments, performance metrics, and experimental results.
- **Key Features**:
  - Iterative model development with detailed documentation.
  - Visual performance metrics, including accuracy, precision, recall, and F1 score.
  - Comprehensive preprocessing and data visualization for reproducibility.

## Architecture and Components

The architecture of the Home Security Project is designed to promote modularity and flexibility. Key components include:

1. **Data Ingestion Module**: Responsible for managing the influx of comments and preparing the data for processing.
2. **Evaluation Engine**: Utilizes a combination of heuristics and AI-powered services (i.e., ChatGPT) to rank and categorize comments.
3. **Survey Application**: Provides an interactive user interface (UI) for capturing additional contextual or evaluative data via surveys.
4. **Model Training and Experimentation**: Houses various Jupyter Notebooks used to develop and evaluate classifier models on annotated comments data.

*Further architectural diagrams and details can be added once more specific information is provided regarding the design decisions and data flows within the project.*


## Prerequisites

Before setting up the repository locally, ensure that you have the following dependencies installed:

- **Python 3.12**: Required for running the backend scripts and Jupyter Notebooks.
- **Node.js and npm**: Required for running the TypeScript-based HomeLandSec application.
- **Jupyter Notebook or JupyterLab**: Recommended for exploring and running the Classifier notebooks.


## Contribution Guidelines

Contributions are welcome. If you wish to contribute to the project, please follow these guidelines:

1. **Fork the repository** and create your feature branch.
2. **Ensure your code adheres to** the existing style and documentation standards.
3. **Submit a pull request** that includes a detailed description of your changes and rationale.
4. **Discuss with the team** any major changes or feature proposals before implementation.


## Acknowledgements

We would like to thank the contributors, volunteers, and users who have used and supported the Home Security Project. Special thanks to the ADC Lab team for their continued efforts in advancing security technologies.  
