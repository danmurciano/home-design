import ProductSort from "../../components/Filters/ProductSort";
import PriceFilter from "../../components/Filters/PriceFilter";
import CategoryFilter from "../../components/Filters/CategoryFilter";


export default function FiltersBar({ minValueState, maxValueState, sortByState,
  categoryState, handleChange, handleSubmit, handleClearPrice }) {


  return (
    <div class="row filters-row">
      <div class="col-3 filter">
        <CategoryFilter
          value={categoryState}
          onChange={handleChange}
        />
      </div>

      <div class="col-1"/>

      <div class="col-3 filter">
        <ProductSort
          value={sortByState}
          onChange={handleChange}
        />
      </div>

      <div class="col-1"/>

      <div class="col-4 filter">
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
