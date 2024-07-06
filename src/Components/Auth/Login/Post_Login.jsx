import Swal from "sweetalert2";
import Axios from "axios";
async function handleLogin(values, { setSubmitting }) {
    try {
        let response = await Axios.post("http://localhost:3000/Login", values, {
            withCredentials: true,
            validateStatus: () => true,
        });

        if (response.status == 200) {
            if (response.data.userType == "Director") {
                window.location.href = `/Director`;
            } else if (response.data.userType == "Malad") {
                window.location.href = `/Malad`;
            } else if (response.data.userType == "Medecin") {
                window.location.href = `/Medecin`;
            } else if (response.data.userType == "Worker") {
                window.location.href = `/Worker`;
            } else window.location.href = `/`;
        } else if (response.status == 401) {
            setSubmitting(false);
            Swal.fire("Error!", "Username or Password isn't correct", "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire("Error!", `Something Went Wrong ,`, "error");
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire("Error!", `Something Went Wrong `, "error");
    }
    // setSubmitting(false);
}
export default handleLogin;
