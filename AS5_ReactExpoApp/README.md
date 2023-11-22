# This Project will only works when using api from AS3_TODOAPI

This project use REACT-NATIVE + expo + native base 

Mostly work when using IOS 

## To use this project
1. Download zip this project/folder
2. install yarn to your machine, (Assume you have npm) run `npm install -g yarn`
3. navigate to `native` in terminal and run `yarn install` to install dependencies
4. run `yarn start` to start an expo app 



If you have problem where the program freeze on the splash screen 
  1. In `native/App.js` comment everything about fonts i.e., display only in import part and return path also remove `onLayout={...}` in return 
  2. Refresh the app
  3. When app can run normally; simply uncomment to load the fonts
This is due to react native development server 

