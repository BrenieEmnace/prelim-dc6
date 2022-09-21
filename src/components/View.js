import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({cars, deleteCar}) => {
    return cars.map(car=>(
        <tr key={car.car_name}>
            <td>{car.car_name}</td>
            <td>{car.brand}</td>
            <td>{car.color}</td>
            <td>{car.price}</td>
            <td className='delete-btn' onClick={()=>deleteCar(car.car_name )}>
                <Icon icon={trash}/>
            </td>
        </tr>
    ))
}