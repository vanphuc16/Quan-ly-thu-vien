const express = require('express');
const connection = require('../connection');
const router = express.Router();
const authenticated = require('../security/authentication');
const admin = require('../security/admin');
const sendNotification = require('../services/notificationService');

router.post('/add-book', authenticated.authenticated, admin.checkAdmin,(req,res)=>{
    const book = req.body;
    var query = "insert into book(title,isbn,author,publisher,description,year,pdf_link,image_link,genre,admin_user_id) values(?,?,?,?,?,?,?,?,?,?)"
    connection.query(query,[book.title, book.isbn, book.author, book.publisher, book.description, book.year, book.pdf, book.image, book.genre, book.user_id],(err, results)=>{
        if(!err) {
            sendNotification("Bạn đã thêm 1 sách mới.", book.user_id);
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get-books', authenticated.authenticated, (req, res) => {
    const search = req.query.search;
    const value = search;
    var query = `select * from book where title like '%${value}%' or author like '%${value}%' or publisher like '%${value}%' or year like '%${value}%' or description like '%${value}%' or genre like '%${value}%'`;
    connection.query(query,(err,results)=> {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get-book/:id', authenticated.authenticated, (req,res)=>{
    const id = req.params.id;
    var query = "select * from book where book_id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update-book', authenticated.authenticated, admin.checkAdmin, (req,res)=>{
    const book = req.body;
    var query = "update book set title=?, isbn=?, author=?, publisher=?, description=?, year=?, pdf_link=?, image_link=?, genre=? where book_id=?"
    connection.query(query,[book.title, book.isbn, book.author, book.publisher, book.description, book.year, book.pdf, book.image, book.genre, book.id],(err, results)=>{
        if(!err) {
            sendNotification("Bạn đã cập nhật 1 cuốn sách", book.user_id);
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete-book/:id', authenticated.authenticated, admin.checkAdmin, (req,res) => {
    const id = req.params.id;
    var query = "delete from book where book_id=?";
    connection.query(query,[id],(err,results) => {
        if(!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/add-online-read', authenticated.authenticated, (req,res)=>{
    const info = req.body;
    var query = "select * from online_read where user_id=? and book_id=?";
    connection.query(query,[info.user_id, info.book_id],(err,results)=>{
        if (!err) {
            if (results.length > 0) {
                return res.sendStatus(200);
            } else {
                query = "insert into online_read(user_id, book_id) values(?,?)";
                connection.query(query,[info.user_id, info.book_id],(err,results)=>{
                    if (!err) {
                        query = "select b.genre as preference from book b inner join online_read r on b.book_id=r.book_id where r.user_id=? group by b.genre having count(*) > 4";
                        connection.query(query,[info.user_id],(error, rows)=>{
                            if(!error) {
                                if (rows.length > 0) {
                                    query = "select * from preference where user_id=? and preference=?";
                                    connection.query(query,[info.user_id, rows[0].preference],(err, datas)=>{
                                        if(!err) {
                                            if (datas.length > 0) {
                                                return res.sendStatus(200);
                                            } else {
                                                query = "insert into preference(user_id,preference) values(?,?)";
                                                connection.query(query,[info.user_id, rows[0].preference],(error, results)=>{
                                                    if(!error) {
                                                        sendNotification("Bạn đã thêm một cuốn sách mới vào giá sách của bạn", info.user_id);
                                                        return res.sendStatus(200);
                                                    } else {
                                                        return res.status(500).json(err);
                                                    }
                                                })
                                            }
                                        } else {
                                            return res.status(500).json(err);
                                        }
                                    })
                                } else {
                                    sendNotification("Bạn đã thêm một cuốn sách mới vào giá sách của bạn", info.user_id);
                                    return res.sendStatus(200);
                                }
                            } else {
                                return res.status(500).json(error);
                            }
                        })
                    } else {
                        return res.status(500).json(err);
                    }
                })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get("/get-online-read/:id", authenticated.authenticated, (req, res)=>{
    const id = req.params.id;
    var query = "select * from book b inner join online_read r on b.book_id=r.book_id where r.user_id=?";
    connection.query(query,[id],(err, results)=>{
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete("/delete-online-read/:user_id/:book_id", authenticated.authenticated, (req, res)=>{
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;
    var query = "delete from online_read where user_id=? and book_id=?";
    connection.query(query,[user_id, book_id],(err, results)=>{
        if (!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post("/add-offline-read", authenticated.authenticated, (req, res)=>{
    const info = req.body;
    var query = "select * from offline_read where user_id=? and book_id=? and isBorrowed=false";
    connection.query(query,[info.user_id, info.book_id],(err,results)=>{
        if(!err) {
            if(results.length > 0) {
                return res.sendStatus(200);
            } else {
                query = "insert into offline_read(user_id,book_id,start_date,isBorrowed) values(?,?,?,false)";
                connection.query(query,[info.user_id,info.book_id,info.start_date],(err,results)=>{
                    if (!err) {
                        sendNotification("Yêu cầu mượn sách đã được gửi. Vui lòng chờ phản hồi.", info.user_id);
                        return res.sendStatus(200);
                    } else {
                        return res.status(500).json(err);
                    }
                })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get("/get-offline-read", authenticated.authenticated, admin.checkAdmin, (req,res)=>{
    var query = "select u.user_id as user_id, u.name as name, u.email as email, b.book_id as book_id, b.title as title, r.start_date as start_date from user u inner join offline_read r on u.user_id=r.user_id inner join book b on r.book_id=b.book_id where r.isBorrowed=false";
    connection.query(query,(err,results)=>{
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch("/update-offline-read", authenticated.authenticated, admin.checkAdmin, (req, res)=>{
    const info = req.body;
    var query = "update offline_read set end_date=?, isBorrowed=true where user_id=? and book_id=?";
    connection.query(query,[info.end_date,info.user_id,info.book_id],(err,results)=>{
        if(!err) {
            sendNotification(`Yêu cầu mượn sách của bạn đã được chấp nhận. Hãy mang trả sách vào ngày ${info.end_date}`, info.user_id);
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete("/delete-offline-read/:user_id/:book_id/:title", authenticated.authenticated, admin.checkAdmin, (req, res)=>{
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;
    const title = req.params.title;
    var query = "delete from offline_read where user_id=? and book_id=? and isBorrowed=false";
    connection.query(query,[user_id,book_id],(err,results)=>{
        if(!err) {
            sendNotification(`Cuốn sách ${title} hiện tại không có sẵn. Vui lòng thử lại sau.`, user_id);
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;