const getStartAndEndOfTheDay = () => {
    const currentDate = new Date()
    const startOfTheDay = new Date(`${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} - ${currentDate.getDate()}`)
    const endOfTheDay = new Date(`${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} - ${currentDate.getDate() + 1}`)

    return {startOfTheDay, endOfTheDay} 
}

module.exports = getStartAndEndOfTheDay