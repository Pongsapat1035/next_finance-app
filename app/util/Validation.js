export const validateTransectionForm = (formData) => {
    const { description, amout, category } = formData
    const descriptionRegex = /^.+$/
    const amoutRegex = /^(?:[1-9]\d*)$/

    const errorMsg = {
        description: "",
        amout: "",
        category: ""
    }

    if (!descriptionRegex.test(description)) errorMsg.description = "Description can't be empty"
    if (!amoutRegex.test(amout)) errorMsg.amout = "Amout can't be 0 or negative number"
    if (category === 'select category' || category === "") errorMsg.category = "Please select cetegory"

    return errorMsg
}



export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") return "Please fill email input"
    if (!emailRegex.test(email)) return "Email is incorrect format (example@mail.com)"
    return null
}

export const validatePassword = (password) => {
    const hasLowerUpper = /(?=.*[a-z])(?=.*[A-Z])/;  // At least one lowercase and one uppercase letter
    const hasSpecialChar = /(?=.*[@$!%*?&_-])/;       // At least one special character
    const hasMinLength = /.{8,}/;                   // At least 8 characters long

    if (password === '')
        return "Password is empty"
    if (!hasLowerUpper.test(password))
        return "Password must contain at least one lowercase and one uppercase letter"
    if (!hasSpecialChar.test(password))
        return "Password must contain at least one special character"
    if (!hasMinLength.test(password))
        return "Password must at least 8 character"
    return null
}

export const validateText = (name) => {
    const nameRegex = /^[a-zA-Z0-9]+$/

    if (name === '') return "Required"
    if (!nameRegex.test(name)) return "using only letters (A-Z, a-z) and numbers (0-9). Spaces and special characters are not allowed."
    return null
}

export const validateNumber = (num) => {
    const numberRex = /^[1-9]\d*$/
    if (num === '') return "Required"
    if (!numberRex.test(num)) return "Please enter a valid positive number"
    return null
}

export const validateOnlyPlainString = () => {
    // not accept special character

}