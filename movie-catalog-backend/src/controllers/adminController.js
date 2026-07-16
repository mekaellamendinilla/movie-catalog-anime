const db=require("../config/db");

exports.getProfile=(req,res)=>{

    const sql=`

    SELECT

    id,
    first_name,
    last_name,
    username,
    email,
    profile_image

    FROM users

    WHERE id=?

    `;

    db.query(

        sql,

        [req.user.id],

        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result[0]);

        }

    );

};

exports.updateProfile=(req,res)=>{

    const{

        first_name,
        last_name,
        username

    }=req.body;

    const sql=`

    UPDATE users

    SET

    first_name=?,
    last_name=?,
    username=?

    WHERE id=?

    `;

    db.query(

        sql,

        [

            first_name,
            last_name,
            username,
            req.user.id

        ],

        (err)=>{

            if(err)
                return res.status(500).json(err);

            res.json({

                message:"Profile Updated"

            });

        }

    );

};