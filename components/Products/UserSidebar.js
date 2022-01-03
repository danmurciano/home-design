import ProductSort from "../../components/Filters/ProductSort";
import PriceFilter from "../../components/Filters/PriceFilter";
import CategoryFilter from "../../components/Filters/CategoryFilter";


export default function UserSidebar({ minValueState, maxValueState, sortByState,
  categoryState, handleChange, handleSubmit, handleClearPrice }) {


  return (
    <div class="sidebar">
      <div class="sidebar-select">
        <CategoryFilter
          value={categoryState}
          onChange={handleChange}
        />
      </div>

      <div class="sidebar-select">
        <ProductSort
          value={sortByState}
          onChange={handleChange}
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
    </div>
  )
}
