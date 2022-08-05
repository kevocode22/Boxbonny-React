import { Link as LinkRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import shoppingActions from "../redux/actions/shoppingActions";
import { useState } from 'react'
import "../styles/packDetails.css"

export default function ShoppingCart() {
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()
  const products = useSelector(store => store.shoppingReducer.productos)
  // console.log(products)

  async function toDelete(event) {
    const idProducto = event.target.id
    dispatch(shoppingActions.deleteProduct(idProducto))
    dispatch(shoppingActions.getUserProducts())
    setReload(!reload)
  }

  const productosSum = products?.shopping


  let contador = 0
  productosSum?.map(c => contador = contador + c.cantidad)

  let total = 0
  productosSum?.forEach(prod => {
    total = total + prod.idPack?.Precio * prod?.cantidad
  })

  async function toModify(event) {
    event.preventDefault()
    const modifyCarrito = {
      productId: event.target.id,
      cantidad: event.target.value
    }
    dispatch(shoppingActions.modifyProduct(modifyCarrito))
    dispatch(shoppingActions.getUserProducts())
    setReload(!reload)
  }

  const usuario = useSelector(store => store.usuariosReducer.user)

  return (

    <div className="bg-gray-100 h-full">
      <div className="container mx-auto mt-10 ">
        <div className="flex flex-col justify-center items-center md:flex-row shadow-md my-10">

          {!usuario || products.shopping?.length === 0 ?
            <div className="w-3/4  h-[30rem]  bg-white px-10 py-10 flex flex-col justify-center">
              <p className="text-2xl text-center font-semibold" >Tu carrito esta vacio </p>
              <img className="h-[15rem] object-contain	" src="https://donweb.com/img/mis-compras/carro-vacio-canasta.png" alt="carrito-vacio" />
            </div>
            :
            <div className="w-full  sm:w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Carrito de compras</h1>
                <h2 className=" hidden sm:inline font-semibold text-2xl">{products.shopping?.map(c => c.cantidad.length)} Packs</h2>
              </div>
              <div className="flex flex-col sm:flex-row mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalles de Producto</h3>
                <h3 className="hidden sm:inline  font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Cantidad</h3>
                <h3 className="hidden sm:inline font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Precio</h3>
                <h3 className="hidden sm:inline font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
              </div>
              {products.shopping?.map((prod, index) =>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 hover:bg-gray-100 -mx-8 px-6 py-5" key={index}>
                  <div className="flex w-2/5">
                    <div className="hidden sm:inline  w-full sm:w-20">
                      <video className="hidden sm:inline h-24" src={prod.idPack?.imagen} alt="imagen-del-producto" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{prod.idPack?.nombre}</span>
                      <button onClick={toDelete} id={prod?._id} className="text-start font-semibold hover:text-red-500 text-gray-500 text-xs">🗑️Eliminar</button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <div className="div4-products">
                      <input id={prod?._id} onChange={toModify} className="custom-input-products" type="number" defaultValue={prod?.cantidad} min="1" max="100" />
                    </div>

                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${prod.idPack?.Precio}</span>
                  <div className="div3-details">
                    <p>${prod.idPack?.Precio * prod?.cantidad}</p>
                  </div>
                </div>)}

              <LinkRouter to="/packs" className="flex font-semibold hover:underline text-orange-600 text-sm mt-10">

                <svg className="fill-current mr-2 text-orange-600 w-4  " viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Continuar Comprando
              </LinkRouter>
            </div>
          }



          {usuario ?

            <div id="summary" className=" w-full sm:w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">Resumen del pedido</h1>
              <div className="flex justify-between mt-10 mb-5 packsCarrito">
                <span className="font-semibold text-sm uppercase">Packs {contador}</span>
              </div>

              <div className="border-t mt-8 flex flex-col  ">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase" title="costo total">
                  <span>Costo Total</span>
                  <span aria-labelledby="costo total">${total}</span>
                </div>
                <LinkRouter to="/checkout" title="link a checkout" className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full rounded flex justify-center items-center">Proceder a la compra</LinkRouter>
              </div>
            </div>

            :
            <div className="w-3/4 sm:w-2/4 lg:w-1/4 px-8 py-10 flex items-center justify-center">

              <LinkRouter to="/packs" className="bg-orange-500 font-bold hover:bg-orange-600 py-3 text-sm text-black uppercase w-full rounded flex justify-center items-center" title="Link a packs">Ver Packs</LinkRouter>
            </div>


          }

        </div>
      </div>
    </div>

  )
}