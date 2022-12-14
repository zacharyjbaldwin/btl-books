# Between The Lines API

Before this will work, you must have `keys.json` in the project folder, which is not published to GitHub. You can find this file in the `#team-notes` channel on Discord.

# Local devlopment
1. Clone this repo using Git
2. Navigate to this project directory in a terminal window
3. Type `npm install` and wait until the dependencies are installed
4. Type `npm test` to spin up a local development server at `localhost:3000`

## Adding a route
1. In the `routes` folder, see if there already exists a file which may include the functionality you want to add. (e.g., if you plan to add a route that adds something to a user's cart, check and see if there is already a file called `cart.routes.js`). If there isn't a file that encompasses what you want to create, add it. Please name it so that its functionality is obvious based on its name. If your routes file already exists, skip to step 3.

2. Inside the `<name>.routes.js` file you've just created, add these lines:

```javascript
// Beginning of the file - this imports the Express Router in this file
const router = require('express').Router();

// This middle section is where you will add your own routes.

// End of the file - this exports the Express Router so that it can be referenced in other files. This line MUST be at the end of the file
module.exports = router;
```

3. Add a route by adding the following lines to the routes file:

```javascript
router.get('/url', (req, res) => {
    // function logic goes here
});
```

The router class has many methods, including `router.get`, `router.post`, `router.put`, and `router.delete`. Choose yours according to the [RESTful operation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) you want to perform. 

`req` represents the request that reaches this route. It includes information such as the [request headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header), [request body](https://developer.mozilla.org/en-US/docs/Web/API/Request/body), and request query parameters.

`res` represents the response to the request. This is what is returned to the user or client that makes the request. The response includes information such as the status code and any other information you want to send to the user/client (in the form of JSON).

For example, a route which sends this JSON back to the user/client is provided in the `example.routes.js` file. 
```json
{
    "message": "Hello world!"
}
```
The actual body of this route function can be found in `example.controller.js`. Creating both a route and a controller for a particular function allows us to logically seperate the different parts of code, and provides a well-structured, scalable, codebase.