const Task = require('../models/task');
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');


router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const task = await Task.find();
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }

    // Task.find().then((task) => {
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);

        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        console.log(error);
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates.' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        // const task = await Task.findById(req.params.id);

        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id });
        if (!task.owner.equals(req.user._id)) {
            return res.status(404).send();
        }
        await Task.findByIdAndDelete(_id);
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