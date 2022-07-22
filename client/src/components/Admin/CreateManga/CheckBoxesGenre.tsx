
const CheckBoxesGenre = ({ state, handle, allGenre }: any) => {
    return (
        <div>
          <ul className="toppings-list">
            {allGenre.map((e :any, index : number) :any => {
              return (
                <li key={`check_box_genre_${index}`}>
                  <div >
                    <div >
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={e}
                        value={e}
                        checked={state[index]}
                        onChange={() => handle(index)}
                      />
                      <label>{e}</label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        )
}

export default CheckBoxesGenre