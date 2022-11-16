import React, { useState } from 'react'
import "../css/cafeteria.css"
import { CheckCafeteriaData, RegisterCafeteria } from '../services/cafeteria.service'

export default function Cafeteria({ set, setMenuList, menuList }){

    const [name,setName]=useState(null)
    const [location,setLocation]=useState(null)
    const [img,setImg]=useState(null)
    const [openTime,setOpenTime]=useState(null)
    const [closeTime,setCloseTime]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [item,setItem]=useState("")
    const [price,setPrice]=useState("")

    const handleCafeteriaSubmit = async(event,set) => {
        event.preventDefault()
        const res=CheckCafeteriaData(name,location,img,openTime,closeTime,menuList)
        if(res===false) return
        setIsLoading(true)
        await RegisterCafeteria(name,location,img,openTime,closeTime,menuList).then(res=>{
            setIsLoading(false)
            set(false)
            setMenuList([])
            alert("Cafeteria successfullly registered")
            return
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
            alert("Some error occured! Please try again")
            return
        })
    }

    const handleAddItem = (event) => {
        event.preventDefault()
        if(!item||!price)
        {
            alert("Food item data not filled!!")
            return
        }
        if(isNaN(price))
        {
            alert("Price of food item is not a number!")
            return
        }
        console.log(document.getElementsByClassName('form-input-quaternary').value)
        document.getElementsByClassName('form-input-quaternary').value=null
        
        const data={
            title:item,
            price:price
        }
        setMenuList([...menuList,data])
        setItem("")
        setPrice("")
    }

    return(
        <div className='form-container'>
            <form>
                <h2 id='container-title'>Register new cafeteria</h2>
                <h3 className='form-input-text-primary'>Name</h3>
                <input type={"text"} className='form-input-primary' placeholder='Cafeteria Name' onChange={(text)=>setName(text.target.value)} />
                <h3 className='form-input-text-primary'>Location</h3>
                <input type={"text"} className='form-input-primary' placeholder='Location' onChange={(text)=>setLocation(text.target.value)}  />
                <h3 className='form-input-text-primary'>Select an image</h3>
                <input type={"file"} className='form-input-secondary' placeholder='Select File' onChange={(text)=>setImg(text.target.files[0])}  />
                <h3 className='form-input-text-primary'>Timings of cafeteria</h3>
                <div style={{display:"flex",marginLeft:"10%"}}>
                    <input type={"time"} className='form-input-tertiary' placeholder='Open at' onChange={(text)=>setOpenTime(text.target.value)}  />
                    <h5 style={{margin:4}}>to</h5>
                    <input type={"time"} className='form-input-tertiary' placeholder='Closes at' onChange={(text)=>setCloseTime(text.target.value)}  />
                </div>
                <h3 className='form-input-text-primary'>Add food item</h3>
                <div style={{display:"flex",marginLeft:"10%"}}>
                    <div style={{display:"flex",flexDirection:"column",width:110}}>
                        <h3 className='form-input-text-secondary'>Item name</h3>
                        <input type={"text"} placeholder='Item name' className='form-input-quaternary' value={item} onChange={(text)=>setItem(text.target.value)} />
                    </div>
                    <div style={{display:"flex",flexDirection:"column",width:110}}>
                        <h3 className='form-input-text-secondary'>Item Price</h3>
                        <input type={"text"} placeholder='Price ₹' className='form-input-quaternary' value={price} onChange={(text)=>setPrice(text.target.value)} />
                    </div>
                    <div style={{display:"flex",flexDirection:"column",width:110, justifyContent:"center"}}>
                        <button className='quaternary-btn' onClick={(event)=>handleAddItem(event)} >Done</button>
                    </div>
                </div>
                {isLoading?
                    (   
                        <p style={{textAlign:"center",marginTop:"5%"}}>Request processing...</p>
                    ):
                    (
                        <div className='container-btns'>
                            <button className='tertiary-btn' onClick={()=>set(false)} >Back</button>
                            <input className='tertiary-btn' type={"reset"} onClick={()=>setMenuList([])} />
                            <button className='tertiary-btn' onClick={(event)=>handleCafeteriaSubmit(event,set)}>Submit</button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}