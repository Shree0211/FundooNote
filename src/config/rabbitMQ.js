import { mail } from "../utils/helper";
var amqp = require('amqplib/callback_api');

export function publisher(data){
    console.log("publisher data",data);
    
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = JSON.stringify(data);

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
});
}

export function consumer(){
    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            
            console.log(" [x] Received %s", msg.content.toString());
            const userdata = JSON.parse(msg.content);
            console.log("Userdata:",userdata);
            mail(userdata.email);
        }, {
            noAck: true
        });
    });
});
}
consumer();
