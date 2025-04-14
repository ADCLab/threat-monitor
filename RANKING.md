# OpenAI_v2.py Script

The **OpenAI_v2.py** script is designed for large-scale data collection by submitting comments and evaluation criteria to ChatGPT. The script returns an integer ranking for each comment, facilitating the automated detection of dangerous or high-risk content. It incorporates robust error handling, rate limit management, and asynchronous operations to ensure smooth and reliable execution.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Additional Information](#additional-information)
- [License](#license)

---

## Overview

The **OpenAI_v2.py** script is a key component for projects focusing on threat detection and data analysis. By processing and ranking a large volume of comments based on a specified criterion, this tool aids in building training datasets that help detect dangerous language or content. The script interacts with ChatGPT to perform its analysis, ensuring a high level of accuracy and adaptability to various criteria.

---

## Features

- **Automated Processing**: Upload comments and receive integer rankings based on the provided evaluation criteria.
- **Asynchronous Operations**: Efficient handling of multiple requests concurrently to support large-scale data submissions.
- **Error Handling**: Built-in mechanisms to manage exceptions and ensure the script continues running even when issues arise.
- **Rate Limit Management**: Proactive rate limit handling to avoid API throttling and ensure consistent performance.

---

## Installation and Setup

Follow these steps to set up and run the script:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ADCLab/threat-monitor.git
   cd threat-monitor
   ```

2. **Install Dependencies**

   Ensure you have [Python 3.12](https://www.python.org/) installed. Then, install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. **Create a .env File**

   In the root directory of the project, create a `.env` file containing the following environment variables:

   ```ini
   OPENAI_API_KEY=<your_openai_api_key>
   OPENAI_AZURE_ENDPOINT=<your_openai_azure_endpoint>
   ```

   Replace `<your_openai_api_key>` and `<your_openai_azure_endpoint>` with your actual credentials.

---

## Usage

To execute the script, simply run:

```bash
python OpenAI_v2.py
```

The script will process the uploaded comments using ChatGPT, applying the ranking criteria, and return an integer rating for each comment. Monitor the console output for any error messages or rate limit warnings.

---

## Configuration

- **Error Handling**: The script includes multiple safeguards to capture and log errors during execution. This helps in troubleshooting and ensuring that the script can recover from unexpected issues.
- **Rate Limit Management**: To avoid reaching API usage limits, the script implements pause and retry mechanisms. Adjust these parameters in the source code if you encounter frequent rate limiting.
- **Asynchronous Operations**: By leveraging asynchronous programming techniques, the script is optimized for handling large datasets without significant performance degradation.

---

## Additional Information

For further details or custom configurations, please consider the following:

- **Customization of Ranking Criteria**: If you have specific criteria for ranking comments, update the script accordingly. Detailed documentation on how to modify the ranking logic will be provided upon request.
- **Logging and Debugging**: Additional logging features can be enabled for deeper insights during execution. Contact the maintainers for more information on advanced debugging practices.
- **API Documentation**: Refer to the [OpenAI API Documentation](https://platform.openai.com/docs) for more details on the endpoints used and quota management strategies.
