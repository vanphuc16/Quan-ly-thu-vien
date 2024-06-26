const connection = require('../connection');

const sendNotification = (description, user_id) => {
    var query = "insert into notification(description, user_id) values(?,?)";
    connection.query(query,[description, user_id],(err,results)=>{
        console.log("Thông báo đã được gửi")
    })
}

module.exports = sendNotification;