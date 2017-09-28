const config = require("../config/config");
const NodeMailer = require('nodemailer');
var SMTPTransport = require('nodemailer-smtp-transport');

module.exports = {
	sendCustomMail(options){
        const transport = NodeMailer.createTransport((SMTPTransport({
            host: "smtp.gmail.com",
            secureConnection: true,
            service:'Gmail',
            port: 465,
            auth: {
                    user: '',
                    pass: ''
                }
            })
        ));
        const mailOptions = {  
            from    : '',
            to      : options.reciever,
            subject : options.subject,
            html    : options.html
        };

        transport.sendMail(mailOptions,(error, response) =>{  
            if (error) {
                console.log("Email Error:"+error);
            } else{
                console.log('Message sent: ' + JSON.stringify(response));
            }
        });
    },
    generateSequelizeModelName(tableName){
        tableName = (tableName || "").toLowerCase().replace(/_/g," ") + " model";
        return tableName.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0){
                return "";
            }
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    },
    taskRunner(taskDef){
        const iterator = taskDef();
        let result;
        
        const iterate = (data) => {
            result = iterator.next(data);
            const done = result.done;
            const value = result.value;
            if(!done){
                
                if(typeof value === 'function'){
                    value((err,data) => {
                        if(err){
                            result = iterator.throw(err);
                            return;
                        }
                        iterate(data);
                    });
                }else if(typeof value === "object" && "then" in value){
                    value.then(iterate).catch( err => result = iterator.throw(err) );
                }else{
                    iterate(value);
                }
            }
        };
        iterate();
    }
};