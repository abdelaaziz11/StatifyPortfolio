import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Navbar from '../Component/Navbar/Navbar';
import { useForm } from 'react-hook-form'

const CreateRecipePage = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const createRecipe = (data) => {
        console.log(data)

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        console.log(token)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)

        }
        fetch('/recipe/recipes', requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            reset()
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        <Navbar/>
        
        <div className="container">
            <h1>Create Form</h1>
            <br></br>
            <form>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="full name"
                    {...register("title", { required: true, maxLength: 25})}
                    />
                </Form.Group>
                    {errors.title && <p><small style={{ color: 'red' }}>Title is required</small></p>}
                {errors.title?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Title should be less than 25 characters</small>
                </p>}
                <br></br>
                
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="address"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Form.Label>CNI</Form.Label>
                    <Form.Control type="textarea" row={5}
                    placeholder="CNI"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Form.Label>Birthday Date</Form.Label>
                    <Form.Control type="date" row={5} 
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Form.Label>Sexe</Form.Label>
                    <Form.Control type="textarea" row={5} placeholder="sexe"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(createRecipe)}>Save</Button>
                </Form.Group>
                <Form.Group></Form.Group>
            </form>
        </div>
        </>
    )

}

export default CreateRecipePage;