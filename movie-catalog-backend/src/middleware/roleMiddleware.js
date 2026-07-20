module.exports = (role) => {

    console.log("dadawdd")
    return (req, res, next) => {

        if (req.user.role !== role) {

            return res.status(403).json({

                message: "Access denied."

            });

        }

        next();

    };

};