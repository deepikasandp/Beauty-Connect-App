const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'email']);

        if(!profile){
            console.log("No profile found");
            return res.status(400).json({msg: 'There is no profile for this user' });
        }

        return res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get all profile
// @access  Public
router.get('/all', async(req, res) => {
    try{
        // find all profiles and add few details from the 'user' model like name and avator
        const profiles = await Profile.find().populate('user', ['name', 'avator', 'email']);
        
        if (!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }
        return res.json(profiles);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get user profile by user id
// @access  Public
router.get('/user/:user_id', async(req,res) => {
    try{
        // find all profiles and add few details from the 'user' model like name and avator
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'email']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found' });
        }
        return res.json(profile);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
    '/', 
    [
        auth, 
        [
            check('status', 'status is required')
            .not()
            .isEmpty(), 
            check('skills', 'Skills is required')
            .not()
            .isEmpty(),
            check('phone', 'Phone is required')
            .not()
            .isEmpty(), 
        ]
    ], 
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
        }

        const{
            phone,
            company,
            website,
            location,
            bio,
            status,
            skills,
            youtube,
            facebook,
            twitter,
            instagram
        } = req.body;

        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (phone) profileFields.phone = phone;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        // Skills - Spilt into array
        if(skills){
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Social        
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;

        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                // update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }

            // create
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
    '/experience', 
    [
        auth, 
        [
            check('title', 'title is required')
            .not()
            .isEmpty(), 
            check('company', 'company is required')
            .not()
            .isEmpty(), 
        ]
    ],
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
        }
        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        // build experience object
        const experienceFields = {};
        if (title) experienceFields.title = title;
        if (company) experienceFields.company = company;
        if (location) experienceFields.location = location;
        if (from) experienceFields.from = from;
        if (to) experienceFields.to = to;
        if (current) experienceFields.current = current;
        if (description) experienceFields.description = description;

        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                // update
                profile.experience.unshift(experienceFields);
            }

            await profile.save();
            return res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
    '/education', 
    [
        auth, 
        [
            check('school', 'school is required')
            .not()
            .isEmpty(), 
            check('degree', 'degree is required')
            .not()
            .isEmpty(), 
        ]
    ],
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
        }

        const{
            school,
            degree,
            from,
            to,
            current,
            description
        } = req.body;

        // build experience object
        const educationFields = {};
        if (school) educationFields.school = school;
        if (degree) educationFields.degree = degree;
        if (from) educationFields.from = from;
        if (to) educationFields.to = to;
        if (current) educationFields.current = current;
        if (description) educationFields.description = description;

        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                // update
                profile.education.unshift(educationFields);
            }
            
            await profile.save();
            return res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
    '/experience/:exp_id', 
    auth,
    async (req,res)=> {
        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                // Get remove index
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                // Splice out of array
                profile.experience.splice(removeIndex, 1);
            }
            
            await profile.save();
            return res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
    '/education/:edu_id',
    auth, 
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
        }

        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);
            }
            
            await profile.save();
            return res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/', 
    async (req,res)=> {
        try{
            await Profile.findOneAndRemove({ user: req.user.id }).then(() => {
                User.findOneAndRemove({ _id: req.user.id }).then(() =>
                  res.json({ success: true })
                );
              });
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;