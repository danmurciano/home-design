import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Sidebar, Grid, Icon, Button } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import UserSideBar from "../components/Index/UserSidebar";
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

  const [visible, setVisible] = React.useState(false)

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  const [screenWidth, setScreenWidth] = React.useState(1920);


  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
  });

  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  function handleFiltersButton() {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }


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
    setVisible(false);
  }


  return (
    <div class="container-fluid pageMain">

      {screenWidth >= 1080 ? (
        <div class="row">
          <div class="admin-left">
            <UserSideBar
              searchState={searchState}
              minValueState={minValueState}
              maxValueState={maxValueState}
              sortByState={sortByState}
              categoryState={categoryState}
              handleChange={handleChange}
              handleClearSearch={handleClearSearch}
              handleSubmit={handleSubmit}
              handleClearPrice={handleClearPrice}
            />
          </div>

          <div class="admin-right">
            <div>
              <ProductList user={user} products={products} />
            </div>
            <div>
              <PagePagination
                pageState={pageState}
                totalPages={totalPages}
                handlePageSelect={handlePageSelect}
              />
            </div>
          </div>
        </div>

      ) : (

        <div>
          <Button color="instagram" icon="sliders horizontal" onClick={handleFiltersButton} />
          <Sidebar.Pushable className={visible ? "sidebar-pushable" : ""}>
            <Sidebar
              className="sidebar"
              animation='overlay'
              icon='labeled'
              vertical
              visible={visible}
            >
              <UserSideBar
                searchState={searchState}
                minValueState={minValueState}
                maxValueState={maxValueState}
                sortByState={sortByState}
                categoryState={categoryState}
                handleChange={handleChange}
                handleClearSearch={handleClearSearch}
                handleSubmit={handleSubmit}
                handleClearPrice={handleClearPrice}
              />
            </Sidebar>

            <Sidebar.Pusher dimmed={visible}>
              <div class="index-right">
                <div>
                  <ProductList user={user} products={products} />
                </div>
                <div>
                  <PagePagination
                    pageState={pageState}
                    totalPages={totalPages}
                    handlePageSelect={handlePageSelect}
                  />
                </div>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )}
    </div>
  );
}


Home.getInitialProps = async ({ query: { search, minValue, maxValue, sortBy, category, page } }) => {
  const url = `${baseUrl}/api/products_user`;
  const payload = { params: { search, minValue, maxValue, sortBy, category, page } }
  const response = await axios.get(url, payload);
  return response.data;
};
