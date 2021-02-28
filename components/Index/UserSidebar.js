import SearchBar from "../../components/Filters/SearchBar";
import ProductSort from "../../components/Filters/ProductSort";
import PriceFilter from "../../components/Filters/PriceFilter";
import CategoryFilter from "../../components/Filters/CategoryFilter";


export default function UserSidebar({ searchState, minValueState, maxValueState, sortByState,
  categoryState, handleChange, handleClearSearch, handleSubmit, handleClearPrice,
  screenWidth, setScreenWidth }) {


  return (
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
          screenWidth={screenWidth}
          setScreenWidth={setScreenWidth}
        />
      </div>

      <div class="sidebar-select">
        <CategoryFilter
          value={categoryState}
          onChange={handleChange}
          screenWidth={screenWidth}
          setScreenWidth={setScreenWidth}
        />
      </div>
    </div>
  )
}
