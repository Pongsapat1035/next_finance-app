export const getTransectionLists = (rawData) => {
    const convertResponse = JSON.parse(rawData)
    convertResponse.forEach(element => {
        element.data.amout = parseInt(element.data.amout)
        element.data.timeStamp = element.data.createdDate.seconds
    });
    return convertResponse
}

export const getMonthText = (recievedDate) => {
    const date = new Date(recievedDate)
    const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    return getMonth
}