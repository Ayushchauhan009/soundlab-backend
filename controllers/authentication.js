const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {
    const {username, email, password} = req.body;
    try{
        let user = await User.findOne({email});

        if(user){
           return res.status(200).json({message: "User already exists"});
        }

        user = new User({username, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {user: {id: user.id}};
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5D'}, (err, token) => {
            if(err) throw err;
            res.json({token});
        })
    } 

    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
}


exports.login = async (req, res) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Password invalid"});
        }

        const payload = {user: {id:user.id}};
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
    }

    catch(err){
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
   
}



