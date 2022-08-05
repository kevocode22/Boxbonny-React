import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from "react-redux"
import axios from 'axios'


function Paypal({precioTotal}) {
    // const precio = useSelector(store=> store.shoppingActions.getProduct)
    const [dolar, setDolar] = useState([])

    useEffect(()=>{
        axios.get(`https://api.bluelytics.com.ar/v2/latest`)
        .then((api)=> setDolar(api.data.oficial.value_sell))
    },[])
    // console.log("DOLAR", dolar);

    let precio = precioTotal

    let precioendolar = Math.ceil(precio / dolar)
    
    // console.log("precio en dolar", precioendolar);

    const initialOptions = {
        "client-id": "AeJkCCC1SfRb72aMkBVnOtoLoovSO29ohdVw_MjbnVf0bYsVmFHHhy3AtBbrpFW-LDX2X7sgo4lJF0-h",
        currency: "USD",
        intent: "capture"
    }

    const createOrder = (data, actions) => {
        //Creo la orden de con los datos, esta puede ser general o con detalle de items
        // console.log(data)
        return actions.order.create({
            purchase_units: [{
                reference_id: "BoxBonny",
                description: "BoxBonny",

                custom_id: "BoxBonny",
                soft_descriptor: "BoxBonny",
                amount: {
                    currency_code: "USD",
                    value: precioendolar,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: precioendolar
                        },
                    }
                },
            }]
        });
    };
    const onCancel = () => {
        toast.error('Has cancelado el pago!')
    }
    const onApprove = () => { //recibo el resultado de mi operacion
        toast.success('Tu pago fue aprobado!')
        toast.success('Gracias por su compra 😄')
    };
    const onError= () => {
        toast.error('Ocurrio un error en el pago')
    }
const PayPalCheckOut = () => {
    return (
        <PayPalScriptProvider options={initialOptions}> {/*Inicializo el CDN*/}
            {/*Inicializo los botones*/}
            <PayPalButtons
                createOrder={createOrder}
                onCancel={onCancel}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    )
}
return (
    <>
        <PayPalCheckOut  />
    </>
)
}

export default Paypal