import { useEffect, useState } from "react";

import { getBrands } from "../services/Functions";

export default function AddNewStorageItem() {
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(allBrands[0]?.id);
  const [useBrands, setUseBrands] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [flavorData, setFlavorData] = useState({
    flavor_name: "",
    liked: 0,
    notes: "",
    brand_id: null,
    amount: 0,
  });

  async function getBrandsList() {
    try {
      const data = await getBrands();
      console.log(data);
      setAllBrands(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBrandsList();
  }, []);

  return (
    <div className="app__body">
      <header className="app__header">
        <h1>Add Storage Item</h1>
      </header>

      <div className="form">
        <div className="form__section">
          <label className="radio">
            Existing Brands <span>Use Existing?</span>
            <input type="checkbox" onChange={() => setUseBrands((s) => !s)} />
          </label>
          <select
            className="select"
            name="existing brand"
            value={selectedBrand}
            disabled={!useBrands}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
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
            onChange={(e) => setBrandName(e.target.value)}
            disabled={useBrands}
          />

              <label>Flavor Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setFlavorData({ ...flavorData, flavor_name: e.target.value })
                }
              />
              <label>Color</label>
              <select className="select w-100">
                <option value="default">Default</option>
                <option value="strawberry">Strawberry</option>
                <option value="lemon">Lemon</option>
                <option value="watermelon">Watermelon</option>
                <option value="coffee">Coffee</option>
              </select>
          <label>Note</label>
          <textarea className="textarea mb-20" rows={5} cols={5}></textarea>
          <button
            className="btn btn--submit"
            onClick={() => console.log("hello")}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
