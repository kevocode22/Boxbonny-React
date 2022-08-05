import { render, screen } from '@testing-library/react'
import { Comment } from '../../components/Comment'

const comentario={
  idUsuario:{
    nombre: "test",
    imagen:"test",
    apellido:"test"
  },
  rating: 5,
  comentario: "prueba test"
}

describe('Comment tests', () => { 
  test('should display properly', () => { 
    const {container} = render(<Comment comentario={comentario} />)
    expect(container).toMatchSnapshot()
   })
  test('should show specific comment', () => {
    render(<Comment comentario={comentario} />)
    expect(screen.getByText("prueba test")).toBeTruthy() 
   })
   

   
   
 })