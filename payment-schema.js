/**
 * Created by cesar on 26/8/16.
 */

export const paymentSchema = new SimpleSchema({
    "payer": {
        type: Object
    },
    "payer.type": {
        optional: true,
        type: String,
        allowedValues: ['customer', 'registered', 'guest']
    },
    "payer.id": {
        optional: true,
        type: Number,
    },
    "payer.email": {
        type: String,
    },
    "payer.identification": {
        optional: true,
        type: Object,
    },
    "payer.identification.type": {
        optional: true,
        type: String
    },
    "payer.identification.number": {
        optional: true,
        type: String
    },
    "payer.phone": {
        optional: true,
        type: Object
    },
    "payer.phone.area_code": {
        optional: true,
        type: String
    },
    "payer.phone.number": {
        optional: true,
        type: String
    },
    "payer.phone.extension": {
        optional: true,
        type: String
    },
    "payer.first_name": {
        optional: true,
        type: String
    },
    "payer.last_name": {
        optional: true,
        type: String
    },
    "binary_mode": {
        optional: true,
        type: Boolean
    },
    "order": {
        optional: true,
        type: Object
    },
    "order.type": {
        optional: true,
        type: String
    },
    "order.id": {
        optional: true,
        type: Number
    },
    "external_reference": {
        optional: true,
        type: String
    },
    "description": {
        optional: true,
        type: String
    },
    "metadata": {
        optional: true,
        type: Object
    },
    "transaction_amount": {
        type: Number
    },
    "coupon_amount": {
        optional: true,
        type: Number
    },
    "campaign_id": {
        optional: true,
        type: String,
    },
    "coupon_code": {
        optional: true,
        type: String,
    },
    "differential_pricing_id": {
        optional: true,
        type: Number
    },
    "application_fee": {
        optional: true,
        type: Number
    },
    "capture": {
        optional: true,
        type: Boolean
    },
    "payment_method_id": {
        type: String
    },
    "issuer_id": {
        optional: true,
        type: String
    },
    "token": {
        type: String
    },
    "statement_descriptor": {
        type: String
    },
    "installments": {
        type: Number,
        autoValue: function () {
          return this.value || 1
        }
    },
    "notification_url": {
        optional: true,
        type: String
    },
    "additional_info": {
        optional: true,
        type: Object
    },
    "additional_info.items": {
        optional: true,
        type: [Object]
    },
    "additional_info.items.$": {
        optional: true,
        type: Object
    },
    "additional_info.items.$.id": {
        optional: true,
        type: String
    },
    "additional_info.items.$.title": {
        optional: true,
        type: String
    },
    "additional_info.items.$.description": {
        optional: true,
        type: String
    },
    "additional_info.items.$.picture_url": {
        optional: true,
        type: String
    },
    "additional_info.items.$.category_id": {
        optional: true,
        type: String
    },
    "additional_info.items.$.quantity": {
        optional: true,
        type: Number
    },
    "additional_info.items.$.unit_price": {
        optional: true,
        type: Number
    },
    "additional_info.payer": {
        optional: true,
        type: Object,
    },
    "additional_info.payer.first_name": {
        optional: true,
        type: String,
    },
    "additional_info.payer.last_name": {
        optional: true,
        type: String,
    },
    "additional_info.payer.phone": {
        optional: true,
        type: Object,
    },
    "additional_info.payer.phone.area_code": {
        optional: true,
        type: String,
    },
    "additional_info.payer.phone.number": {
        optional: true,
        type: String,
    },
    "additional_info.payer.address": {
        optional: true,
        type: Object,
    },
    "additional_info.payer.address.zip_code": {
        optional: true,
        type: String,
    },
    "additional_info.payer.address.street_name": {
        optional: true,
        type: String,
    },
    "additional_info.payer.address.street_number": {
        optional: true,
        type: Number,
    },
    "additional_info.shipments": {
        optional: true,
        type: Object,
    },
    "additional_info.shipments.receiver_address": {
        optional: true,
        type: Object,
    },
    "additional_info.shipments.receiver_address.zip_code": {
        optional: true,
        type: String,
    },
    "additional_info.shipments.receiver_address.street_name": {
        optional: true,
        type: String,
    },
    "additional_info.shipments.receiver_address.street_number": {
        optional: true,
        type: Number,
    },
    "additional_info.shipments.receiver_address.floor": {
        optional: true,
        type: String,
    },
    "additional_info.shipments.receiver_address.apartment": {
        optional: true,
        type: String,
    },


})