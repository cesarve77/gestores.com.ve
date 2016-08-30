# SimpleMP

Facíl uso he instalación del custom checkout de mercado pago para Meteor

## Instalación
```
$ meteor add cesarve:mp
```

## Uso
```
{{>MP_form data}}
```

Donde data es un objeto con la infomación del pago ver [https://www.mercadopago.com.ve/developers/es/api-docs/custom-checkout/create-payments/]
Aquí puedes pasar información relevante a la compra que el cliente esta haceindo, para recuperarla
 luego de cuando finalice la transacción y actualiazr tu base de datos.
 
Por ejemplo puedes usar los campos
* external_reference: ID given by the merchant in their system
* metadata: Valid JSON that can be attached to the payment to record additional 
attributes of the merchant

Pero el mínimo de objeto son:

```
{
    "transaction_amount": 100,
    "description": "Title of what you are paying for",
    "payer": {
        "email": "test_user_19653727@testuser.com"
    }
}

```


## Configuración 

#### Claves publicas y privadas
Se debe configurar la clave pública y el access token de mercadolibre en Meteor.settings 
[https://docs.meteor.com/api/core.html#Meteor-settings]

De la siguiente manera:

```
{
    "MP": {
        "accessToken": "TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx__LB_LA__-xxxxxxxxx"
    },
    "public": {
        "MP": {
           "publicKey":"TEST-xxxxxxxxxxxxxxxxxxxxx"

        }
    }
}
```

Para obtener estas credenciales lee esta información [https://www.mercadopago.com.ve/developers/es/api-docs/custom-checkout/authentication/]

#### Hooks 

Hay 3 tipos de funciones que puedes configurar del lado del Servidor

**onSuccess(payment)**: se ejecutará cuando una transacción sea aprobada o pendiente (puedes poner
 binary_mode para evitar el status pendiente) y recibe como parametro el objeto payment 
 [https://www.mercadopago.com.ve/developers/es/api-docs/custom-checkout/create-payments/] 
 devuelto por mercadopago. Debes aplicar tu logía para actualizar tu base de datos

**onError(error)**: se ejecutará cuando no se haya podido aprobar la transación pero se puede 
volver a intentar, normalmente pueden ser errores del cliente al llenar el formulario, y recibe 
como parametros payment y el error con la explicación devuelta por mercadopago

**onRejected(error)** se ejecutará cuando la tarjeta haya sido declinada, y recibe como parametros
 payment y el error con la explicación devuelta por mercadopago

**onNotification(error)** se ejecutará cada vez que haya una transacción o esta cambie de estado ver
[https://www.mercadopago.com.ve/developers/es/solutions/payments/custom-checkout/webhooks/]
Si cambias la opción notification_url de la data esta función no se ejcutará y deberás implementar tu propia logica
Esta función no se ejecuta en localhost, solo se ejcuta en producción.

Para configurarlas usa:
```
//del lado del servidor
import {MP} from 'meteor/cesarve:mp'
MP.configure({
    onSuccess:function(payment){
        MyOrders.findOne(payment.external_reference,{$set:{status: 'pagada'}})
    },
    onError:function(payment,error){
        console.log(payment,error)
    },
    onRejected:function(payment,error){
        console.log(payment,error)
    }
    onNotification: function(payment){
        console.log(payment,error)
    }
})

Igualmente son las mismas 3 funciones que puedes usar del lado del cliente.

Para configurarlas usa:
```
//del lado del cliente
import {MP} from 'meteor/cesarve:mp'
MP.configure({
    onSuccess:function(payment){
        FlowRouter.go('successPage')
    },
    onError:function(payment,error){
        console.log(payment,error)
    },
    onRejected:function(payment,error){
        console.log(payment,error)
    }
})

Pero en este caso si las funciones devuelven true el paquete se encargará de mostrar el mensaje 
de error, si devuelve false tu debes encargarte de mostrar el error y de la experiencia de usuario

### Otras configuraciones

##### Contribuir con el desarrollo de este paquete
Lamentablemente la documentación de mercadopago no es muy exacta en cuanto errores se trata por 
lo que en estas primeras versiones hemos puesto esta opción para que el paquete envie a nuestros
servidores los errores que recibes cuando haya una transacción fallida y aún no la tengamos 
registrada como traducción (puedes ver el archivo errors.js), de esta manera podremos hacer crecer 
nuestra base de datos de errores.

Para desactivar esta opción usa:
```
//del lado del cliente
MP.configure({
    contribute:false
})
```

##### Registrar todas las trasacciones 
Con esta opción puedes hacer que el paque guarde todas las trasacciones con status 200 o 201 en una 
collecion que puedes accesar a través de MP.transactions
```
//del lado del servidor
MP.transactions.find()
```

para activarla usa:
```
//del lado del servidor
MP.configure({
    registerTransactions:true
})
```

Con esta opción puedes usar el paquete matb33:collection-hooks [https://github.com/matb33/meteor-collection-hooks]
y tambien tener control sobre las transacciones.



