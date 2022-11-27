# Yeliecious
## About the project
<table>
<tr>
<td>
Yeliecious is an upcoming WebApp tied to the needs of a friend of mine who's the owner of a small business selling a broad selection of home baked goods. This project solely focus on the backend aspect of the application built with NodeJs and Express and will be used by a separate front-end project.  
For now, it's not possible to contribute to the project since it strictly follows the directions received from my friend but feel free to clone the repository and use it as a template for your own app. Also, if you see any issues, I would appreciate it if you can raise them and let me know.
</td>
</tr>
</table>

## Main Features
* Define Availabilities to take orders
* Create different products and flavours
* Receive / Validate / Cancel orders

These are the key features but in each part there is the possibility to handle all CRUM operations. There also will be in the near future a functionnality dedicated to analytics.


## Usage
> **Note**
> This backend project tries to follow the principles of clean architecture to a very good extent so knowing how dependency injection works will be very helpful to understand the flow of the app and if you don't understand how dependency injection works or even clean architecture don't worry, [here's](https://betterprogramming.pub/clean-node-js-architecture-with-nestjs-and-typescript-34b9398d790f) a very good article that will make everything clear in no time. Assuming you already have [Git](https://git-scm.com), you will also need [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/docs/v4.2/administration/install-community/) installed in your computer.

*Before starting the application, make sure you have your instance of MongoDB already running*

### Steps from the commande line

```bash
# (Optional) Install nodemon which is a module that will automatically restart your applications when you make changes to reflect them 
$ npm install -g nodemon

# Clone this repository
$ git clone https://https://github.com/BabacarMbodj/Yeliecious/

# Go into the repository
$ cd Yeliecious

# Install all dependencies to the project
$ npm install

# Create a .env file at the root of the project and add the information of your instance of MongoDB and also the PORT you want to launch the app to. It's totally up to you but to keeps things simple,  the file for now shoud look like the following:
* MONGO_CRED = mongodb://localhost:27017/yelieciousDB -- 27017 being the default Mongo Port on personal computers
* PORT = 3000

#Start the app
$ nodemon app.js (or node app.js in case you did not install node)
```
