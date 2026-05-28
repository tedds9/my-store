import '../styles/ProductCard.css';

export function ProductCard({ product }) {

  return (
    <section className="card-container" key={product.id}>
      <div className="card-top">
        <a className="image-link">
          <img alt="product shoes" className="images" src={product.image} >
          </img>
        </a>
      </div>
      <div className="card-bottom">
        <a aria-label={product.name} href="./">
          <h3 className="name">{product.name}</h3>
        </a>
        <a aria-label={product.price} href="./">
          <p className="price" >${product.price}</p>
        </a>
      </div>
    </section>

  )

}