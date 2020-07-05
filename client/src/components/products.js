import React,{useState,useEffect} from "react";
import productsForm from "./productsForm";
import firebaseDb from "../firebase";
const { default: ProductsForm } = require("./productsForm")

const Products = () => {

    var [productsObjects, setProductsObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

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
                        <h1 class="display-4  text-center">Products Register</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <ProductsForm {...({ AddOrEdit, currentId, productsObjects })}/>
                    </div>
                    <div className="col-md-7">
                        <table className="table table-borderless table-stripped">
                            <thead className="thead-light">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Image Link</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(productsObjects).map(id => {
                                        return <tr key={id}>
                                            <td>{productsObjects[id].productName}</td>
                                            <td>{productsObjects[id].price}</td>
                                            <td>{productsObjects[id].amount}</td>
                                            <td>{productsObjects[id].image}</td>
                                            <td>
                                                <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-primary" onClick={() => { onDelete(id) }}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
}

export default Products;