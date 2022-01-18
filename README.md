# Project Title

A brief description of what this project does and who it's for

# blue Chat
 A Real Time Chat Application built using Node.js, Express, Mongoose, Socket.io, Passport

## Index
+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)
+ [Screenshots](#screenshots)
## Demo<a name="demo"></a>
Check Demo (coming Soon 🎈)

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Manages Sessions using [express-session](https://github.com/expressjs/session) package.
+ Authenticates via Gooogle using [Passport](https://github.com/jaredhanson/passport).
+ Real-time communication between a client and a server using [Socket.io](https://github.com/socketio/socket.io).
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) and [MongoLab(mLab)](https://mlab.com/) for storing and querying data.
+ Stores session in a [MongoDB](https://github.com/mongodb/mongo) using [connect-mongo](https://github.com/kcbanner/connect-mongo); a MongoDB-based session store.

## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/sajjadmrx/blueChat.git
	$ cd blueChat
	```
2. Install Dependencies

	```
	$ npm install
	```

3. configure .env file
    ```
        MONGODB_URI = mongodb://localhost:27017/blueChat
        GOOGLE_CLIENT_ID = 1111111-xxxxxxxxxxxx.apps.googleusercontent.com
        GOOGLE_CLIENT_SECRET = xxxxxxxxxxxxxxxxx
        GOOGLE_CALLBACK_URL = http://localhost:4000/auth/callbacks/google
    ```
3. Start the application

	```
	$ npm start
	```
Your app should now be running on [localhost:4000](http://localhost:4000/).


# Screenshots<a name="screenshots"></a>
### login wiht Google
![Auth](https://i.imgur.com/SOjU17F.png)

### chat
![1](https://i.imgur.com/fBihLCY.png)
![2](https://i.imgur.com/bkZBIwP.png)