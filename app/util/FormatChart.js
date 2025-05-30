export function ChangeFormatChartData(recieveData, maxItemOnChart = 4) {
    const result = {}

    recieveData.forEach(element => {
        if (element.type === 'expend') {
            result[element.category] = (result[element.category] || 0) + element.amout
        }
    });

    // convert to array
    let convertResult = Object.entries(result).map((item, index) => {
        return { id: index, value: item[1], name: item[0], label: item[0] }
    });

    // sort by descending
    const sortedResult = convertResult.sort((a, b) => b.value - a.value)
    const highestLists = sortedResult.slice(0, maxItemOnChart)

    highestLists.forEach((item, index) => item.color = chartColors[index])

    return highestLists
}

export const chartColors = ['#705772', '#F38181', '#FAD284', '#A9EEC2', '#B4EBE6', '#FFCDB2']