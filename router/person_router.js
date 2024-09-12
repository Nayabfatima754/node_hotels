const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// Route to get user profile (requires authentication)
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user; // Ensure jwtAuthMiddleware is adding req.user
        if (!userData) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        console.log('userData:', userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal server error" });
    }
});

// Route to create a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log('Data saved');
        const payload = {
            id: response.id,
            username: response.username
        };
        const token = generateToken(payload);
        console.log('Token generated:', token);
        return res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.error('Error saving data:', err);
        return res.status(500).json({ err: "Internal server error" });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(payload);
        console.log('User logged in, token generated:', token);
        return res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ err: 'Internal server error' });
    }
});

// Route to fetch all persons (requires authentication)
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched successfully');
        return res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ err: "Internal server error" });
    }
});

// Route to fetch persons by work type
router.get('/:work', async (req, res) => {
    const worktype = req.params.work;
    try {
        if (['chef', 'waiter', 'manager'].includes(worktype)) {
            const response = await Person.find({ work: worktype });
            console.log('Response fetched for work type:', worktype);
            return res.status(200).json(response);
        } else {
            return res.status(404).json({ err: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching data by work type:', err);
        return res.status(500).json({ err: "Internal server error" });
    }
});

// Route to update a person by ID (requires authentication)
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }
        console.log('Data updated for person ID:', personId);
        return res.status(200).json(response);
    } catch (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ err: "Internal server error" });
    }
});

// Route to delete a person by ID (requires authentication)
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }
        console.log('Data deleted for person ID:', personId);
        return res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ err: "Internal server error" });
    }
});



module.exports = router;
