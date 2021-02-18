import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import AdminMenu from "../../components/Admin/AdminMenu";
import ProductTable from "../../components/Admin/ProductTable";
import CreateProduct from "../../components/Admin/CreateProduct";
import SearchBar from "../../components/Filters/SearchBar";
import ProductStatusFilter from "../../components/Filters/ProductStatusFilter";
import PriceFilter from "../../components/Filters/PriceFilter";
import CategoryFilter from "../../components/Filters/CategoryFilter";
import PagePagination from "../../components/Filters/PagePagination";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import { redirectUser } from "../../utils/auth";
import { parseCookies } from "nookies";
import cookie from "js-cookie";


export default function Products({ products, totalPages }) {

  const [createModal, setCreateModal] = React.useState(false);
  const [productsFiltered, setproductsFiltered] = React.useState(products);
  const [totalPagesState, setTotalPagesState] = React.useState(totalPages);

  const [searchState, setSearchState] = React.useState("");
  let search = searchState;

  const [minValueState, setMinValueState] = React.useState("");
  const [maxValueState, setMaxValueState] = React.useState("");
  let minValue = minValueState;
  let maxValue = maxValueState

  const [statusFilterState, setStatusFilterState] = React.useState("0");
  let statusFilter = statusFilterState;

  const [sortByState, setSortByState] = React.useState("name");
  const [ascendingState, setAscendingState] = React.useState(true);
  let sortBy = sortByState;
  let ascending = ascendingState;

  const [categoryState, setCategoryState] = React.useState("0");
  let category = categoryState;

  const [pageState, setPageState] = React.useState("1");
  let page = pageState;

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");


  function handleChange(event, value) {
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
      case "statusFilter":
        statusFilter = event.target.value;
        setStatusFilterState(event.target.value);
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

  function handleSortTable(sortEvent) {
    if (sortBy === sortEvent) {
      ascending = !ascending;
      setAscendingState(!ascendingState);
    } else {
      sortBy = sortEvent;
      ascending = true;
      setSortByState(sortEvent);
      setAscendingState(true);
    }
    handleSubmit(event);
  }

  function handlePageSelect(data) {
    page = data;
    setPageState(data)
    handleSubmit(event, "pageSelect");
  }


  async function handleSubmit(event, source) {
    if (source !== "pageSelect") {
      page = 1;
      setPageState(1)
    }
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/products_admin_filter`;
      const tokenAdmin = cookie.get("tokenAdmin");
      const payload = {
        params: { search, minValue, maxValue, statusFilter, category, sortBy, ascending, page },
        headers: { Authorization: tokenAdmin }
      }
      console.log(payload);
      const response = await axios.get(url, payload);
      setproductsFiltered(response.data.products);
      setTotalPagesState(response.data.totalPages);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div class="container-fluid admin-page">
      <div>
        <AdminMenu />
      </div>

      <div class="row admin-main">
        <div class="admin-left">
          <div class="sidebar-admin">
            <div class="sidebar-element">
              <SearchBar
                label="NAME / SKU"
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
              <ProductStatusFilter
                value={statusFilterState}
                onChange={handleChange}
              />
            </div>

            <div class="sidebar-select">
              <CategoryFilter
                value={categoryState}
                onChange={handleChange}
              />
            </div>

            <div class="new-product-button">
              <Button
                size="large"
                color="instagram"
                icon="plus"
                labelPosition="right"
                content="New Product"
                onClick={() => setCreateModal(true)}
              />
            </div>
          </div>
        </div>

        <div class="admin-right">
          <div class="admin-table">
            <ProductTable
              products={productsFiltered}
              sortByState={sortByState}
              ascendingState={ascendingState}
              handleSortTable={handleSortTable}
              handleEdit={handleSubmit}
            />
          </div>
          <div>
            <PagePagination
              pageState={pageState}
              totalPages={totalPagesState}
              handlePageSelect={handlePageSelect}
            />
          </div>
        </div>
      </div>

      <Modal show={createModal === true} onHide={() => setCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title as="h4" className="edit-product-title"> CREATE NEW PRODUCT </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProduct />
        </Modal.Body>
      </Modal>

    </div>
  );
}

Products.getInitialProps = async ctx => {
  const { tokenAdmin } = parseCookies(ctx);
  if (!tokenAdmin) {
    redirectUser(ctx, "/login");
  }
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 15;
  const url = `${baseUrl}/api/products_admin_initial`;
  const payload = { headers: { Authorization: tokenAdmin } };
  const response = await axios.get(url, payload);
  return response.data;
};
