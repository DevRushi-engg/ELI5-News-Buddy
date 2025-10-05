
import { Article } from '../types';

export const sampleArticles: Article[] = [
  {
    id: 'tech-1',
    title: 'New AI Can Write Code Almost as Well as Humans',
    originalText: 'A groundbreaking artificial intelligence model has been developed by a leading tech firm, capable of generating complex software code from natural language prompts. The model, which has been trained on billions of lines of public code, demonstrates a remarkable ability to understand user intent and produce functional, efficient, and secure code in various programming languages. This development could significantly accelerate software development cycles and lower the barrier to entry for aspiring programmers.',
    simplifiedText: 'Some smart people made a new computer brain! You can tell it what you want a program to do, and it writes the computer instructions for you. It learned by reading lots of computer instructions that people have already written. This could help make new apps and games much faster!',
    imageUrl: 'https://picsum.photos/seed/ai-code/600/400',
    category: 'Technology',
    quiz: [
      {
        question: 'What can the new computer brain do?',
        options: ['Play games', 'Write computer instructions', 'Drive a car', 'Sing a song'],
        correctAnswer: 'Write computer instructions',
      },
      {
        question: 'How did the computer brain learn?',
        options: ['By going to school', 'By watching TV', 'By reading lots of code', 'By playing on the internet'],
        correctAnswer: 'By reading lots of code',
      },
      {
        question: 'What could this new invention help with?',
        options: ['Making food', 'Making new apps and games faster', 'Building houses', 'Cleaning your room'],
        correctAnswer: 'Making new apps and games faster',
      },
    ],
    illustrationPrompt: 'A friendly, smiling robot sitting at a computer, with code bubbles floating around its head. The style is colorful and cartoonish.'
  },
  {
    id: 'science-1',
    title: 'Scientists Discover Water on a Distant Exoplanet',
    originalText: 'Astronomers using the James Webb Space Telescope have confirmed the presence of water vapor in the atmosphere of exoplanet K2-18b. Located 120 light-years from Earth, this "sub-Neptune" exoplanet resides in the habitable zone of its star, meaning conditions could be right for liquid water to exist on its surface. While this discovery does not confirm life, it is a significant step forward in the search for habitable worlds beyond our solar system.',
    simplifiedText: 'Using a super big telescope in space, scientists looked at a planet very far away. They found signs of water in the air around the planet! This planet is in a special "just right" spot where it is not too hot and not too cold. Finding water is exciting because all living things we know need water.',
    imageUrl: 'https://picsum.photos/seed/exoplanet/600/400',
    category: 'Science',
    quiz: [
      {
        question: 'What did scientists find on the faraway planet?',
        options: ['Aliens', 'Chocolate', 'Water', 'A big playground'],
        correctAnswer: 'Water',
      },
      {
        question: 'What is the special spot the planet is in called?',
        options: ['The hot zone', 'The cold zone', 'The "just right" spot', 'The sparkly zone'],
        correctAnswer: 'The "just right" spot',
      },
      {
        question: 'Why is finding water important?',
        options: ['Because we can go swimming', 'Because all living things need it', 'Because it makes the planet look blue', 'Because it is shiny'],
        correctAnswer: 'Because all living things need it',
      },
    ],
    illustrationPrompt: 'A cute, cartoon planet with a smiling face, with little clouds and water droplets floating around it. Stars and a friendly rocket ship are in the background.'
  },
  {
    id: 'health-1',
    title: 'Study Shows Benefits of a Plant-Based Diet for Heart Health',
    originalText: 'A comprehensive meta-analysis published in a leading medical journal has found strong evidence linking plant-based diets to improved cardiovascular health. The study, which reviewed data from dozens of previous trials, concluded that individuals who consume predominantly fruits, vegetables, nuts, and whole grains have significantly lower risks of heart disease, lower blood pressure, and better cholesterol levels compared to those with meat-heavy diets.',
    simplifiedText: 'Doctors have found that eating lots of fruits, veggies, and nuts is super good for your heart! When you eat healthy plants, your heart gets stronger. It helps your body stay healthy and full of energy. It is like giving your heart a big, healthy hug!',
    imageUrl: 'https://picsum.photos/seed/plant-diet/600/400',
    category: 'Health',
    quiz: [
      {
        question: 'What foods are good for your heart?',
        options: ['Candy and cake', 'Fruits and veggies', 'Pizza and burgers', 'Ice cream'],
        correctAnswer: 'Fruits and veggies',
      },
      {
        question: 'What part of your body does eating plants help?',
        options: ['Your hair', 'Your toes', 'Your heart', 'Your nose'],
        correctAnswer: 'Your heart',
      },
      {
        question: 'Eating healthy plants is like giving your heart a...',
        options: ['A high-five', 'A big hug', 'A sleepy yawn', 'A little push'],
        correctAnswer: 'A big hug',
      },
    ],
    illustrationPrompt: 'A happy, cartoon heart character lifting weights made of broccoli and carrots, with a big smile.'
  },
];
