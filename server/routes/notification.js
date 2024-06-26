const express = require('express');
const connection = require('../connection');
const router = express.Router();
const authenticated = require('../security/authentication');

router.get('/get-notifications/:id',authenticated.authenticated, (req, res)=>{
    const user_id = req.params.id;
    var query = "select description from notification where user_id=? order by notification_id desc";
    connection.query(query,[user_id],(err,results)=>{
        if (!err) {
            return res.status(200).json(results)
        } else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router;