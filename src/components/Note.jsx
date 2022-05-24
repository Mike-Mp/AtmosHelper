
export default function Note({note, setItemNote}) {
    return (
        <div className="note">
            <div className="note__header">
            </div>
            <div className="note__body">
                {note}

                <button onClick={() => setItemNote({note, show: false})}>X</button>
            </div>
        </div>
    )
}