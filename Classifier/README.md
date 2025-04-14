# Classifier Module for Dangerous Comments Detection

This directory contains various approaches for building a classifier that detects dangerous comments. A comment is classified as dangerous if its rating is 3, 4, or 5—these constitute a small minority of the total dataset—or if it is marked as N/A, which indicates that the comment triggered ChatGPT's content filter.



## Table of Contents

- [Overview](#overview)
- [Data Description](#data-description)
- [Main Classifier: classifier_GPU](#main-classifier-classifier_gpu)
- [Model Architecture and Training](#model-architecture-and-training)
- [Evaluation Metrics](#evaluation-metrics)
- [Hyperparameter Tuning](#hyperparameter-tuning)
- [Usage Instructions](#usage-instructions)
- [Additional Information](#additional-information)


## Overview

The classifier approaches in this directory aim to detect dangerous comments within a dataset of 600,000 entries. The focus is on identifying dangerous ratings (3, 4, or 5) and capturing comments flagged by ChatGPT's content filter. These classifications help in building robust training datasets for further development and analysis of text-based safety measures.


## Data Description

- **Dataset**: The dataset contains 600K comments along with their ranking, ID, and sometimes an error message if the comment triggered the content filter.
- **Format**: The data is broken into six CSV files, each containing approximately 100K entries.
- **Content Details**: Besides textual reviews, the dataset includes numerical ratings which are used to determine whether a comment is considered dangerous.

Additional details about the dataset can be found in the [dataset directory](./dataset).


## Main Classifier: classifier_GPU

The primary classifier in this module is **classifier_GPU**. Its main functions include:

- **Data Loading and Aggregation**: Aggregates CSV data containing text reviews and their corresponding ratings.
- **Preprocessing**: Normalizes textual data and maps numerical ratings into binary labels.
- **Tokenization**: Uses the DistilBERT tokenizer to convert the text data into a format that is suitable for transformer-based models.
- **Model Setup**: Implements a binary text classifier based on the pre-trained ["distilbert-base-uncased"](https://huggingface.co/distilbert-base-uncased) model.
- **Addressing Class Imbalance**: Utilizes a custom weighted loss function to counter the imbalance between dangerous and non-dangerous comment classes.


## Model Architecture and Training

- **Text Tokenization**: The text is tokenized using the DistilBERT tokenizer, ensuring compatibility with transformer models.
- **Binary Classification**: The classifier is specifically designed to output binary predictions (dangerous vs. non-dangerous).
- **Custom Weighted Loss Function**: This function adjusts for the class imbalance issue inherent in the dataset, giving more weight to the less frequent dangerous comment class.
- **Fine-Tuning**: The model is fine-tuned using the processed dataset to optimize its performance on the classification task.


## Evaluation Metrics

To assess the performance of the classifier, the following metrics are employed:

- **Accuracy**
- **Precision**
- **Recall**
- **F1 Score**

The evaluation process is integral to understanding the strengths and weaknesses of the classifier, ensuring that the model generalizes well to unseen data.


## Hyperparameter Tuning

For efficient optimization of the classifier, [Optuna](https://optuna.org/) is utilized:

- **Optuna Framework**: Helps in automating the hyperparameter search process.
- **Objective**: Optimize model parameters to achieve better performance according to the evaluation metrics.
- **Process**: Iterative trials adjust key hyperparameters, including learning rate, batch size, and custom loss weights.


## Usage Instructions

1. **Data Preparation**: Ensure that the CSV files containing the dataset are present in the appropriate directory.
2. **Environment Setup**:  
   - Install necessary dependencies using your package manager.  
   - For Python dependencies, run:
     ```bash
     pip install -r requirements.txt
     ```
3. **Running the Classifier**:  
   Execute the main classifier script using:
   ```bash
   jupyter notebook classifier_GPU.ipynb
   ```
4. **Monitoring Training and Evaluation**:  
   The script will log training progress and evaluation metrics. Adjust hyperparameters as needed using the configuration settings or through Optuna's interface.


## Additional Information

For further customization or inquiries:

- **Preprocessing Details**: Contact the development team if you require a deeper understanding of the text normalization or tokenization procedures.
- **Model Fine-Tuning**: Specifics of fine-tuning parameters and loss function adjustments can be discussed for research purposes.
- **Dataset Clarifications**: Any issues regarding dataset integrity or format should be reported promptly.

Your feedback is invaluable in refining the classifier and ensuring the robustness of dangerous comment detection.

