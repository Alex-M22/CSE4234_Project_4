// Return the session being used
exports.getSession = (req, res) => {
    if (req.session.user){
        res.json(req.session.user);

    } else {
        res.json({
            "noUser": true
        });
    }

}