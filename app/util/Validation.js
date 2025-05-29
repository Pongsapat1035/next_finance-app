export const validateTransectionForm = (formData)=>{
    const { description, amout, category } = formData
    const descriptionRegex = /^.+$/
    const amoutRegex = /^(?:[1-9]\d*)$/

    const errorMsg = {
        description: "",
        amout: "",
        category: ""
    }

    if(!descriptionRegex.test(description)) errorMsg.description = "Description can't be empty"
    if(!amoutRegex.test(amout)) errorMsg.amout = "Amout can't be 0 or negative number"
    if(category === 'select category' || category === "") errorMsg.category = "Please select cetegory"
    
    return errorMsg
}