const ProductAdCard = (props) => {
  const { title, products } = props;

  const customStyles = {
    color: "brown",
  };

  return (
    <div className="product-ad-card">
      <h4>{title}</h4>
      <div className="product-item-parent-container">
        {products.map((elem) => {
          return (
            <div key={elem.title} className="product-item">
              <img src={elem.imgSrc} />
              {/* <h6>{elem.id}</h6> */}
              {/* <h5 style={customStyles}>{elem.title}</h5> */}
              <h5 style={{ color: "brown" }}>{elem.title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductAdCard;
