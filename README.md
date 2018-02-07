# Description

Repository dedicated to practice API development skills based on a <https://lynda.com> tutorial taught by Scott Moss.

## Breakdown

- **Node.js** (JavaScript) was the selected framework used to design, build, and test this RESTful API
  - Main JavaScript libraries used for the completion of the project
    - express
    - body-parser
    - mongoose
    - jsonwebtoken

- **MongoDB** was the selected non-relational data base used to store the data
  - **Data Modeling** and **Querying** was achieved through the use of `mongoose` which helped to design the desired schema on top of mongo

- **JSON Web Token** or JWT was the selected third-party framework used to authenticate requests
  - This allowed to secure all the sensitive routes and provide an extra layer of security

- **Deployment** of this RESTful API is to be done through `heroku`

## Routes

### Users

1. `localhost:3000/api/users`

- **Requests**
    - GET
    - POST
        - Data Schema

        ```javascript
        {
            username: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
        }
        ```
2. `localhost:3000/api/users/:id`
        
- **Requests**
    - GET
    - PUT
    - DELETE
    
### Posts

1. `localhost:3000/api/posts`

- **Requests**
    - GET
    - POST
        - Data Schema

        ```javascript
        {
            title: {
                type: String,
                required: true,
                unique: true,
            },
            text: {
                type: String,
                required: true,
            },
            author: { type: Schema.Types.ObjectId, ref: 'user' },
            categories: [{
                type: Schema.Types.ObjectId,
                ref: 'category'
                }],
        }
        ```
        
2. `localhost:3000/api/users/:id`

- **Requests**
    - GET
    - PUT
    - DELETE
    
### Categories
    
1. `localhost:3000/api/categories`
    
    - **Requests**
        - GET
        - POST
            - Data Schema
    
            ```javascript
            {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
            }
            ```
2. `localhost:3000/api/categories/:id`
    
- **Requests**
    - GET
    - PUT
    - DELETE
    
### Authoritation

1. `localhost:3000/auth/signin`

- **Requests**
    - GET
    - POST
    - Data Schema

        ```javascript
        {
            username: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
        }
        ```

## Additional Info

This API and all the code included in this repository are for learning purposes. Additional improvements are to be made (modifications for deployment)

It is assumed **you have already installed** the following on your computer:

- Node.js (most updated version)
- npm
- mongoDB
