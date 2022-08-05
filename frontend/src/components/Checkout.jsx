import React from "react";
import { FaCreditCard } from 'react-icons/fa'
import { Link as LinkRouter } from 'react-router-dom'
import Paypal from "./Paypal";
import { useSelector } from "react-redux";

export default function Checkout() {
    const products = useSelector(store => store.shoppingReducer.productos)

    const productosSum = products?.shopping
    console.log(productosSum)

    let contador = 0
    productosSum?.map(c => contador = contador + c.cantidad)

    let total = 0
    productosSum?.forEach(prod => {
        total = total + prod.idPack?.Precio * prod?.cantidad
    })

    let recargo = 100
    let precioTotal = total + recargo


    return (
        <div className="bg-gray-100 mb-6">
            <div className="container mx-auto mt-10">
                <div className=" flex justify-center shadow-md items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4
				md:px-6 lg:px-20 xl:px-44">
                    <div className=" flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row	justify-center items-center	lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <div className="flex w-full bg-white flex-col min-h-[25rem] justify-start items-start p-6 md:p-14">
                            <div className="">
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black-800 flex items-center" title="Forma de pago"><FaCreditCard className="mr-2" /> Forma de Pago</p>
                            </div>
                            <div className="mt-2">
                                <LinkRouter to="/cart" title="Link a carrito" className="flex font-semibold text-orange-600 hover:underline text-sm ">
                                    <svg className="fill-current mr-2 text-orange-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                    Volver al carrito
                                </LinkRouter>
                            </div>

                            <button aria-labelledby="boton a Paypal" className="	mt-8	text-base	font-medium	focus:ring-2 focus:ring-offset-2 focus:ring-blue-800		leading-4	py-4	w-full	md:w-4/12	lg:w-full	text-white	" >
                                <Paypal precioTotal={precioTotal} />
                            </button>

                        </div>

                        <div className="flex flex-col justify-start items-start w-full p-6 md:p-14">
                            <div className="border-b pb-8 w-full" >
                                <h1 className="text-2xl font-semibold leading-6 text-black-800">Resumen de compra</h1>
                            </div>
                            <div className="flex mt-7 pb-32 border-b flex-col items-end w-full space-y-6">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-black-600">Cantidad de Packs</p>
                                    <p className="text-lg font-semibold leading-4 text-black-600">{contador}</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Recargo por servicio</p>
                                    <p className="text-lg font-semibold leading-4 text-black-600">${recargo}</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Subtotal</p>
                                    <p className="text-lg font-semibold leading-4 text-black-600">${total}</p>
                                </div>
                            </div>
                            <div className="flex justify-between w-full items-center py-6">
                                <p className="text-xl font-semibold leading-4 text-black-800">Total</p>
                                <p className="text-lg font-semibold leading-4 text-black-800">${precioTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}