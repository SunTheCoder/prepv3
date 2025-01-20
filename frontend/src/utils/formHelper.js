export const handleInputChange = (e, setForm) => {
    setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
    }));
};
