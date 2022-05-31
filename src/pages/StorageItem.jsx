import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { getBrands, getFlavor, add } from "../services/Functions";

import AddNewItem from "../components/AddNewItem";

export default function StorageItem({ type }) {
  const { item_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const brand_name = searchParams.get("brand_name");
  const [allBrands, setAllBrands] = useState([]);
  const [useBrands, setUseBrands] = useState(false);
  const [flavorData, setFlavorData] = useState({
    flavor_name: "",
    liked: false,
    notes: "",
    brand_id: "",
    amount: 0,
    brand_name: brand_name ? brand_name : '',
  });

  console.log(flavorData.liked)

  useEffect(() => {
    getBrandsList();
  }, [])

  useEffect(() => {
    async function getItemData() {
      if (item_id) {
        const data = await getFlavor(item_id);
        setFlavorData({ ...data });
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
        <h1>{item_id ? `Edit Storage Item` : `Add Storage Item`}</h1>
      </header>

      <AddNewItem
        flavorData={flavorData}
        setFlavorData={setFlavorData}
        useBrands={useBrands}
        setUseBrands={setUseBrands}
        allBrands={allBrands}
        addToDatabase={addToDatabase}
      />
    </div>
  );
}
