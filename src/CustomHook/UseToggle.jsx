import React, { useState } from 'react'


const useToggle = () => {
    const[value,setValue]=useState(false)
    const toggleValue = () => { setValue(value =>!value)}
    return[value,toggleValue]

}
export default useToggle

 

