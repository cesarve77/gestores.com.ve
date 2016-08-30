/**
 * Created by cesar on 29/8/16.
 */
import './methods'
import './webhooks'

export const  MP = {
    options:{
        onSuccess: (payment)=>{},
        onRejected: (payment,error)=>{},
        onError: (payment,error)=>{},
        onNotification: (payment)=>{},
        registerTransactions: false,
    },
    configure: (options)=> {
        _.extend(MP.options,options)
    },
    transactions: new Mongo.Collection('mp_transactions')
}
