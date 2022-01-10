import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Sidebar, Icon, Button } from "semantic-ui-react";
import UserSideBar from "../components/Products/UserSidebar";
import FiltersBar from "../components/Products/FiltersBar";
import ProductList from "../components/Products/ProductList";
import PagePagination from "../components/Filters/PagePagination";
import baseUrl from "../utils/baseUrl";


export default function Products_Filtered({ user, products, totalPages, search, minValue, maxValue, sortBy, category, page }) {
  const router = useRouter();

  const [searchState, setSearchState] = React.useState(search);
  const [categoryState, setCategoryState] = React.useState(category);
  const [sortByState, setSortByState] = React.useState(sortBy);
  const [minValueState, setMinValueState] = React.useState(minValue);
  const [maxValueState, setMaxValueState] = React.useState(maxValue);
  const [pageState, setPageState] = React.useState("1");

  const [visible, setVisible] = React.useState(false)
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
      case "category":
        category = event.target.value;
        setCategoryState(event.target.value);
        handleSubmit(event);
        break;
      case "sortBy":
        sortBy = event.target.value;
        setSortByState(event.target.value);
        handleSubmit(event);
        break;
      case "minPrice":
        if (event.target.value >= 0 && (!maxValueState || event.target.value <= maxValueState)) {
          setMinValueState(event.target.value);
        }
        break;
      case "maxPrice":
        if (event.target.value >= 0) {
          setMaxValueState(event.target.value);
        }
        break;
    }
  }


  function handleClearPrice(event) {
    setMinValueState("");
    setMaxValueState("");
    page = 1;
    setPageState(1);
    const searchParam = search !== "" ? `search=${search}&` : "";
    const sortByParam = sortBy !== "0" ? `sortBy=${sortBy}&` : "";
    const categoryParam = category !== "0" ? `category=${category}&` : "";
    const pageParam = page !== 0 ? `page=${page}` : "";
    router.push(`/products_filtered?${searchParam + sortByParam + categoryParam + pageParam}`);
    setVisible(false);
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
    const minValueParam = minValueState ? `minValue=${minValueState}&` : "";
    const maxValueParam = maxValueState ? `maxValue=${maxValueState}&` : "";
    const sortByParam = sortBy !== "0" ? `sortBy=${sortBy}&` : "";
    const categoryParam = category !== "0" ? `category=${category}&` : "";
    const pageParam = `page=${page}`;
    let filters = categoryParam + sortByParam + minValueParam + maxValueParam;

    if (filters) {
      router.push(`/products_filtered?${searchParam + categoryParam + sortByParam + minValueParam + maxValueParam + pageParam}`);
    } else {
      if (search) {
        router.push(`/products?${searchParam.replace("&", "")}`);
      } else {
        router.push(`/products`);
      }
    }
    setVisible(false);
  }


  return (
    <div class="container-fluid page-products">
      <h1> {search ? `Showing results for "${search}"` : "Products"} </h1>

      {screenWidth >= 992 ? (
        <div>
          <div class="filters-div">
            <FiltersBar
              minValueState={minValueState}
              maxValueState={maxValueState}
              sortByState={sortByState}
              categoryState={categoryState}
              searchState={searchState}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleClearPrice={handleClearPrice}
            />
          </div>

          <div>
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
          <Button className="filters-button" icon="sliders horizontal" size="tiny" content="Filters" onClick={handleFiltersButton} />
          <Sidebar.Pushable className={visible ? "sidebar-pushable" : ""}>
            <Sidebar
              className="sidebar"
              animation='overlay'
              icon='labeled'
              vertical
              visible={visible}
            >
              <UserSideBar
                minValueState={minValueState}
                maxValueState={maxValueState}
                sortByState={sortByState}
                categoryState={categoryState}
                handleChange={handleChange}
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


Products_Filtered.getInitialProps = async ({ query: { search, minValue, maxValue, sortBy, category, page } }) => {
  const url = `${baseUrl}/api/products_user`;
  const payload = { params: { search, minValue, maxValue, sortBy, category, page } }
  const response = await axios.get(url, payload);
  return response.data;
};
