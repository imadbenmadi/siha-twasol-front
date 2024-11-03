import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function AddBlog() {
    const navigate = useNavigate();
    const { user } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services`,
                    { withCredentials: true, validateStatus: () => true }
                );
                if (response.status === 200) {
                    setServices(response.data.Services);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
                    navigate("/Login");
                } else {
                    setError(
                        response.data.message || "Failed to fetch services."
                    );
                }
            } catch (fetchError) {
                setError("Error fetching services. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [user.id, user.companyId, navigate]);

    const handleAddBlog = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs`,
                values,
                { withCredentials: true, validateStatus: () => true }
            );
            if (response.status === 201) {
                Swal.fire("Success", "Blog added successfully", "success");
                navigate("/Director/Blogs");
            } else {
                Swal.fire(
                    "Error",
                    response.data.message || "Failed to add blog",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex text-right">
            <div className="w-full py-12 bg-white flex flex-col items-center">
                <div className="w-[80%] text-black">
                    <h2 className="text-3xl font-semibold mb-6">
                        Add New Blog
                    </h2>

                    <Formik
                        initialValues={{
                            Title: "",
                            Description: "",
                            ownerId: user.id,
                            ownerType: "Director", // Assuming ownerType is "Director"; adjust if necessary
                            companyId: user.companyId,
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.Title)
                                errors.Title = "Title is required";
                            if (!values.ownerId)
                                errors.ownerId = "Owner ID is required";
                            if (!values.ownerType)
                                errors.ownerType = "Owner Type is required";
                            if (!values.companyId)
                                errors.companyId = "Company ID is required";
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleAddBlog(values, { setSubmitting });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col gap-4 text-sm md:text-lg text-black">
                                <div>
                                    <label className="font-semibold text-sm pb-1">
                                        Title
                                    </label>
                                    <Field
                                        type="text"
                                        name="Title"
                                        placeholder="Blog Title"
                                        disabled={isSubmitting}
                                        className="w-full border px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="Title"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold text-sm pb-1">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="Description"
                                        placeholder="Blog Description"
                                        disabled={isSubmitting}
                                        className="w-full border px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="Description"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    {services.length === 0 ? (
                                        <div className="text-center">
                                            <Link
                                                to="/Director/Services/Add"
                                                className="bg-blue_v text-white px-4 py-2 rounded-lg"
                                            >
                                                Add Service
                                            </Link>
                                            <p className="text-gray_v mt-2">
                                                No services available
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="w-full">
                                            <label className="font-semibold text-sm pb-1">
                                                Select Service
                                            </label>
                                            <Field
                                                as="select"
                                                name="serviceId"
                                                className="border p-2 w-full rounded-md text-sm"
                                            >
                                                <option value="">
                                                    Select Service
                                                </option>
                                                {services.map((service) => (
                                                    <option
                                                        key={service.id}
                                                        value={service.id}
                                                    >
                                                        {service.Name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Adding..." : "Add Blog"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};

export default AddBlog;
