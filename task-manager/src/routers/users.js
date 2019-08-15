const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const auth = require('../meddleware/auth');
const multer = require('multer');

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
    // try {
    //     const user = await User.find();
    //     res.send(user)
    // } catch (error) {
    //     res.status(500).send();
    // }

    // User.find().then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // })
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send();
    }
});


// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }

// User.findById(_id).then((user) => {
//     if(!user){
//         return res.status(404).send();
//     }
//     res.send(user);
// }).catch((error) => {
//     console.log(error);
//     res.status(500).send();
// });
// });

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user);
    } catch (error) {
        res.status(500).send()
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        token = await user.genereateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
    // user.save().then(() => res.status(201).send(user)).catch((error) => res.status(400).send(error));
});


const upload = multer({
    dest: 'avatars',
    limits: {
        fieldSize: 100000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please up load PDF Word Document'));
        }
        cb(undefined, true)

        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
});
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genereateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});


module.exports = router;