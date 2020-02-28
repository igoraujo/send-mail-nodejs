const express = require('express');
const routes = require('./routes');

const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());
// app.use(routes);

const config = {
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'password'
    }
}

var transporter = nodemailer.createTransport(config);

app.post('/send', (req, res) => {
    
    const mailOptions = {
        from: 'igoraujo93@gmail.com', // sender address
        to: 'igoraujo93@gmail.com', // list of receivers
        subject: 'Teste de email', // Subject line
        html: '<p>Teste do corpo do email</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
            console.log(error);
            return res.status(error.responseCode).send({
                error: {
                    code: error.responseCode,
                    message: error.response
                  }
            });
        }
    
        // let id = info.messageId.substring(1, 37);

        return res.status(200).send({ 
            // messageId: id,
            status: {
                success: true,
                code: 200,
                message: "E-mail enviado com sucesso!"       
            }
        }); 
    });
});

app.listen(3333);
