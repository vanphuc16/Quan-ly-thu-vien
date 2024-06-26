const express = require('express');
const connection = require('../connection');
const router = express.Router();
const authenticated = require('../security/authentication');
const admin = require('../security/admin');
const sendNotification = require('../services/notificationService');

router.post('/add-review', authenticated.authenticated, (req, res)=>{
    const review = req.body;
    var query = "insert into review(description, user_id) values(?,?)";
    connection.query(query,[review.description, review.user_id],(err, results)=>{
        if(!err) {
            return res.status(200).json("Thêm đánh giá thành công")
        } else {
            return res.status(500).json(err)
        }
    })
})

router.get('/get-reviews', authenticated.authenticated, (req, res)=>{
    var query = "select u.name, r.description from user u inner join review r on u.user_id=r.user_id order by r.review_id desc";
    connection.query(query,(err, results)=>{
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err)
        }
    })
})

router.get('/get-reviews/:id', authenticated.authenticated, (req, res)=>{
    const user_id = req.params.id;
    var query = "select u.name, r.description, r.review_id from user u inner join review r on u.user_id=r.user_id where u.user_id=? order by r.review_id desc";
    connection.query(query,[user_id],(err, results)=>{
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err)
        }
    })
})

router.delete('/delete-review/:id', authenticated.authenticated, (req, res)=>{
    const review_id = req.params.id;
    var query = "delete from review where review_id=?";
    connection.query(query,[review_id],(err, results)=>{
        if (!err) {
            return res.status(200).json("Xóa đánh giá thành công")
        } else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router;