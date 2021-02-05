import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ProductList from "../components/Index/ProductList";
import SearchBar from "../components/Filters/SearchBar";
import ProductSort from "../components/Filters/ProductSort";
import PriceFilter from "../components/Filters/PriceFilter";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PagePagination from "../components/Filters/PagePagination";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";


export default function Home({ user, products, totalPages }) {
  const router = useRouter();

  const [productsFiltered, setproductsFiltered] = React.useState(products);
  const [totalPagesState, setTotalPagesState] = React.useState(totalPages);

  const [searchState, setSearchState] = React.useState("");
  let search = searchState;

  const [minValueState, setMinValueState] = React.useState("");
  const [maxValueState, setMaxValueState] = React.useState("");
  let minValue = minValueState;
  let maxValue = maxValueState

  const [sortByState, setSortByState] = React.useState("0");
  let sortBy = sortByState;

  const [categoryState, setCategoryState] = React.useState("0");
  let category = categoryState;

  const [pageState, setPageState] = React.useState("1");
  let page = pageState;

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");


  function handleChange(event) {
    switch (event.target.name) {
      case "search":
        setSearchState(event.target.value);
        break;
      case "minPrice":
        setMinValueState(event.target.value);
        break;
      case "maxPrice":
        setMaxValueState(event.target.value);
        break;
      case "sortBy":
        sortBy = event.target.value;
        setSortByState(event.target.value);
        handleSubmit(event);
        break;
      case "category":
        category = event.target.value;
        setCategoryState(event.target.value);
        handleSubmit(event);
        break;
    }
  }

  function handleClearSearch(event) {
    search = "";
    setSearchState("");
    handleSubmit(event);
  }

  function handleClearPrice(event) {
    minValue = "";
    maxValue = "";
    setMinValueState("");
    setMaxValueState("");
    handleSubmit(event);
  }

  function handlePageSelect(data) {
    page = data;
    setPageState(data)
    handleSubmit(event, "pageSelect");
  }

  function handleSubmit(event, source) {
    if (source !== "pageSelect") {
      page = 1;
      setPageState(1);
    }

    const searchParam = search !== "" ? `search=${search}&` : "";
    const minValueParam = minValue !== "" ? `minValue=${minValue}&` : "";
    const maxValueParam = maxValue !== "" ? `maxValue=${maxValue}&` : "";
    const sortByParam = sortBy !== "" ? `sortBy=${sortBy}&` : "";
    const categoryParam = category !== "" ? `category=${category}&` : "";
    const pageParam = page !== "" ? `page=${page}` : "";
    router.push(`/?${searchParam + minValueParam + maxValueParam + sortByParam + categoryParam + pageParam}`);
  }


  return (
    <div class="container-fluid pageMain">
      <div class="row">
        <div class="admin-left">
          <div class="sidebar">
            <div class="sidebar-element">
              <SearchBar
                label="PRODUCT"
                value={searchState}
                handleChange={handleChange}
                handleClearSearch={handleClearSearch}
                handleSubmit={handleSubmit}
              />
            </div>

            <div class="sidebar-element">
              <PriceFilter
                minValue={minValueState}
                maxValue={maxValueState}
                onChange={handleChange}
                handleClearPrice={handleClearPrice}
                onSubmit={handleSubmit}
              />
            </div>

            <div class="sidebar-select">
              <ProductSort
                value={sortByState}
                onChange={handleChange}
              />
            </div>

            <div class="sidebar-select">
              <CategoryFilter
                value={categoryState}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div class="admin-right">
          <ProductList
            user={user}
            products={products}
          />
        <div>
          <PagePagination
            pageState={pageState}
            totalPages={totalPages}
            handlePageSelect={handlePageSelect}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async ({ query: { search, minValue, maxValue, sortBy, category, page } }) => {
  const url = `${baseUrl}/api/products_user`;
  const payload = { params: { search, minValue, maxValue, sortBy, category, page } }
  const response = await axios.get(url, payload);
  return response.data;
};
