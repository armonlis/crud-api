# **crud-api**
There are only sources files in this repository, so firstly you should enter in the console **npm i** or **npm install** to install all dependencies.
## **Develop mode**
To run this application in the develop mode enter in the console **npm start:dev**.\
By this way you will compile TypeScript files in the folder **src/ts** to the JavaScript to the folder **src/js** and run the server.\
The TS compiler will run in the watch mode, also **nodemon** will use.
## **Production mode**
To run this application in the production mode enter in the console **npm start:prod**.\
By this way you will compile TypeScript files in the folder **src/ts** to the JavaScript to the folder **src/js** check them with ESLint and build them 
with Webpack in the folder **dist**. After all the server will launch.\
*In the Windows OS can be shown 2 warnings after ESLint checking.  
## **Multi instances mode**
Firstly you need to compile TS files, for this you can use previuos cases or enter in the console **npm run build**.\
To run this application in the multi instances mode enter in the console **npm start:multi**. 
## **Testing**
Firstly you need to compile TS files, for this you can use one of the above ways.\
To run tests enter in the console **npm run test**.