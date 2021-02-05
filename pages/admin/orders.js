import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import AdminMenu from "../../components/Admin/AdminMenu";
import OrderTable from "../../components/Admin/OrderTable";
import PagePagination from "../../components/Filters/PagePagination";
import SearchBar from "../../components/Filters/SearchBar";
import OrderStatusFilter from "../../components/Filters/OrderStatusFilter";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import { redirectUser } from "../../utils/auth";
import { parseCookies } from "nookies";
import cookie from "js-cookie";


export default function Orders({ orders, totalPages }) {

  const [ordersFiltered, setOrdersFiltered] = React.useState(orders);
  const [totalPagesState, setTotalPagesState] = React.useState(totalPages);

  const [searchState, setSearchState] = React.useState("");
  let search = searchState;

  const [statusFilterState, setStatusFilterState] = React.useState("0");
  let statusFilter = statusFilterState;

  const [sortByState, setSortByState] = React.useState("datePlaced");
  const [ascendingState, setAscendingState] = React.useState(false);
  let sortBy = sortByState;
  let ascending = ascendingState;

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
      case "statusFilter":
        statusFilter = event.target.value;
        setStatusFilterState(event.target.value);
        handleSubmit(event);
        break;
    }
  }

  function handleClearSearch(event) {
    search = "";
    setSearchState("");
    handleSubmit(event);
  }

  function handleSortTable(sortEvent) {
    if (sortBy === sortEvent) {
      ascending = !ascending;
      setAscendingState(!ascendingState);
    } else {
      sortBy = sortEvent;
      ascending = false;
      setSortByState(sortEvent);
      setAscendingState(false);
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
      const url = `${baseUrl}/api/orders_admin_filter`;
      const tokenAdmin = cookie.get("tokenAdmin");
      const payload = {
        params: { search, statusFilter, sortBy, ascending, page },
        headers: { Authorization: tokenAdmin }
      }
      const response = await axios.get(url, payload);
      setOrdersFiltered(response.data.orders);
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
                label="ORDER ID / CUSTOMER"
                value={searchState}
                handleChange={handleChange}
                handleClearSearch={handleClearSearch}
                handleSubmit={handleSubmit}
              />
            </div>

            <div class="sidebar-include">
              <OrderStatusFilter
                value={statusFilterState}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div class="admin-right">
          <div class="admin-table">
            <OrderTable
              orders={ordersFiltered}
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

    </div>
  );
}

Orders.getInitialProps = async ctx => {
  const { tokenAdmin } = parseCookies(ctx);
  if (!tokenAdmin) {
    redirectUser(ctx, "/");
  }
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 15;
  const url = `${baseUrl}/api/orders_admin_initial`;
  const payload = { headers: { Authorization: tokenAdmin } };
  const response = await axios.get(url, payload);
  return response.data;
};
