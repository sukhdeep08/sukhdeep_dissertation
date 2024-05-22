import { useEffect } from "react";
import styles from "../product/Products.module.css";
import { fetchProductsSearch } from "../../services/apiProduct";
import ProductItem from "../product/ProductItem";

// import Loader from "../../ui/Loader/Loader";
import { updateProductList } from "../product/productSlice";
import ItemNotFound from "../../ui/ItemNotFound/ItemNotFound";
import { discountedPrice } from "../../util/helper";
import ProductHeader from "../../ui/ProductHeader/ProductHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Filter from "../Filter/Filter";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader/Loader";

function SearchPage() {
  const products = useSelector((state) => state.product.productList);
  //   const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const asc = useSelector((state) => state.filter.asc);
  const des = useSelector((state) => state.filter.des);
  const above = useSelector((state) => state.filter.above);
  const one = useSelector((state) => state.filter.one);
  const five = useSelector((state) => state.filter.five);
  const { query: searchValue } = useParams();
  console.log(searchValue);
  // useEffect(
  //   function () {
  //     {
  //       fetchProductsSearch(searchValue).then((data) =>
  //         dispatch(updateProductList(data.products))
  //       );
  //       // setLoading(false);
  //     }
  //   },
  //   [searchValue, dispatch]
  // );

  const { data, isLoading } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: () => fetchProductsSearch(searchValue),
  });

  useEffect(() => {
    if (data) {
      dispatch(updateProductList(data.products));
    }
  }, [data, dispatch]);

  let productList;

  switch (true) {
    case asc:
      productList = products.slice().sort((a, b) => a.price - b.price);
      break;
    case des:
      productList = products.slice().sort((a, b) => b.price - a.price);
      break;
    case five:
      productList = products.filter(
        (item) => discountedPrice(item.price, item.discountPercentage) <= 500
      );
      break;
    case one:
      productList = products.filter(
        (item) =>
          discountedPrice(item.price, item.discountPercentage) > 500 &&
          discountedPrice(item.price, item.discountPercentage) <= 1000
      );
      break;
    case above:
      productList = products.filter(
        (item) => discountedPrice(item.price, item.discountPercentage) > 1000
      );
      break;
    default:
      productList = products;
      break;
  }

  if (isLoading) return <Loader />;

  if (productList.length === 0) {
    return <ItemNotFound />;
  }
  return (
    <>
      <Filter />
      <ProductHeader />
      <div className={styles.cards}>
        {/* <SkelLoading /> */}
        {productList.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default SearchPage;
