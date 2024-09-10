const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult} = require('express-validator');
const config = require('config');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register Authentication
// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Authentication
// @route POST api/auth
// @desc  Authenticate user & get token
// @access Public

router.post('/', 
[    
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password id required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        // check if user exists
        let user = await User.findOne({email});
        if(!user){         
            return res.status(400).json({ errors: [{msg:'Invalid Credentials'}] });
        }
        // compare the entered plain text password (req.body) from UI with the encrypted password returned from the database in user
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ errors: [{msg:'Invalid Credentials'}] });
        }

        // get the payload
        const payload = {
            user: {
                id: user.id
            }
        };
        //sign the token by passing payload, secret with expiration time and call back to send the token back to the route
        jwt.sign(payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
            );
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;