/**
 * Created by cesar on 29/8/16.
 */
import {MP} from './client'
export const errorMessage=function(err) {

    this.err = err
    this.details = [
        {code: "221", description: "Debe introducir el nombre del tarjetahabiente"},
        {code: "214", description: "Debe introducir el número de tarjeta de crédito"},
        {code: "212", description: "Debe introducir el tipo de documento de identificación del tarjetahabiente"},
        {code: "205", description: "Debe introducir el número de tarjeta de crédito"},
        {code: "224", description: "Debe introducir el código de seguridad (CVV)"},
        {code: "208", description: "Debe introducir el mes de vencimiento de la tarjeta de crédito"},
        {code: "209", description: "Debe introducir el año de vencimiento de la tarjeta de crédito"},
        {code: "220", description: "Debe introducir el banco emisor de la tarjeta de crédito"},
        {code: "316", description: "El nombre del tarjetahabiente no parece ser válido"},
        {code: "324", description: "El número de identificación del tarjetahabiente no parece ser válido"},
        {code: "322", description: "El type de documento de identificación no parece ser válido"},
        {code: "E301", description: "El número de tarjeta no parece ser válido"},
        {code: "E302", description: "El código de seguridad (CVV) no parece ser válido"},
        {code: "325", description: "El mes de vencimiento de no parece ser válido"},
        {code: "326", description: "El año de vencimiento de no parece ser válido"}
    ]
    this.reasons = [
        {
            reason: "invalid parameters",
            description: "Se encontraron parametros inválidos",
            action: "Favor revise el formulario he intente de nuevo"
        },
        {
            reason: "cc_rejected_call_for_authorize",
            description: "Debe llamar al banco para autorizar la transacción.",
            action: "Por favor llame a su banco e intente de nuevo"
        },
        {
            reason: "cc_rejected_insufficient_amount",
            description: "Fondos insuficientes",
            action: "Favor intente con una tarjeta diferente."
        },
        {
            reason: "cc_rejected_bad_filled_security_code",
            description: "Código de seguridad (CVV) inválido.",
            action: "Favor revise el formulario he intente de nuevo."
        },
        {
            reason: "cc_rejected_bad_filled_date",
            description: "Hay datos incorrectos en el formulario",
            action: "Favor revise el formulario he intente de nuevo."
        },
        {
            reason: "cc_rejected_bad_filled_other",
            description: "Hay datos incorrectos en el formulario",
            action: "Favor revise el formulario he intente de nuevo."
        },
        {
            reason: "cc_rejected_other_reason",
            description: "La transacción fue rechazada",
            action: "Favor intente con una tarjeta diferente."
        },
    ]

    const reason = _.findWhere(this.reasons, {reason: this.err.reason})
    if (reason == undefined) {
        if (MP.options.contribute)
            $.post('http://imagenproactiva.com/mp/errors.php', this.err, null, 'json')
        return this.err.reason
    }
    let msg = reason.description + '</br>'
    if (Array.isArray(this.err.details)) {
        msg += '<ul>'
        this.err.details.forEach((detail)=> {
            const field = _.findWhere(this.details, {code: detail.code})
            if (field != undefined)
                msg += '<li>' + field.description + '</li>'

        })
        msg += '</ul>'
    }
    msg += '</br>' + reason.action
    return msg
}
