
import  './../styles/Hero-mobile.css';
import  './../styles/Hero-desktop.css';

export function Hero() {
  return (

    
    <section className="hero" aria-label="hero-section" >
      <div className="hero-container">
        <h1 className="heading" aria-label="heading">EVERY STEP. ELEVATED.</h1>
        <p className="sub-heading" aria-label="subheading">"Premium sneakers for those who move with intention."</p>
        <div className="action-now-container">
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