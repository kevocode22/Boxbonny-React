
import { Link as LinkRouter } from 'react-router-dom'
import "../styles/cards.css";

export default function Steps() {
  return (

    // <!-- Section Hero -->
    <div className="bg-[#F6F7EB] py-14">
      <div className="flex m-5 mb-12 justify-center " >
        <div className="max-w-70% fontRaleway text-base" >
          <p className="m-3" >En un mundo en el que todos corremos detrás del tiempo, vivir experiencias en lugar de obsequiar bienes materiales parece más que nunca la mejor elección.</p>
          <p className="m-3" >Todos nuestros packs están repletos de emoción y quien los disfrute podrá elegir la experiencia que desee.</p>
          <p className="ml-3" ><strong>¿Y por qué experiencias? <br /></strong></p>
          <p className="m-3" > Porque los momentos de felicidad son los que recordaremos por siempre.</p>
          <p className="m-3 box-bonny"><strong>Boxbonny. Experiencias que crean recuerdos!</strong></p>
        </div>
      </div>

      <h1 className="mt-8 text-center text-5xl text-[#FF8E72] font-bold como-funcionan">¿Cómo funciona?</h1>

      {/* <!-- Box --> */}
      <div className="md:flex md:justify-center md:space-x-8 md:px-14">

        {/* <!-- box-1 --> */}
        <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform transition duration-500 mx-auto md:mx-0">
          <div className="w-sm">
            <img className="w-64" aria-hidden="true" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg" alt="" />
            <div className="mt-4 text-[#FF8E72] text-center">
              <h1 className="text-xl font-bold">Paso 1</h1>
              <p className="mt-4 text-[#393E41]">Seleccioná el pack que quieras y su presentación con packaging físico o digital.</p>

            </div>
          </div>
        </div>

        {/* <!-- box-2 --> */}
        <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform  transition duration-500 mx-auto md:mx-0">
          <div className="w-sm">
            <img className="w-64" aria-hidden="true" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/3b242447f922540fbe750cab/fdf.jpg" alt="" />
            <div className="mt-4 text-[#FF8E72] text-center">
              <h1 className="text-xl font-bold">Paso 2</h1>
              <p className="mt-4 text-[#393E41]">Elegí una experiencia dentro de una amplia variedad de opciones.</p>

            </div>
          </div>
        </div>

        {/* <!-- box-3 --> */}
        <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform  transition duration-500 mx-auto md:mx-0">
          <div className="w-sm">
            <img className="w-64" aria-hidden="true" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a17abde8d83650a582a28432/users-with-speech-bubbles-vector_53876-82250.jpg" alt="" />

            <div className="mt-4 text-[#FF8E72] text-center">
              <h1 className="text-xl font-bold">Paso 3</h1>
              <p className="mt-4 text-[#393E41]">Disfrutá la experiencia presentando la tarjeta física o código E-Pack.</p>

            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center" >
        <LinkRouter to="/packs" title="link a packs" className="mt-10 mb-4 py-2 px-14 rounded-[15px] bg-[#FF8E72] text-white tracking-widest hover:bg-[#393E41] transition duration-200	l-card-button-comments"
          style={{ color: 'black' }}
        >CONOCE NUESTRAS OPCIONES</LinkRouter>
      </div>
    </div>

  )
}