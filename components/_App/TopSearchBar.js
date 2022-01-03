import React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Icon } from "semantic-ui-react";


export default function TopSearchBar() {
  const router = useRouter();

  const [topSearch, setTopSearch] = React.useState("");


  function handleChange(event) {
    setTopSearch(event.target.value);
  }

  function handleClearSearch(event) {
    setTopSearch("");
  }

  async function handleSearch(event) {
    const searchParam = topSearch !== "" ? `?search=${topSearch}` : "";
    router.push(`/products${searchParam}`);
  }


  return (
    <>
      <div class="top-searchbar">
        <Form>
          <Form.Input
            transparent
            size="large"
            className="top-searchbar-input"
            name="search"
            placeholder="Search"
            value={topSearch}
            onChange={handleChange}
          />
          <Button
            size="small"
            className="top-searchbar-button"
            type="submit"
            icon="search"
            onClick={handleSearch}
          />
          <Button
            size="small"
            className={topSearch.length > 0 ? "top-searchbar-button" : "top-searchbar-hidden-button"}
            type="clear"
            icon="delete"
            onClick={handleClearSearch}
          />
        </Form>
      </div>
    </>
  );
}
