import { useEffect, useState, useMemo } from "react";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { init } from "../services/Functions";

import Note from "../components/Note";

import editIcon from "../icons/edit.svg";
import noteIcon from "../icons/note.svg";
import addIcon from "../icons/add-btn.svg";
import dataIcon from "../icons/data.svg";

export default function Storage() {
  const [storageItems, setStorageItems] = useState([]);
  const [itemNote, setItemNote] = useState({ show: false, note: "" });
  const [brandName, setBrandName] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const [addNewPopUp, setAddNewPopUp] = useState(false);

  let { page_number } = useParams();
  page_number = parseInt(page_number);

  const brand = searchParams.get("brand");

  const [pageNumber, setPageNumber] = useState(page_number);

  useEffect(() => {
    async function initData() {
      try {
        let offset = page_number === 1 ? 0 : (page_number - 1) * 6;
        const data = await init(offset);
        setStorageItems(data);
      } catch (err) {
        console.log(err);
      }
    }
    setPageNumber(page_number);
    initData();
  }, [page_number]);

  function showNote(notes) {
    setItemNote({ show: true, note: notes });
  }

  function getUniqueBrandNames() {
    const arr2 = [];
    storageItems.filter(function (item) {
      let i = arr2.findIndex((x) => x.brand_name == item.brand_name);
      if (i <= -1) {
        arr2.push(item);
      }
      return null;
    });

    return arr2.map((item) => (
      <option value={item.id} key={item.id}>
        {item.brand_name}
      </option>
    ));
  }

  return (
    <div className="app__body">
      {itemNote.show ? (
        <Note note={itemNote.note} setItemNote={setItemNote} />
      ) : (
        ""
      )}
      <header className="app__header">
        <h1>Storage</h1>
      </header>

      <select
        className="select right"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      >
        <option value={"all"}>All</option>
        {getUniqueBrandNames()}
      </select>

      <div className="flex f-s g-20">
        <Link to="/storage/add">
          <button
            className="btn btn--storage"
          >
            <img src={addIcon} width="20" height="20" />
            <span>Add new item</span>
          </button>
        </Link>
        <button className="btn btn--storage">
          <img
            onClick={() => console.log("lel")}
            src={dataIcon}
            width="20"
            height="20"
          />
          <span>Show Data</span>
        </button>
      </div>

      {storageItems.length > 0 ? (
        <section className="app__section section--table">
          <table>
            <tbody>
              <tr>
                <th>Brand Name</th>
                <th>Flavor Name</th>
                <th>Amount</th>
                <th>Liked</th>
                <th>Notes</th>
                <th>Edit</th>
              </tr>
              {storageItems &&
                storageItems.map((item) => (
                  <tr key={item.id} className={`storage-item ${item.color_id}`}>
                    <td>{item.brand_name}</td>
                    <td>{item.flavor_name}</td>
                    <td>{item.amount}</td>
                    <td className={`liked--${item.liked}`}></td>
                    <td className="td td--center">
                      <img
                        src={noteIcon}
                        onClick={() => showNote(item.notes)}
                      />
                    </td>
                    <td className="td td--center">
                      <Link
                        to={`/storage/edit/${item.id}?brand_name=${item.brand_name}`}
                      >
                        <img src={editIcon} />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ) : (
        ""
      )}

      <section className="app__section section--page-btns">
        <Link to={`/storage/${page_number - 1}?brand=${brand}`}>
          <button disabled={page_number === 1}>Back</button>
        </Link>
        <Link to={`/storage/${page_number + 1}?brand=${brand}`}>
          <button disabled={storageItems.length === 0}>More</button>
        </Link>
      </section>
    </div>
  );
}
