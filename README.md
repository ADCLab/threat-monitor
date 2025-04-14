# Home Security Project  
*ADC Lab Repository*

## Table of Contents
- [Overview](#overview)
- [Background and Motivation](#background-and-motivation)
- [Repository Structure](#repository-structure)
  - [OpenAI_v2.py](#openai_v2py)
  - [HomeLandSec Module](#homelandsec-module)
  - [Classifier Module](#classifier-module)
- [Architecture and Components](#architecture-and-components)
- [Contribution Guidelines](#contribution-guidelines)
- [Acknowledgements](#acknowledgements)

---

## Overview

The **Home Security Project** is an initiative under ADC Lab that focuses on the collection and detection of dangerous comments. The primary objective of the project is to develop an automated, robust system capable of processing and analyzing large datasets of comments for potential risks. In doing so, the project leverages advanced natural language processing techniques to support both the collection and classification components, ensuring high-quality training data for further model refinement.

This repository integrates components written in multiple programming languages, including Python for backend processing and TypeScript for frontend survey deployment. The project is segmented into several key modules, each designed to tackle a specific facet of the overall system.

---

## Background and Motivation

This project contains the following: 
- **Data Collection**: Efficiently gathering a significant volume of comments (approximately 600,000) that require evaluation.
- **Risk Assessment**: Utilizing natural language processing techniques and models such as [ChatGPT](https://openai.com/research) to rank and assess comments based on predetermined criteria.
- **Survey Deployment**: Implementing a modular TypeScript-based survey application to support the Homeland Security sub-projects, ensuring that data collection methods remain interactive and user-friendly.
- **Model Development**: Experimenting with various classifiers through iterative Jupyter Notebook experiments to optimize detection accuracy on the provided dataset.

The insights derived from this project not only aid in immediate security responses but also contribute to improved training data for potential future deployments in related security domains.

---

## Repository Structure

The repository is divided into multiple directories and key files that serve specific purposes within the project framework. Detailed descriptions of each component are provided below.

### OpenAI_v2.py

- **File Location**: [OpenAI_v2.py](RANKING.md)
- **Description**: This Python script automates the process of iterating through a dataset of approximately 600K comments. The script interfaces with ChatGPT, requesting a ranking based on a predefined criteria for each comment. This ranking system is central to the project's effort to quantify risk or danger associated with textual data.
- **Key Features**:
  - Batch processing of large comment datasets.
  - Integration with ChatGPT for dynamic evaluation.
  - Logging and error handling mechanisms to ensure robust script execution.
  - Exponential delays between requests failed due to rate limits. 

### HomeLandSec Module

- **Directory Location**: [HomeLandSec/](HomeLandSec/README.md)
- **Description**: This module contains a modular TypeScript application that serves as a deployable survey for Homeland Security sub-projects. It is designed with scalability in mind, ensuring that user input and survey responses can be captured reliably in various deployment scenarios.
- **Key Features**:
  - A dynamic, user-friendly survey interface.
  - Modular architecture to allow easy updates and adaptations.
  - Integration with ADC Lab’s broader data collection and security frameworks.
  - Made to be integrated with ADC's project for modular backends.

### Classifier Module

- **Directory Location**: [Classifier/](Classifier/README.md)
- **Description**: This component is a collection of Jupyter Notebooks containing iterations of classifiers that have been trained on the Homeland Security comments dataset. The notebooks chronicle the evolution of the models, documenting parameter adjustments, model performances, and experimental findings.
- **Key Features**:
  - Detailed iterative notebooks showcasing model experimentation.
  - Visualization outputs and performance metrics to evaluate classifier accuracy.
  - Preprocessing and data visualization steps to support reproducibility.

---

## Architecture and Components

The architecture of the Home Security Project is designed to promote modularity and flexibility. Key components include:

1. **Data Ingestion Module**: Responsible for managing the influx of comments and preparing the data for processing.
2. **Evaluation Engine**: Utilizes a combination of heuristics and AI-powered services (i.e., ChatGPT) to rank and categorize comments.
3. **Survey Application**: Provides an interactive user interface (UI) for capturing additional contextual or evaluative data via surveys.
4. **Model Training and Experimentation**: Houses various Jupyter Notebooks used to develop and evaluate classifier models on annotated comments data.

*Further architectural diagrams and details can be added once more specific information is provided regarding the design decisions and data flows within the project.*

---

## Installation and Setup

### Prerequisites

Before setting up the repository locally, ensure that you have the following dependencies installed:

- **Python 3.12: Required for running the backend scripts and Jupyter Notebooks.
- **Node.js and npm**: Required for running the TypeScript-based HomeLandSec application.
- **Jupyter Notebook or JupyterLab**: Recommended for exploring and running the Classifier notebooks.

---

## Contribution Guidelines

Contributions are welcome. If you wish to contribute to the project, please follow these guidelines:

1. **Fork the repository** and create your feature branch.
2. **Ensure your code adheres to** the existing style and documentation standards.
3. **Submit a pull request** that includes a detailed description of your changes and rationale.
4. **Discuss with the team** any major changes or feature proposals before implementation.

---

## Acknowledgements

We would like to thank the contributors, volunteers, and users who have used and supported the Home Security Project. Special thanks to the ADC Lab team for their continued efforts in advancing security technologies.  
