const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('success fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.get('/:work', async (req, res) => {
    const worktype = req.params.work;
    try {
        if (worktype === 'chef' || worktype === 'waiter' || worktype === 'manager') {
            const response = await Person.find({ work: worktype });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ err: 'invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.put('/:id', async (req, res) => {  // Corrected route path
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,  // Corrected 'runValidator' to 'runValidators'
        });

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }
        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.delete('/:id', async (req, res) => {  // Corrected route path
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }
        console.log('Data deleted');
        res.status(200).json({message:'person deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

module.exports = router;
