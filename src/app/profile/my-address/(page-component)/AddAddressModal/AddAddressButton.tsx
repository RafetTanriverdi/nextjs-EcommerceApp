import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import AddAddressModal from './AddAddressModal'

const AddAddressButton = () => {
    const [open, setOpen] = useState(false)
  return (
    <>
    <AddAddressModal setOpen={setOpen} open={open}/>
   <Button variant='default' onClick={()=>setOpen(!open)}>
    Add New Address
   </Button>
    </>
  )
}

export default AddAddressButton