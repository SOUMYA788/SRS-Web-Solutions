import { toast } from "react-toastify";

export const showErrorToast = (message) => {
    return toast.error(message, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

export const showSuccessToast = (message) => {
    return toast.success(message, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}