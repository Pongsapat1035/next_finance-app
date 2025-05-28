    export const getTransectionLists = (rawData) => {
        const convertResponse = JSON.parse(rawData)
        convertResponse.forEach(element => {
            element.data.amout = parseInt(element.data.amout)
            element.data.timeStamp = element.data.createdDate.seconds
        });
        return convertResponse
    }

    export const getYearAndMonthText = (recievedDate) => {
        const date = new Date(recievedDate * 1000)
        const getMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        return getMonth
    }