const sortByNewDate = (products) => {
  return products.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
}

const sortByPrice = (product, method) => {
  return product.sort((a, b) => {
    const aPrice = a.discont_price || a.price
    const bPrice = b.discont_price || b.price
    return method === "low-hight" ? aPrice - bPrice : bPrice - aPrice
  })
}

const sortProducts = (products, searchParams) => {
  const filteredProducts = products.filter((product) => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const includeDiscount = searchParams.get("includeDiscount")
    console.log(includeDiscount)
    const currentPrice = product.discont_price
      ? product.discont_price
      : product.price;


    if (minPrice && currentPrice < Number(minPrice)) {
      return false;
    }
    if (maxPrice && currentPrice > Number(maxPrice)) {
      return false;
    }
    if (includeDiscount === "true" && product.discont_price) {
      return true
    }
    if (includeDiscount === "false" || includeDiscount === null) {
      return true
    }
    return false;
  });
  const sortType = searchParams.get("sortType")
  if (sortType || sortType !== "default" && sortType) {
    if (sortType === "newest") {
      return sortByNewDate(filteredProducts)
    } else {
      return sortByPrice(filteredProducts, sortType === "priceHighToLow" ? "hight-low" : "low-hight")
    }
  } else {
    return filteredProducts
  }


}

export default sortProducts