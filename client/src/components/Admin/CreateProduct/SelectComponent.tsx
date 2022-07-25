
import { useAppDispatch } from "../../../app/hooks";

const SelectComponent = ({array , setState}:any) => {
  const dispatch = useAppDispatch();
  const onSubmitSelect = (e :any) => {
    e.preventDefault();
    console.log(e.target.value)
    setState(e.target.value)
  };

  return (
    <div>
      <label className="choose"> Choose a diet : </label>
      <select onChange={onSubmitSelect} >
        <option value="" >
          {"..."}
        </option>
        {array.map((e:string, i:number) => (
          <option key={`opc.${i}`} value={e} >
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
