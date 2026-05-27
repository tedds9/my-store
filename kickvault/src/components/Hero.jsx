
import  './../styles/Hero.css';

export function Hero() {
  return (

    
    <section className="hero" >
      <div>
        <h1 className="heading" aria-label="heading">EVERY STEP. ELEVATED.</h1>
        <p className="sub-heading" aria-label="subheading">"Premium sneakers for those who move with intention."</p>
        <div>
          <button className="shop-now" aria-label="Shop now">
            Shop Now
          </button>
          <button className="explore-now" aria-label="Explore now">
            Explore
          </button>
        </div>
      </div>
    </section>
  )
}