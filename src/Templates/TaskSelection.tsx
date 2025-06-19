import React, { memo, useRef } from 'react';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Components/Chat';
import { FileUpload } from './FileUpload';
import { consumeContextInterface, taskInterface } from '../interface';
import { withContext } from '../HOC';

/**
 * TaskSelection component is responsible for displaying a typing animation
 * and then rendering the FileUpload component based on the task provided.
 *
 * @param {taskInterface} task - The task to be executed.
 * @returns {JSX.Element} - The rendered component.
 */

const TaskSelectionComponent: React.FC<taskInterface & consumeContextInterface> = memo(({ task, appendChatComponent }) => {

  // console.log('Task Selection')
  // List of messages for each task type.
  const taskSelected = {
    Regression: [
      'Regression is a statistical technique used to model the relationship between one or more independent variables (also called predictors or features) and a dependent variable (also called the target or response). The goal of regression is to predict the dependent variable based on the values of the independent variables.',
      "You've opted for Regression. Regression predicts a continuous outcome variable based on one or more predictor variables. It's widely used in forecasting sales, predicting temperatures, or estimating house prices. Let's see your regression model in action!",
      'Regression task selected. Here, we aim to predict numerical values, such as stock prices or years of life expectancy. This task helps in understanding relationships between variables. Ready to run your regression?',
      "Preparing for Regression: This involves modeling the relationship between variables to predict continuous data points. Applications include predicting future trends in stock markets or estimating pollution levels based on various factors. Let's run the model!",
      "Regression model initiated. We're going to fit a line or curve through data points to predict outcomes like the growth rate of a population or energy consumption. Let's see the predictions!",
      "You're delving into Regression. This method is essential when you need to estimate quantities like the weight of an individual based on height, or the amount of rainfall expected. Let's perform your regression analysis!",
    ],
    Classification: [
      'Classification is a type of supervised machine learning task where the goal is to predict the category or class label of an input based on its features. Unlike regression, which predicts continuous values, classification deals with discrete labels.',
      "You've chosen Classification! Classification is about predicting which class or category an item belongs to. It's used for tasks like spam detection, image recognition, or medical diagnoses where outcomes are categorical (e.g., 'spam' or 'not spam'). Let's run your classification task now!",
      "Classification task selected. Here, we'll determine which group or label best fits new data based on learned patterns. Applications include sentiment analysis, where we classify text as positive or negative, or customer segmentation. Ready to classify?",
      "Preparing for Classification: This involves assigning data to discrete categories. It's crucial in scenarios like fault detection in manufacturing or predicting whether a loan applicant will default. Let's get started on your classification model!",
      "Classification model initiated. We're about to use algorithms to categorize data into predefined classes. This method helps in identifying diseases from symptoms or sorting emails into folders. Let's see what results we get!",
      "You're exploring Classification. This technique is key when you want to distinguish between different types like types of plants from their features or credit card transactions as fraudulent or legitimate. Let's execute your classification analysis!",
    ],
  };
  // Randomly select a message from the list of messages for the selected task.
  // Here useRef is used to persist the selected message across renders.
  // This is important to ensure that the same message is displayed when the component re-renders.
  const msgSelected = useRef(
    Math.floor(Math.random() * taskSelected[task].length)
  );

  return <ConversationTyping
    text={taskSelected[task][msgSelected.current]}
    callback={() =>
      appendChatComponent(
        <Chat gerneratedBy="system">
          <FileUpload />
        </Chat>
      )
    }
  />
});

TaskSelectionComponent.displayName = 'TaskSelectionComponent';

export const TaskSelection = withContext(TaskSelectionComponent, ['appendChatComponent'])
