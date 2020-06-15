const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const authConfig = require('../_config/auth.json');
const authMiddleware = require('../_middlewares/auth');

const router = express.Router();


// My "database"
let users = [];


// Get all users
router.get('/', (request, response) => {

    // Verify if there are registered users
    if (users.length > 0) {
        return response.status(200).json({ msg: "Users retrieved", users });
    }

    return response.status(404).json({ msg: "There are no users registered yet" });
});


// Get only one user by his ID
router.get('/:id', authMiddleware, (request, response) => {

    // Verify if ID passed at get params equals the ID passed to middleware
    if (testParamsIdToMiddlewareId(request.params.id, request.userId)) {
        return response.status(400).json({ msg: "Param ID doesn't equals Token ID" });
    }

    // Verify if user exists
    if (users.some(user => user.id === request.params.id)) {
        
        // Get's user information if found
        const user = users.find(user => user.id === request.params.id);

        return response.status(200).json({ msg: "User found", user });
    }

    return response.status(404).json({ msg: "User not found" });
});


// Inserting new user to "database"
router.post('/', (request, response) => {

    // Separate email and password from json body of REQUEST
    const { email, password } = request.body;

    // Verify if email AND password was passed inside the body
    if (email && password) {

        // Verify if there are no user with the email received
        if (!users.some(user => user.email === email)) {

            // Generate an ID for the user
            const id = uuid.v4();

            // Create user object
            const user = { id, email, password }

            // Insert user inside array
            users.push(user)

            return response.status(201).json({ msg: "User registered successfully", user });
        }
        
        return response.status(409).json({ msg: "Email already in use", email });
    }

    return response.status(400).json({ msg: "Missing data: 'email' and 'password' must be informed" });
});


// Updating email of user
router.put('/email/:id', authMiddleware, (request, response) => {

    // Verify if ID passed at put params equals the ID passed to middleware
    if (testParamsIdToMiddlewareId(request.params.id, request.userId)) {
        return response.status(400).json({ msg: "Param ID doesn't equals Token ID" });
    }

    // Verify if email is present in request body
    if (request.body.email) {

        // Verify if user exists
        if (users.some(user => user.id === request.params.id)) {

            // Verify if new email is not already in use
            if (!users.some(user => user.email === request.body.email)) {

                // Changing email of user
                users.forEach(user => {
                    if (user.id === request.params.id) {
                        user.email = request.body.email;
                    }
                });

                return response.status(200).json({ msg: "Email changed successfully" });
            }

            return response.status(409).json({ msg: "New email already in use" });
        }

        return response.status(404).json({ msg: "User not found" });
    }

    return response.status(400).json({ msg: "Missing data. Email must be informed" });
});


// Updating user password
router.put('/password/:id', authMiddleware, (request, response) => {

    // Verify if ID passed at put params equals the ID passed to middleware
    if (testParamsIdToMiddlewareId(request.params.id, request.userId)) {
        return response.status(400).json({ msg: "Param ID doesn't equals Token ID" });
    }

    // Verify if new password is present in body request
    if (request.body.password) {

        // Verify if user exists
        if (users.some(user => user.id === request.params.id)) {

            // Changing user password
            users.forEach(user => {
                if (user.id === request.params.id) {
                    user.password = request.body.password;
                }
            });

            return response.status(200).json({ msg: "Password changed successfully" });
        }

        return response.status(404).json({ msg: "User not found" });
    }

    return response.status(400).json({ msg: "Missing data. Password must be informed" });
});


// Deleting an user
router.delete('/:id', authMiddleware, (request, response) => {

    // Verify if ID passed at delete params equals the ID passed to middleware
    if (testParamsIdToMiddlewareId(request.params.id, request.userId)) {
        return response.status(400).json({ msg: "Param ID doesn't equals Token ID" });
    }

    // Verify if user exists
    if (!(users.some(user => user.id === request.params.id))) {
        return response.status(404).json({ msg: "User not found" });
    }

    // Deleting user
    users = users.filter(user => user.id !== request.params.id);
    
    return response.status(200).json({ msg: "User deleted successfully" });
});


// Authenticating user
router.post('/authenticate', (request, response) => {
    
    // Separate email and password
    const { email, password } = request.body;

    // Verify if user exists
    if (users.some(user => user.email === email)) {

        // Verify if user informed the correct password
        if (users.some(user => user.email === email && user.password === password)) {
            const user = users.find(user => user.email === email && user.password === password);

            // Generating token for authenticated user
            const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });

            return response.status(200).json({ msg: "User logged in", userEmail: user.email, token })
        }

        return response.status(400).json({ msg: "Invalid password" });
    }

    return response.status(404).json({ msg: "User not found" });
});


// Function to verify request params.id to middleware userId
function testParamsIdToMiddlewareId(paramsId, middlewareId) {
    return paramsId !== middlewareId;
}


module.exports = router;