/**
 * Created by cesar on 29/8/16.
 */
import './form'

export const  MP = {
    options:{
        //funciones del lado del cliente
        //funcion a ejecutarse cuando la transacción haya sido probada
        onSuccess: (payment)=>{
            return true
        },
        //funcion a ejecutarse cuando la transacción haya sido rechazada
        onRejected: (payment)=>{
            return true
        },
        //funcion a ejecutarse cuando se encuentre algun error (normalmente es rechazada tambien, pero se puede volver a intentar)
        onError: (payment)=>{
            return true
        },
        contribute: true
    },
    configure: (options)=> {
        _.extend(MP.options,options)
    }

    
}
