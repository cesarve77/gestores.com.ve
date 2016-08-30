import {MP} from './server'
// necessary to parse POST data
var bodyParser = require('body-parser')
// necessary for Collection use and other wrapped methods
var Fiber = Npm.require('fibers');

WebApp.connectHandlers
    .use(bodyParser.urlencoded({extended: true}))  // these two replace
    .use(bodyParser.json())        // the old bodyParser
    .use("/mp/webhooks", function (req, res, next) {
        console.log('webhook')
        // necessary for Collection use and other wrapped methods
        Fiber(function () {


            const event = req.body
            if (event.type == "payment") {
                console.log('paymernt')
                let accessToken = Meteor.settings.MP && Meteor.settings.MP.accessToken
                //si no existen arrojamos un error
                if (!accessToken)
                    throw new Meteor.Error('404', 'No se encontro MP.accessToken en Meteor.settings')
                //seteamos el accestoken a la libreria de MP
                var MercadoPago = require('mercadopago')
                var mp = new MercadoPago(accessToken);
                var paymentInfo = mp.get("/v1/payments/" + event.data.id);
                paymentInfo
                    .then(
                    (payment)=> {
                        MP.options.onNotification(payment)
                        res.writeHead(200);
                        res.end('');
                        return payment
                    },
                    (error)=>{
                        console.log('error1')
                        res.writeHead(500);
                        res.end('');
                        return error
                    })
                    .catch(
                        (error)=>{
                            console.log('error2')
                            res.writeHead(500);
                            res.end('');
                            return error
                        }
                    )
            }
        }).run();
    })
