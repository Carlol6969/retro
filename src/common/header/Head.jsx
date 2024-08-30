import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <i className='fa fa-phone'></i>
            <label>+55 9002-8922</label>
            <i className='fa fa-envelope'></i>
            <label> retroclassicshop@gmail.com</label>
          </div>
          <div className='right row RText'>
            <label>Sobre FAQ's</label>
            <label>Quer Ajuda?</label>
            <span>🇧🇷</span>
            <label>PT</label>
            <span>🇧🇷</span>
            <label>BRL</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
