const Task = require('../models/task');
const express = require('express');
const router = new express.Router();
const auth = require('../meddleware/auth');


router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find();
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }

    // Task.find().then((task) => {
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }

    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
});

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates.' })
    }

    try {
        const task = await Task.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!task) {
            res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save()
    //     .then(() => res.status(201).send(task).status(201)).catch((error) => res.status(400).send(error));
})


module.exports = router;