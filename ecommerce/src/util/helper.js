export function truncateDescription(description, length) {
  const words = description.split(" ");
  if (words.length > length) {
    return words.slice(0, length).join(" ") + "...";
  }
  return description;
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const discountedPrice = (price, discount) => {
  // if (isNaN(price) || isNaN(discount)) {
  //   console.error("Invalid input: price and discount must be numbers");
  //   return NaN;
  // }
  // console.log(discount);
  // Calculate discounted price
  const discountedPrice = price - (price * discount) / 100;
  return discountedPrice;
};
