import React, { useState } from 'react';
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import usuariosActions from '../redux/actions/usuariosActions';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import "../styles/login.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';



export default function Nav() {

  const [anchorElUser, setAnchorElUser] = useState(null);
  const usuario = useSelector(store => store.usuariosReducer.user);
  // console.log("usuario", usuario);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(store => store.shoppingReducer.productos)
  async function desloguearse() {
    await dispatch(usuariosActions.desloguearse())
      .then(navigate("/home", { replace: true }))
    //me lleva de nuevo al home al hacer sign out
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const productosSum = products?.shopping
  let contador = 0
  productosSum?.map(c => contador = contador + c.cantidad)

  function admin() {
    navigate("/administrador")
  }
  return (
    <header className="sticky top-0  z-50  bg-[#F6F7EB]">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <LinkRouter to="/">
            <img className="logo w-[auto] h-[2rem] " src="https://i.imgur.com/eRNMvAF.png" alt="logo" />
            </LinkRouter>
          </div>
          <div className=" md:flex md:items-center md:gap-12">
            <nav className="hidden md:block" aria-labelledby="header-navigation">
              <h2 className="sr-only" id="header-navigation">Header navigation</h2>

              <ul className="flex items-center gap-6 text-md fontPoppins ">
                <li>
                  <LinkRouter
                    className="text-black-500 transition hover:text-[#FF8E72]"
                    to="/"
                    aria-label="enlace a inicio"
                    title="link a inicio"

                  >
                    Inicio
                  </LinkRouter>
                </li>
                <li>
                  <LinkRouter
                    className="text-black-500 transition hover:text-[#FF8E72]"
                    to="/packs"
                    aria-label="enlace a packs"
                    title="link a packs"
                  >
                    Packs
                  </LinkRouter>
                </li>
                <li>
                  <LinkRouter
                    className="relative flex items-center justify-center"
                    to="/cart"
                    aria-label="enlace a carrito"
                    title="carrito de compras"
                    id="Link a carro de compras"
                  >
                    {usuario ? <Badge color="error" badgeContent={contador}>
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                      :
                      <ShoppingCartOutlinedIcon />
                    }
                  </LinkRouter>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4 fontPoppins ">
              {/* avatar usuario */}
              <Box sx={{ flexGrow: 0 }}>
                <div>
                  <Box sx={{ display: "flex", p: 0 }}>
                    {usuario ? <Box sx={{ display: 'flex', flexDirection: 'column', WebkitJustifyContent: 'center', color: '#FF8E72', alignItems: 'center', }} >
                      <IconButton onClick={handleOpenUserMenu} >
                        <Avatar alt="imagen del usuario" src={usuario?.imagen} sx={{ width: 30, height: 30 }} sm={{ width: 30, height: 30 }} />
                        <p className="m-nombreAvatar pl-2" aria-label="nombre del usuario">{usuario?.nombre}</p>
                      </IconButton>
                    </Box>
                      :
                      <>
                        <div className="sm:gap-4 sm:flex">
                          <LinkRouter
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#FF8E72] rounded-md hover:text-[#393E41] shadow"
                            style={{ color: 'black' }}
                            to="signin"
                            aria-label="enlace a formulario de inicio"
                            title="Ingreso a formulario de inicio"
                          >
                            Ingresá
                          </LinkRouter>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'column', WebkitJustifyContent: 'center', alignItems: 'center', color: 'white', paddingLeft: "2rem" }} > <Avatar alt="avatar no logueado" src={"https://i.imgur.com/F6TK2Lu.png"} sx={{ width: 35, height: 35 }} /></Box>
                      </>
                    }
                  </Box>
                </div>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {usuario ?
                    usuario?.rol === "admin" ?
                      <Box onClick={handleCloseUserMenu}>
                        <MenuItem style={{ textAlign: "center", justifyContent: 'center' }} onClick={desloguearse}>
                          <Typography sx={{ padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)' }} style={{ fontFamily: "Poppins" }} title="desloguearse">Salir</Typography>
                        </MenuItem>
                        <MenuItem onClick={admin}>
                          <Typography sx={{ padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)' }} style={{ fontFamily: "Poppins" }} >Cargar Experiencia</Typography>
                        </MenuItem>
                      </Box>
                      :
                      <Box onClick={handleCloseUserMenu}>
                        <MenuItem style={{ textAlign: "center", justifyContent: 'center' }} onClick={desloguearse}>
                          <Typography sx={{ padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)' }} style={{ fontFamily: "Poppins" }} >Salir</Typography>
                        </MenuItem>
                      </Box>
                    :
                    <MenuItem
                      onClick={handleCloseUserMenu}><Typography sx={{ padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)' }} style={{ fontFamily: "Poppins" }}>No estás logueado</Typography></MenuItem>
                  }
                </Menu>
              </Box>
            </div>
          </div>
        </div>
        <div className="border-t border-black-100 md:hidden lg:hidden">
          <nav
            className="flex items-center justify-center p-4 overflow-x-auto text-sm font-medium gap-6"
          >
            <LinkRouter
              className="text-black-500 transition hover:text-[#FF8E72]"
              to="/"
              title="enlace a inicio"
              aria-labelledby='enlace'
            >
              Inicio
            </LinkRouter>
            <LinkRouter
              className="text-black-500 transition hover:text-[#FF8E72]"
              to="/packs"
              aria-labelledby='enlace a packs'
              title="enlace a packs"
            >
              Packs
            </LinkRouter>
            <LinkRouter
              className="relative flex items-center justify-center"
              to="/cart"
              aria-labelledby='enlace a carrito'
              title="enlace a carrito"

            >
              {usuario ? <Badge color="error" badgeContent={contador}>
                <ShoppingCartOutlinedIcon />
              </Badge>
                :
                <ShoppingCartOutlinedIcon />
              }
            </LinkRouter>
          </nav>
        </div>
      </div >
    </header >
  )
}
