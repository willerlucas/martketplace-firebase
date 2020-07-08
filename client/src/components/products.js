import React,{useState,useEffect} from "react";
import productsForm from "./productsForm";
import firebaseDb from "../firebase";
import "./Cards.css"
const { default: ProductsForm } = require("./productsForm")

const Products = () => {
    
    var [values, setValues] = useState({})
    var [productsObjects, setProductsObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    var list = Object.keys(productsObjects)
    
    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    useEffect(() => {
        firebaseDb.child('products').on('value', snapshot => {
            if (snapshot.val() != null)
                setProductsObjects({
                    ...snapshot.val()
                })
            else
                setProductsObjects({})
        })
    }, [])

    const AddOrEdit = obj => {
        if(currentId == '')
            firebaseDb.child('products').push(
                obj, 
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('') 
                }
            )
        else    
            firebaseDb.child(`products/${currentId}`).set(
                obj, 
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')            
                    }
            )
    }

    const onDelete = key => {
        if(window.confirm('Are you sure to delete this product?'))
            firebaseDb.child(`products/${key}`).remove(
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')            
                    }
            )
    }

    return(
        <>
            <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4  text-center">Product Register</h1>
                    </div>
                </div>
                
                    <div>
                        <ProductsForm {...({ AddOrEdit, currentId, productsObjects })}/>
                    </div>
                    <form>
                    <div className="form-row">
                        <div className="form-group input-group col-md-12">
                            <input className="form-control" placeholder="Search Product" name="search"
                             value={values.search} onChange={handleInputChange}/>
                        </div>
                    </div>
                </form>
                    <div className="grid">

                                {
                                   
                                    list.map(id => {
                                        return <div class="cards" key={id}>
                                        <img src={productsObjects[id].image} class="card-img-top" alt="..."></img>
                                        <div class="card-body">
                                        
                                          <div className="row">
                                              <h2 class="card-title">{productsObjects[id].productName}</h2> 
                                              <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-primary" onClick={() => { onDelete(id) }}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                          </div>
                                            <h5>Amount: {productsObjects[id].amount} | Price: ${productsObjects[id].price}</h5>                  
                                                
                                        </div>
                                      </div>
                                        
                    
                                    })
                                }
                </div>
                



        </>
    );
}

export default Products;