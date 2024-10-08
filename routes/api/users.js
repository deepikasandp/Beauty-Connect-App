const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc  Register User
// @access Public
router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try{
        // set if user exists
        let user = await User.findOne({email});
        if(user){         
            return res.status(400).json({ errors: [{msg:'User already registered'}] });
        }

        // Get users gravatar
        const avator = gravatar.url(email, {
            s: '200', //default size
            r: 'pg',  // rating
            d: 'mm'   // user icon
        });
        // create a new user
        user = new User({
            name,
            email,
            avator,
            password
        });
        // Encrypt by getting  apromise from dcrptyjs with the recommended rounds for security
        const salt = await bcrypt.genSalt(10);
        // hash the password for the plain password
        user.password = await bcrypt.hash(password, salt);
        // save user to the db, and it returns a promise
        await user.save();
        // get the payload
        const payload = {
            user: {
                id: user.id
            }
        };
        //sign the token by passing payload, secret with expiration time and call back to handle token and error
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