var nodemailer = require('nodemailer');

module.exports = function(credentials){

    var mailTransport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user : credentials.gmail.user,
            pass: credentials.gmail.password,
        }
    });

    var from = '"Medowlark Travel" <info@meadowlarktravel.com>';
    var errorRecepient = 'mehtaabhinav567@gmail.com';

    return {

        send: function(to,subj,body){
            mailTransport.sendMail({
                from:from,
                to:to,
                subject:subj,
                html:body,
                generateTextFromHtml : true
            },function(err){
                if(err)
                { console.log(" Unable to send email: " + err );
            }else {
                console.log('Email sent : ' + info.response);
            }
            });
        },

        emailError: function(message, filename, exception){
			var body = '<h1>Meadowlark Travel Site Error</h1>' +
				'message:<br><pre>' + message + '</pre><br>';
			if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
			if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
		    mailTransport.sendMail({
		        from: from,
		        to: errorRecipient,
		        subject: 'Meadowlark Travel Site Error',
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('Unable to send email: ' + err);
		    });
		},
    };
};