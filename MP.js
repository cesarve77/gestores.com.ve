/**
 * Created by cesar on 31/8/16.
 */
export const  MP = {
    options: {
        onSuccess: (payment)=> {
        },
        onRejected: (payment, error)=> {
        },
        onError: (payment, error)=> {
        },
        onNotification: (payment)=> {
        },

        debug: true,
    },
    configure: (options)=> {
        _.extend(MP.options, options)
    },
}
if (Meteor.isServer) {
    MP.options.registerTransactions = false
    MP.options.transactions = new Mongo.Collection('mp_transactions')
}

export const  log = function () {
    if (MP.options.debug) {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
        console.trace();
        console.log('******************')
    }
}