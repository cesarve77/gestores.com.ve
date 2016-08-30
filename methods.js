/**
 * Created by cesar on 26/8/16.
 */
import {MP}  from './server'


Meteor.methods({
    mpCheckout: function (payment) {
        this.unblock()
        const host=this.connection.httpHeaders.host
        if (!payment.notification_url && host.indexOf('localhost')<0) {
            const secure =  host.indexOf('https') == 0
            payment.notification_url = Meteor.absoluteUrl('mp/webhooks', {secure})
        }
        var MercadoPago = Npm.require("mercadopago");
        //tomamos el access token de los settings
        let accessToken = Meteor.settings.MP && Meteor.settings.MP.accessToken
        //si no existen arrojamos un error
        if (!accessToken)
            throw new Meteor.Error('404', 'No se encontro el MP.accessToken en Meteor.settings')
        //seteamos el accestoken a la libreria de MP
        var mp = new MercadoPago(accessToken);
        const doPayment = mp.post("/v1/payments", payment)
        return doPayment
            .then(
                (result)=> {
                    if (MP.registerTransactions)
                        MP.transactions.insert(result)

                    //si hay error
                    if (result.status < 200 || result.status > 299) {
                        throw new Meteor.Error(result.status, result.message, result.name)
                    }
                    //si fue rechazado
                    if (result.response.status == 'rejected') {
                        throw new Meteor.Error(402, result.response.status_detail, result.response.status)
                    }
                    //ejecutamos la funcion del usuario
                    MP.options.onSuccess(payment, result)
                    return payment
                })
            .catch(err => {
                //capturamos el error
                if (err.error == 402) {
                    //ejecutamos la funcion del usuario
                    MP.options.onRejected(payment, err)
                } else {
                    //ejecutamos la funcion del usuario
                    MP.options.onError(payment, err)
                }
                throw new Meteor.Error(err.status || err.error, err.reason || err.message, err.name || err.detail)
            })
    },
})


