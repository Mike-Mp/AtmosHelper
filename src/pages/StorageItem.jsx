import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { getBrands, getFlavor, add, edit } from "../services/Functions";

import AddNewItem from "../components/AddNewItem";
import Message from "../components/Message";

export default function StorageItem() {
  const { item_id } = useParams();
  const [feedbackMessage, setFeedbackMessage] = useState({
    type: "",
    message: "",
    show: false,
  });

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
    brand_name: brand_name ? brand_name : "",
  });

  useEffect(() => {
    getBrandsList();
  }, []);

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

  function basicValidation() {
      if (
        flavorData.brand_id.length === 0 &&
        flavorData.brand_name.length === 0
      ) {
        setFeedbackMessage({
          type: "error",
          message: "Missing brand name",
          show: true,
        });
        return;
      }
  }

  async function addToDatabase(e) {
    e.preventDefault();
    try {
      basicValidation();

      if (item_id) {
        basicValidation();
        const item = await edit(flavorData, item_id);
        console.log(item);
        setFeedbackMessage({type: 'success', message: 'Item edited!', show: true})
      } else {
        const item = await add(flavorData);
        console.log(item);
        setFeedbackMessage({type: 'success', message: 'Item added!', show: true})
      }
    } catch (err) {
      console.log(err);
      setFeedbackMessage({ type: "error", message: err.message, show: true });
    }
  }

  return (
    <div className="app__body">
      <header className="app__header">
        <h1>{item_id ? `Edit Storage Item` : `Add Storage Item`}</h1>
      </header>

      {feedbackMessage.show ? (
        <Message
          type={feedbackMessage.type}
          content={feedbackMessage.message}
          setMessage={setFeedbackMessage}
        />
      ) : (
        ""
      )}

      <AddNewItem
        flavorData={flavorData}
        setFlavorData={setFlavorData}
        useBrands={useBrands}
        setUseBrands={setUseBrands}
        allBrands={allBrands}
        addToDatabase={addToDatabase}
        item_id={item_id}
      />
    </div>
  );
}
