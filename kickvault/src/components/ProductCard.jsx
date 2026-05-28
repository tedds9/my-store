import '../styles/ProductCard.css';
export function ProductCard({ products }) {

  return products.map((product) =>

    <section key={product.id}>
      <div className="card-container">
        <h2>
          <div className="card-top">
            <img className="images" src={product.image} ></img>
          </div>
          <div>

            <h3>
              <a href="./">
                <p>{product.name}</p>
              </a>
            </h3>

            <h3>
              <p>{product.price}</p>
            </h3>
          </div>
        </h2>

      </div>
    </section>
  )

}