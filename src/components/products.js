import React, { useState, useEffect } from "react";
// import productsForm from "./productsForm";
import firebaseDb from "../firebase";
import "./Cards.css"
const { default: ProductsForm } = require("./productsForm")

const Products = () => {

  //  var [values, setValues] = useState({})

    var [productsObjects, setProductsObjects] = useState({})

    //
    var [currentId, setCurrentId] = useState('')

    //recuperando os arquivos do nó produtos no firebase
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

    //PUSH e SET
    const AddOrEdit = obj => {
        //verifica se é um novo elemento (PUSH)

        if (currentId == '')
            firebaseDb.child('products').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            //caso não seja, faz o update (SET)
            firebaseDb.child(`products/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    //DELETE
    const onDelete = key => {
        if (window.confirm('Are you sure to delete this product?'))
            firebaseDb.child(`products/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    return (
        <>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4  text-center">Product Register</h1>
                </div>
            </div>

            <div>
                <ProductsForm {...({ AddOrEdit, currentId, productsObjects })} />
            </div>
            <div className="form-group input-group">
                <input className="form-control" placeholder="Search" name="search" alt=" "
                />
            </div>
            <form>
            </form>
            <div className="grid">

                {
                    //(READ)
                    Object.keys(productsObjects).map(id => {
                        return <div class="cards" key={id}>
                            <img src={productsObjects[id].image} class="topimg" alt="..." ></img>
                            <div class="card-body">

                                <div className="row">
                                    <h2 class="card-title">{productsObjects[id].productName}</h2>
                                </div>
                                <div className="row">
                                    <h5>Amount: {productsObjects[id].amount}</h5>
                                </div>
                                <div className="row">
                                    <h5>Price: ${productsObjects[id].price}</h5>
                                </div>
                                <div className="row">
                                    <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                        [Edit]
                                                </a>
                                    <a className="btn text-primary" onClick={() => { onDelete(id) }}>
                                        [Delete]
                                                </a>
                                </div>

                            </div>
                        </div>


                    })
                }
            </div>




        </>
    );
}

export default Products;