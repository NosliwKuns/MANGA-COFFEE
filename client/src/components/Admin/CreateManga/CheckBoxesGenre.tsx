import "../../../scss/User/FormsAdmin.scss"
const CheckBoxesGenre = ({ state, handle, allGenre }: any) => {
    return (
        <div className="container_check_box_genre_create">
          <ul className="toppings-list">
            {allGenre.map((e :any, index : number) :any => {
              return (
                <li key={`check_box_genre_${index}`}>
                  <div >
                    <div >
                      <input
                      className="check_box_forms_admin_interface"
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={e}
                        value={e}
                        checked={state[index]}
                        onChange={() => handle(index)}
                      />
                      <label className="check_box_forms_admin_interface_label">{e}</label>
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