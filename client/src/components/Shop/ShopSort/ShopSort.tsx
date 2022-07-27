import { useState } from 'react'

type Props = {
  shopSort: string;
  setshopSort: React.Dispatch<React.SetStateAction<string>>;
}

const ShopSort = ({ shopSort, setshopSort }: Props) => {

  const [display, setDisplay] = useState('All')

  const sortBy = (value: string, text: string) => {
    setshopSort(value)
    setDisplay(text)
  }

  return (
    <div className='checkboxes'>
          <label htmlFor='item2' className='checkboxes_title'>
          {/* {colorF.length 
            ? colorF.map((t : any) => t).join(' , ')
            : 'Categories:'} */}
            Sort By: {display}
          </label>
          <input type='checkbox' name='checkboxes' id='item2'/>

          <div className='checkbox_content'>
            <div 
              className="select checkbox"
              onClick={() => sortBy('name', 'Alphabetical A-Z')}> 
              Alphabetical A-Z 
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('name,desc', 'Alphabetical Z-A')}>
              Alphabetical Z-A
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('price,desc', 'Price High to Low')}>
              Higher Price
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('price', 'Price Low to High')}>
              Lower Price 
            </div> 
        </div>
    </div>
    
  )
};

export default ShopSort;