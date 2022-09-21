import React, {useState, useEffect} from "react"
import { View } from "./components/View";

//getting values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('cars');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [cars, setCars]= useState([getDatafromLS()]);

  //input field states
  const [car_name, setCarName]= useState('');
  const [brand, setBrand]= useState('');
  const [color, setColor]= useState('');
  const [price, setPrice]= useState('');

  //form submit event
  const handleAddCarSubmit=(e)=>{
    e.preventDefault();

    //creating an object
    let car={
      car_name,
      brand,
      color,
      price
    }
    setCars([...cars, car]);
    setCarName('');
    setBrand('');
    setColor('');
    setPrice('');
  }

  //delete from LS
  const deleteCar=(car_name)=>{
    const filteredCars=cars.filter((element,index)=>{
      return element.car_name !== car_name
    })
    setCars(filteredCars);
  }

  //saving data to local storage
  useEffect(()=>{
    localStorage.setItem('cars', JSON.stringify(cars));
  },[cars])

  return(
    <div className="wrapper">
      <div className="main">
        <div className="form-container">
          <form autoComplete="off" className="form-group"
          onSubmit={handleAddCarSubmit}>
            <label>Car Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setCarName(e.target.value)} value={car_name}></input>
            <label>Brand</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setBrand(e.target.value)} value={brand}></input>
            <label>Color</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setColor(e.target.value)} value={color}></input>
            <label>Price</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className="btn btn-secondary btn-md">
              Add Car
            </button>
          </form>
        </div>

        <div className="view-container">
          {cars.length>0&&<>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Car Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              
                <View cars={cars} deleteCar={deleteCar}/>
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger btn-md" 
          onClick={()=>setCars([])}>Remove All</button>
          </>}
          {cars.length <1 && <div>No cars added.</div>}
        </div>
      </div>
    </div>
  )
}

export default App;