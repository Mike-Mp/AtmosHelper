export default function AddNewItem({
  flavorData,
  setFlavorData,
  useBrands,
  setUseBrands,
  allBrands,
  addToDatabase,
  deleteItem,
  item_id,
}) {
  return (
    <form className="form">
      <div className="form__section">
        {item_id ? (
          ""
        ) : (
          <>
            <label className="radio">
              Existing Brands <span>Use Existing?</span>
              <input
                type="checkbox"
                onChange={() => {
                  setFlavorData({ ...flavorData, brand_name: "" });
                  setUseBrands((s) => !s);
                }}
              />
            </label>
            <select
              className="select"
              name="existing brand"
              value={flavorData.brand_id}
              disabled={!useBrands}
              onChange={(e) =>
                setFlavorData({ ...flavorData, brand_id: e.target.value })
              }
            >
              <option key={0}>Choose brand</option>
              {allBrands.length > 0
                ? allBrands.map((brand) => {
                    return (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name}
                      </option>
                    );
                  })
                : ""}
            </select>
            <label>
              Brand Name
              <span className="form__info">
                (not required if brand already exists)
              </span>
            </label>
            <input
              type="text"
              spellCheck={false}
              value={flavorData.brand_name}
              onChange={(e) => {
                setFlavorData({ ...flavorData, brand_id: "" });
                setFlavorData({ ...flavorData, brand_name: e.target.value });
              }}
              disabled={useBrands}
            />
          </>
        )}
        <label>Flavor Name</label>
        <input
          spellCheck={false}
          type="text"
          value={flavorData.flavor_name}
          onChange={(e) =>
            setFlavorData({ ...flavorData, flavor_name: e.target.value })
          }
        />

        <label>Note</label>
        <textarea
          spellCheck={false}
          value={flavorData.notes}
          onChange={(e) =>
            setFlavorData({ ...flavorData, notes: e.target.value })
          }
          className="textarea mb-20"
          rows={5}
          cols={5}
        ></textarea>

        <div className="flex a-c j-s g-20">
          <div className="liked">
            <label className="liked-text">Liked?</label>
            <input
              type="checkbox"
              name="liked"
              id="yep"
              className="liked-check"
              checked={flavorData.liked}
              value={flavorData.liked}
              onChange={(e) =>
                setFlavorData({ ...flavorData, liked: !flavorData.liked })
              }
            />
          </div>
          <div className="amount">
            <label className="amount-text">Amount</label>
            <input
              type="number"
              className="amount-number"
              value={flavorData.amount}
              onChange={(e) =>
                setFlavorData({ ...flavorData, amount: e.target.value })
              }
              min={0}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn--submit"
          onClick={addToDatabase}
        >
          {item_id ? "Edit Item" : "Add Item"}
        </button>
        {item_id ? (
          <button
            className="btn btn--delete"
            onClick={deleteItem}
          >
            Delete Item
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
