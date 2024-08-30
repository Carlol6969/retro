import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>RetroClassique</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i class='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i class='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box'>
            <h2>Sobre nós</h2>
            <ul>
              <li>Carregamentos</li>
              <li>Nossas Lojas</li>
              <li>Nossos Cuidados</li>
              <li>Termos e Condições</li>
              <li>Políticas de Privacidade</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Atendimento</h2>
            <ul>
              <li>Central de Ajuda </li>
              <li>Como Comprar </li>
              <li>Rastrear Pedido</li>
              <li>Loja e Compras </li>
              <li>Reembolso e Devolução</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Entre em Contato</h2>
            <ul>
              <li>R. Santa Cruz, Senai Araguaína - Tocantins</li>
              <li>Email:retroclassicshop@gmail.com</li>
              <li>Phone:+55 8002-4922</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
