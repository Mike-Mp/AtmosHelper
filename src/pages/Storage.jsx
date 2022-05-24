import { useEffect, useState, useMemo } from "react";

import { Link, useParams } from "react-router-dom";

import { init } from "../services/Functions";

export default function Storage() {
  const [storageItems, setStorageItems] = useState([]);

  let { page_number } = useParams();
  page_number = parseInt(page_number);

  const [pageNumber, setPageNumber] = useState(page_number);

  useEffect(() => {
    async function initData() {
      try {
        let offset = page_number === 1 ? 0 : (page_number - 1) * 6;
        console.log("pageNumber", pageNumber);
        console.log("offset", offset);
        const data = await init(offset);
        setStorageItems(data);
      } catch (err) {
        console.log(err);
      }
    }
    setPageNumber(page_number);
    initData();
  }, [page_number]);

  return (
    <div className="app__body">
      <header className="app__header">
        
        <h1>Storage</h1>
      </header>

        <select className="select">
          <option>All</option>
          <option>BigVape</option>
          <option>AtmosLab</option>
          <option>SmokeMan</option>
        </select>

      <section className="app__section section--grid">
        {storageItems.length > 0
          ? storageItems.map((item) => (
              <div key={item.id} className={`storage-item ${item.color}`}>
                <span>{item.flavor_name}</span> <span>[{item.amount}]</span>
              </div>
            ))
          : ""}
      </section>

      <section className="app__section section--page-btns">
        <Link to={`/storage/${page_number - 1}`}>
            <button disabled={page_number === 1}>Back</button>
        </Link>
        <Link to={`/storage/${page_number + 1}`}>
            <button disabled={storageItems.length === 0}>More</button>
        </Link>
      </section>

      {/* <section className="app__section">
        <div className="form">
          <div className="form__section">
            <label>Brand Name</label>
            <input type="text" disabled />
          </div>
        </div>
      </section> */}
    </div>
  );
}
