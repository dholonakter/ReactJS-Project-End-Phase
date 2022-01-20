import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { getProducts, editUser, editProdcut } from '../Service/api';

const initialValue = {
    name: '',
    description: '',
    price: '',
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditProduct = () => {
    const [prodcut, setProduct] = useState(initialValue);
    const { name,description,price } = prodcut;
    const { id } = useParams();
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        loadProductDetails();
    }, []);

    const loadProductDetails = async() => {
        const response = await getProducts(id);
        setProduct(response.data);
    }

    const editProdctDetails = async() => {
        const response = await editProdcut(id, prodcut);
        history.push('/all');
    }

    const onValueChange = (e) => {
        setProduct({...prodcut, [e.target.name]: e.target.value})
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Product</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">ProductName</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={description} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">price</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
          
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editProdctDetails()}>Edit Product</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditProduct;