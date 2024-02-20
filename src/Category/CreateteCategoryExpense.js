import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateteCategoryExpense.css";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const CreateteCategoryExpense = ({ pstatusOfCategoryOperation }) => {
   const user = useSelector((state) => state.user);
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm();;
    const onSubmit = (data) => {
        createNewcategory(data.abc);
        reset();
    };
    const createNewcategory = async (categoryName) => {
        try {
            const newCategory = {

                "categoryname": categoryName,
                "userid": user.user.id
            }
            const responce = await fetch("http://localhost:4000/category/createCategoryByUserId/",
                {
                    method: "POST",
                    body: JSON.stringify(newCategory),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const data = await (responce.json());
            pstatusOfCategoryOperation(data);
            //console.log(data.status);

        } catch (error) {
            //console.error("Error in createNewcategory:", error);
        }
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