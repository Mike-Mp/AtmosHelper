import { useEffect, useState } from "react";

import { getBrands } from "../services/Functions";

export default function AddNewStorageItem() {
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(''); 
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


  console.log(selectedBrand)
  return (
    <div className="app__body">
      <header className="app__header">
        <h1>Add Storage Item</h1>
      </header>

      <section className="app__section"></section>

      <div className="form">
        <div className="form__section">
          <label className="radio">
            Existing Brands <span>Use Existing?</span>
            <input type="checkbox" onChange={() => setUseBrands((s) => !s)} />
          </label>
          <select className="select" value={selectedBrand} disabled={!useBrands} onChange={(e) => {
              return setSelectedBrand(e.target.value)}
              }>
            {allBrands.length > 0
              ? allBrands.map((brand) => {
                  return <option key={brand.id} value={brand.id}>{brand.brand_name}</option>;
                })
              : ""}
          </select>
          <label>
            Brand Name:{" "}
            <span className="form__info">
              (not required if brand already exists)
            </span>
          </label>
          <input type="text" onChange={(e) => setBrandName(e.target.value)} disabled={useBrands} />

          <label>Flavor name</label>
          <input
            type="text"
            onChange={(e) =>
              setFlavorData({ ...flavorData, flavor_name: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
