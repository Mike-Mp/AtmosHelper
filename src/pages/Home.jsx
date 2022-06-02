import { useEffect, useState } from "react";
import vapeIcon from '../icons/vape.png';
import { changeDaysSmoked, getDaysSmoked } from "../services/Functions";

export default function Home() {
  const [dateStopped, setDateStopped] = useState('');
  const [daysStopped, setDaysStopped] = useState(0);

  useEffect(() => {
    async function initDaysSmoked() {
      const date = await getDaysSmoked();
      console.log(date);
      setDateStopped(date[0].date_stopped_smoking);
    }

    initDaysSmoked();
  }, [])

  async function changeDateStopped() {
    const newDays = await changeDaysSmoked(dateStopped);
    console.log(newDays);
    setDaysStopped(newDays);
  }

  console.log(dateStopped);

  return (
    <div className="app__body">
      <header className="app__header">
        <h1>
          AtmosHelper
          {/* <img src={vapeIcon} width="25px" height="25px" /> */}
        </h1>
      </header>
      <section className="app__section">
          <h4>Stopped smoking: <span>{daysStopped}</span> days ago</h4>
      </section>
      <section className="app__section flex g-20">
          <input className="datepicker" value={dateStopped ? dateStopped : new Date()} type="date" onChange={(e)=>setDateStopped(e.target.value)}/>
          <button className="btn btn--reset" onClick={changeDateStopped}>
            Change Date
          </button>
      </section>
    </div>
  );
}
