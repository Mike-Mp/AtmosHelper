import { useEffect, useState } from "react"
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


export default function Home() {
    const [daysSmoked,setDaysSmoked] = useState('');
    const [maxDate, setMaxDate] = useState(new Date());
    const [startDate, setStartDate] = useState();

    function dayCounter(date) {
        const newDate = new Date(date);
        const difference = new Date().getTime() - newDate.getTime();
        const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        setDaysSmoked(totalDays);
    };

    async function writeDataToFile() {
        try {
            console.log(daysSmoked)
            const fileTextOptions = {
                contents: daysSmoked,
                path: "pers/fs_tauri_test_folder/test.md"
            };
            const baseD = BaseDirectory.Document;
            const data = await writeFile(fileTextOptions, {dir: baseD});

            console.log(data)
        } catch(err) {
            console.log(err)
        }
 
    }

    useEffect(() => {
        dayCounter(startDate);
    }, [startDate])

    useEffect(() => {
        writeDataToFile();
   }, [daysSmoked])

    return (
        <div className="app__body">
            <section className="app__section">
                <p>Last smoked {daysSmoked.length > 0 ? daysSmoked : 0} days ago</p>
                <label>Stopped smoking at: </label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </section>
        </div>
    )
}
