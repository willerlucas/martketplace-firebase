import React,{useState,useEffect} from "react";

const ProductsForm = (props) => {
const initialFieldValues ={
    productName:'',
    amount:'',
    price:'',
    image:'',
    search:''
}


var [values, setValues] = useState(initialFieldValues)

useEffect(() => {
    if(props.currentId == '')
        setValues({
            ...initialFieldValues
        })
    else
        setValues({
            ...props.productsObjects[props.currentId]
        })
},[props.currentId, props.productsObjects])

const handleInputChange = e => {
    var {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
}

const handleFormSubmit = e => {        
        e.preventDefault();
        props.AddOrEdit(values)
}



    return(
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepand">
                        <div className="input-group-text">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Product Name" name="productName" 
                    value={values.productName} onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepand">
                        <div className="input-group-text">
                            <i className="fas fa-image"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Image Link" name="image"  alt=" "
                    value={values.image} onChange={handleInputChange}/>
                </div>
            
                <div class="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepand">
                        <div className="input-group-text">
                            <i className="fas  fa-sort"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Product Amount" name="amount" type="number"
                    value={values.amount} onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepand">
                        <div className="input-group-text">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Price" name="price" type="number"
                    value={values.price} onChange={handleInputChange}/>
                </div>
                </div>
                <div className="form-group">
                    <input type="submit" value={props.currentId=='' ? "Save" : "Update"} className="btn btn-primary btn-block"/>
                </div>
                <hr></hr>
               
                </form>
    );
}

export default ProductsForm;