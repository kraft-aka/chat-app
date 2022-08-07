# React Native Chat App-Chattify

## Description

This app is designed for mobile devices by React Native. The App's interface allowes 
users to chat with each other, share images and locations, take photos.

![](D:\IT\CF\projects_cf\Screenshot_1)

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the cha
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.

## Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## Technologies used
- React.js
- React Native
- Expo
- Firebase Cloud Storage

## Installation

### Install pre-requisites

[Install Expo](https://expo.dev/)

`npm install expo-cli -g`
For Windows and Linux: Install [Android Studio](https://developer.android.com/studio). For more information how to set up an emulator, look [here](https://docs.expo.dev/workflow/android-studio-emulator/?redirected)

For Mac: Install [XCode](https://developer.apple.com/xcode/)

Install the Expo app on your mobile device (available in Google Play Store and Apple Store)

### Dependencies 

- "@react-native-async-storage/async-storage": "~1.17.3",
- "@react-native-community/async-storage": "^1.12.1",
- "@react-native-community/masked-view": "^0.1.11",
- "@react-native-community/netinfo": "8.2.0",
- "@react-navigation/native": "^6.0.11",
- "@react-navigation/stack": "^6.2.2",
- "expo": "~45.0.0",
- "expo-image-picker": "~13.1.1",
- "expo-location": "~14.2.2",
- "expo-permissions": "~13.2.0",
- "expo-status-bar": "~1.3.0",
- "firebase": "^8.8.0",
- "react": "17.0.2",
- "react-dom": "17.0.2",
- "react-native": "0.68.2",
- "react-native-gesture-handler": "~2.2.1",
- "react-native-gifted-chat": "^1.0.4",
- "react-native-maps": "0.30.2",
- "react-native-reanimated": "~2.8.0",
- "react-native-safe-area-context": "4.2.4",
- "react-native-screens": "~3.11.1",
- "react-native-web": "0.17.7",
- "react-navigation": "^4.4.4"

### Install Database

Create Google Firebase/Firestore account for data storage [Firebase documentation](https://firebase.google.com/)

1. Sign into [https://firebase.google.com/](https://firebase.google.com/) to get started

2. Click on "create a project" and follow the steps. Start in test mode then start a collection, ("Auto-ID" to generate a random Document ID).

3. Install Firestore via Firebase: `npm install firebase`

4. Create a new directory "config" and add a new file "firebase.js" to it.

5. Back in the Firebase project in the browser, open up "Settings", then "General" tab. Under the section "Your apps", link Firebase to app by clicking the tag icon.

6. After connecting, it will generate configurations for different platforms. Here, click "Firestore for Web" and then copy the contents of the config object info to config/firebaseConfig.dist.js file. Initialize the App by adding `import firebase from firebase` at the top of the file firebase.js and initialize the app there like so: `const firebaseApp = initializeApp(firebaseConfig)`

7. Change the name in the reference to the Firestore collection in components/chat.js file from currently "messages" to the name choosen for the collection.
