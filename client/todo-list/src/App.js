import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
} from "mdb-react-ui-kit";
import './App.css'

export default function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database
  const addItem = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post('http://localhost:5500/api/item', {item: itemText});
         setListItems(prev => [...prev, res.data]);
         setItemText('');
      } catch (err) {
          console.log(err)
      }
  }

  //Create function to fetch all todo items from database
  useEffect(() => {
     const getItemsList = async () => {
        try {
           const res = await axios.get('http://localhost:5500/api/items');
           setListItems(res.data)
        } catch (err) {
          console.log(err)
        }
     } 

    getItemsList()
  },[])


  //Delete item when click on delete
  const deleteItem = async (id) => {
     try {
       const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
       const newListItems = listItems.filter(item => item._id !== id);
       setListItems(newListItems);
       console.log(res.data)
     } catch (err) {
         console.log(err)
     }
  }

  //Update Item
  const updateItem = async (e) => {
     e.preventDefault();
     try {
       const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText });
       console.log(res.data);
       const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
       const updatedItem = listItems[updatedItemIndex].item = updateItemText;
       setUpdateItemText('');
       setIsUpdating('');
     } catch (err) {
        console.log(err)
     }
  }

  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
      <div className="d-flex flex-row align-items-center">
      <form className="update-form" onSubmit={(e) => {updateItem(e)}}>
        <MDBInput className=" update-new-input" label='New Item'  type='text' onChange={e => {setUpdateItemText(e.target.value)}}  value={updateItemText}/>
        <MDBBtn className="update-new-btn" type="submit">Update</MDBBtn>
      </form>
      </div>
  )


  const createdDate = new Date().toLocaleDateString()

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
          >
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <MDBIcon fas icon="check-square" className="me-1" />
                <u>My Todo-s</u>
              </p>
              <div className="pb-2">
                <MDBCard>
                  <MDBCardBody>
                    <div className="d-flex flex-row align-items-center">
                      <form className="form" onSubmit={e => addItem(e)}>
                      <input
                        type="text"
                        className="form-control form-control-lg add-item"
                        id="exampleFormControlInput1"
                        placeholder="Add Todo Item"
                        onChange = {e => {setItemText(e.target.value)} }
                        value = {itemText}
                      />
                     
                        <MDBBtn className="add-btn" type="submit">Add</MDBBtn>
                      </form>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <hr className="my-4" />

            
              
              <MDBListGroup horizontal className="rounded-0 bg-transparent list-group">
                
              


                {
                  listItems.map((item) => (
                    <div className="group-item">
                      {
                         isUpdating === item._id
                         ? renderUpdateForm()
                         : <>
                              
                         <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                      {" "}
                      <p className="lead fw-normal mb-0">
                        {item.item}
                      </p>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                      <div className="d-flex flex-row justify-content-end mb-1">
                        <MDBTooltip
                          tag="a"
                          wrapperProps={{ href: "#!" }}
                          title="Update todo"
                        >
                         <button className="update-item" onClick={() => {setIsUpdating(item._id)}}>
                           <MDBIcon fas icon="pencil-alt" className="me-3" color="info" /> 
                          </button>

                        </MDBTooltip>
                        <MDBTooltip
                          tag="a"
                          wrapperProps={{ href: "#!" }}
                          title="Delete todo"
                        >
                        <button className="delete-item" onClick={() => {deleteItem(item._id)}}>
                          <MDBIcon fas icon="trash-alt" color="danger" />
                          </button>
                        </MDBTooltip>
                      </div>
                      <div className="text-end text-muted">
                        <MDBTooltip
                          tag="a"
                          wrapperProps={{ href: "#!" }}
                          title="Created date"
                        >
                           <p className="small text-muted mb-0">
                            <MDBIcon fas icon="info-circle" className="me-2" />
                            {createdDate}
                           </p>
                            </MDBTooltip>
                             </div>
                           </MDBListGroupItem>
                          </>
                      }
                  
                     </div>
    
                  ))
                }


      


              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}