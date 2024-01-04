import React from "react";
import ReactDOM from 'react-dom';
import { Form, useForm } from "react-hook-form";
import "./CreateteCategoryExpense.css";

const CreateteCategoryExpense = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    const createNewcategory = async () => {
        const newCategory = {

            "categoryname": "working",
            "userid": 3
        }
 await fetch("http://localhost:4000/category/createCategoryByUserId/",

        {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
}

return (
    <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="abc">Category :</label>
            <input {...register("abc", { required: true })}
                id="abc"
                placeholder="Enter Category" />
            {errors.abc && <span className="error-message">This reqired field</span>}
        </div>

        <button type="submit" onClick={createNewcategory}>submit</button>
    </form>
);
}
export default CreateteCategoryExpense;