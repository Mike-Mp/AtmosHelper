import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { getBrands, getFlavor, add } from "../services/Functions";

export default function StorageItem() {
  const { item_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const brand_name = searchParams.get("brand_name");
  // const [allBrands, setAllBrands] = useState([]);
  const [useBrands, setUseBrands] = useState(false);
  const [flavorData, setFlavorData] = useState({
    flavor_name: "",
    liked: false,
    notes: "",
    brand_id: "",
    amount: 0,
    brand_name: '',
  });

  console.log(flavorData)

  useEffect(() => {
    async function getItemData() {
      if (item_id) {
        const data = await getFlavor(item_id);
        setFlavorData({...data});
      }
    }
    getItemData();
  }, []);

  async function getBrandsList() {
    try {
      const data = await getBrands();
      setAllBrands(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addToDatabase(e) {
    e.preventDefault();

    if (
      flavorData.brand_id.length === 0 &&
      flavorData.brand_name.length === 0
    ) {
      console.log("missing values1");
      return;
    }

    if (item_id) {
      console.log("edit item");
    } else {
      const newItem = { ...flavorData };
      const item = await add(newItem);
    }
  }

  return (
    <div className="app__body">
      <header className="app__header">
        <h1>{item_id ? "Edit Storage Item" : "Add Storage Item"}</h1>
      </header>

      <form className="form">
        <div className="form__section">
          {/* <label className="radio">
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
          </select> */}
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
          <div className="flex a-c g-10">
            <label>Liked?</label>
            <label>yes</label>
            <input
              type="radio"
              name="liked"
              value={true}
              onChange={(e) =>
                setFlavorData({ ...flavorData, liked: e.target.value })
              }
            />
            <label>no</label>
            <input
              type="radio"
              name="liked"
              value={false}
              onChange={(e) =>
                setFlavorData({ ...flavorData, liked: e.target.value })
              }
            />
            <label>Amount</label>
            <input
              type="number"
              value={flavorData.amount}
              onChange={(e) =>
                setFlavorData({ ...flavorData, amount: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn--submit"
            onClick={addToDatabase}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
