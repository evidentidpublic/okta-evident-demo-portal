# Okta - Evident Demo Portal 
This repo and web application is used to help demo the Okta Evident integration.
It is designed to show what Evident can look like in an "inline, redirect flow", as opposed to being triggered
with an email to the DS. 

There are API connections being made to both Okta and Evident sandbox environments.

To demo a full runthrough of Okta and Evident with an identity verification, go to "localhost:3000/signup" once started

## To Use:
1.) Clone repo to your local machine, and navigate there
2.) Update all the values in "/src/pages/Config.js" to values obtained from Okta and Evident
3.) Ensure node is installed on your machine. If not, you can find more information here: https://nodejs.org/en/download/

4.) Start up app
    From root directory, run the following commands:
    1.) "npm install"
    2.) "npm start"

Then, open your browser to "localhost:3000/signup" and fill out the form!

## Leagcy reference
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
