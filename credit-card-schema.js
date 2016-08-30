export const creditCardSchema = new SimpleSchema({
    email: {
        label: 'email',
        type: 'String',
    },
    cardNumber: {
        label: 'Número de tarjeta',
        type: String,
        custom: function () {
            var value = this.value;

            if (/[^0-9 \-]+/.test(value)) {
                return 'noCreditCard';
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false,
                n, cDigit;
            value = value.replace(/\D/g, "");
            // Basing min and max length on
            // http://developer.ean.com/general_info/Valid_Credit_Card_Types
            if (value.length < 13 || value.length > 19) {
                return 'noCreditCard';
            }
            for (n = value.length - 1; n >= 0; n--) {
                cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if (( nDigit *= 2 ) > 9) {
                        nDigit -= 9;
                    }
                }

                nCheck += nDigit;
                bEven = !bEven;
            }
            return ( nCheck % 10 ) === 0 ? true : 'noCreditCard';
        },
        autoform: {
            afFieldInput: {
                "data-checkout": 'cardNumber'

            }
        }

    },
    cardholderName: {
        label: 'Nombre del tarjetahabiente',
        type: String,
        min: 2,
        autoform: {
            afFieldInput: {
                "data-checkout": 'cardholderName'


            }
        }

    },
    cardExpirationMonth: {
        label: 'Mes',
        type: String,
        autoform: {
            type: "select",
            options: function () {
                var months = []
                for (var i = 1; i <= 12; i++) {
                    months.push({label:  i, value:  i})
                }
                return months;
            },
            afFieldInput: {
                "data-checkout": 'cardExpirationMonth'


            }
        }
    },
    cardExpirationYear: {
        label: 'Año',
        type: String,
        autoform: {
            type: "select",
            options: function () {
                var years = []
                for (var i = 2016; i <= 2030; i++) {
                    years.push({label: i, value: i})
                }
                return years;
            },
            afFieldInput: {
                "data-checkout": 'cardExpirationYear'


            }
        }
    },
    securityCode: {
        label: 'CCV',
        type: String,
        min: 3,
        max: 4,
        regEx: /[0-9]/,
        autoform: {
            afFieldInput: {
                "data-checkout": 'securityCode'


            }
        }
    },

    docType: {
        label: 'Tipo documento',
        type: String,
        autoform: {
            type: "select",
            options: [{label: 'Cargando...', value: ''}],
            afFieldInput: {
                "data-checkout": 'docType'


            }

        }
    },
    docNumber: {
        label: 'Documento',
        type: String,
        autoform: {
            afFieldInput: {
                "data-checkout": 'docNumber'

            }
        }
        //todo regex
    },
    paymentMethodId: {
        optional: true,
        label: 'paymentMethodId',
        type: String,
    }
})
creditCardSchema.messages({
    noCreditCard: 'Este número no parece ser válido ',
    required: 'Es requerido',
})



