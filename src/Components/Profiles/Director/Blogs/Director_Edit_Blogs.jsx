import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function EditBlog() {
    const navigate = useNavigate();
    const location = useLocation();
    const blogId = location.pathname.split("/")[3];
    const { user } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [serviceChoice, setServiceChoice] = useState("");
    const [error, setError] = useState(null);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        setLoading(true);

        const fetchBlogAndServices = async () => {
            try {
                const blogResponse = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                    { withCredentials: true, validateStatus: () => true }
                );
                
                console.log(blogResponse);
                
                if (blogResponse.status === 200) {
                    setBlog(blogResponse.data.User);
                    setServiceChoice(blogResponse.data.User.Service?.id || "");
                } else if (blogResponse.status === 401) {
                    Swal.fire("Error", "Please log in again", "error");
                    navigate("/Login");
                } else {
                    setError(blogResponse.data.message);
                }

                const servicesResponse = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services`,
                    { withCredentials: true }
                );

                if (servicesResponse.status === 200) {
                    setServices(servicesResponse.data.Services);
                } else if (servicesResponse.status === 401) {
                    Swal.fire("Error", "Please log in again", "error");
                    navigate("/Login");
                } else {
                    setError(servicesResponse.data.message);
                }
            } catch (fetchError) {
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndServices();
    }, [user.id, user.companyId, blogId, navigate]);

    const handleEditBlog = async (values, { setSubmitting }) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                values,
                { withCredentials: true }
            );

            if (response.status === 200) {
                Swal.fire("Success", "Blog updated successfully", "success");
                navigate(`/Director/Blogs/${blogId}`);
            } else {
                Swal.fire(
                    "Error",
                    response.data.message || "An error occurred",
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

    if (!blog) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">Blog not found</div>
                <Link to="/Director/Blogs">
                    <button className="bg-blue_v py-2 px-4 mt-4 rounded-2xl text-white font-semibold">
                        Return to Blog List
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex text-right">
            <div className="w-full overflow-y-auto py-12 bg-white flex flex-col items-center justify-center">
                <div className="w-[80%] text-black">
                    <h2 className="text-3xl font-semibold mb-6">Edit Blog</h2>
                    <Formik
                        initialValues={{
                            Title: blog.Title || "",
                            Description: blog.Description || "",
                            ownerId: blog.ownerId || user.id,
                            ownerType: blog.ownerType || "Director", // Assuming ownerType is "Director"; adjust if necessary
                            companyId: blog.companyId || user.companyId,
                            serviceId: blog.Service?.id || "",
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
                            handleEditBlog(values, { setSubmitting });
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="flex flex-col gap-4">
                                <div>
                                    <label className="font-semibold text-sm">
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
                                    <label className="font-semibold text-sm">
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
                                <div className="flex gap-4 items-center">
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
                                        <Field
                                            as="select"
                                            name="serviceId"
                                            value={serviceChoice}
                                            onChange={(e) => {
                                                setServiceChoice(
                                                    e.target.value
                                                );
                                                setFieldValue(
                                                    "serviceId",
                                                    e.target.value
                                                );
                                            }}
                                            className="border p-2 rounded-md text-sm"
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
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Updating..."
                                        : "Update Blog"}
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

export default EditBlog;
