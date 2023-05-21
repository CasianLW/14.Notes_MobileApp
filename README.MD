# Mobile APP : NOTES (API Laravel + Front Ionic / Vue)

![gif](https://media.giphy.com/media/v6RkL37LPep5dA4x6y/giphy.gif)

## Installation

First you will have to setup/install the API, see README of the 'MobileApp_Back_Laravel' folder, then you will install the front side by following the instructions from the README inside 'MobileApp_Front_IonicVue' folder.

## About

The project aims to develop and deploy an HTTP API for managing personal notes, serving as the back-end for a mobile web application. The source code will undergo validation using an automated test suite provided by the instructor to ensure proper functionality and adherence to specifications.

The API is expected to offer the following features: user registration, login, and logout from a client application; retrieval of notes in reverse chronological order with creation and update dates; creation of new notes; updating existing notes; and deletion of any user's notes. Notes will be stored as plain text, allowing line breaks and support for Unicode characters.

Additionally, a notes management application will be created for the front-end. This application will allow users to create, view, edit, and delete notes. User authentication will be implemented through registration, login, and logout forms. The user interface will be designed to accommodate web browser limitations, with adaptive elements based on the user's login status. The application will function as a single-page application, providing a seamless user experience without page reloads.

Vue.js will be used to develop the front-end application, with Vue Router for managing registration and login pages. Vuex will be employed for global data storage, and the browser's LocalStorage will handle local data storage. The application will feature pages for home, registration form, login form, and notes management, effectively implemented using Vue's router.

## Ressources

1. API.pdf & VUE CLIENT.pdf are the instructions of the whole project
2. laravel10-sanctum-auth-main.zip & vue3-token-authentication-main.zip are the base files of the project
3. teach-notes-token-auth-api-tests.main.zip is a folder containing the unit tests for the API (readme inside)
