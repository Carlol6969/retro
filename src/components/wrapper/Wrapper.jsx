import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Entrega Internacional",
      decs: "Nós oferecemos pronta entrega em mais 90 países",
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: "Pagamento Seguro",
      decs: "Seus dados estão seguros com nossa criptografia, sem risco de vazamentos.",
    },
    {
      cover: <i class='fa-solid fa-shield'></i>,
      title: "Compre com Confiança",
      decs: "Nossos forneçedores valorizam os produtos e o frete, garantindo a qualidade e a entrega dos produtos.",
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: "Suporte 24 Horas ",
      decs: "Qualquer dúvida a qualquer momento, estamos a sua disposição.",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
