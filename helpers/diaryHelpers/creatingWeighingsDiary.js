const getStartAndEndOfTheDay = require("../getStartAndEndOfDay")
const getOrCreateDiary = require("./getOrCreateDiary")


const creatingWeighingsDiary = async (owner, newWeighing, WeighingsDiary, Weighing) => {
    const {startOfTheDay, endOfTheDay} = getStartAndEndOfTheDay()

    let updatedWeighingsByDate

    let wasCreatedNewWeighing = false

    let weighing = await Weighing.findOne({owner, createdAt: { $gte: startOfTheDay, $lt: endOfTheDay }})

    const diary = await getOrCreateDiary(owner, WeighingsDiary)

    if(!weighing) {
        weighing = new Weighing({owner, weight: newWeighing})
        await weighing.save()
        wasCreatedNewWeighing = true
    }

    weighing = await Weighing.findOneAndUpdate(
        {owner, createdAt: { $gte: startOfTheDay, $lt: endOfTheDay}},
        {weight: newWeighing},
        {new: true}
    )

    if(wasCreatedNewWeighing) {
        updatedWeighingsByDate = {
            $push: {
                weighingsByDate: weighing
            }
        }
    }
    else {
        updatedWeighingsByDate = {
            $set: {
                [`weighingsByDate.${diary.weighingsByDate.length - 1}`] : weighing
            }
        }
    }

    await WeighingsDiary.findOneAndUpdate({owner}, updatedWeighingsByDate, {new: true})
}

module.exports = creatingWeighingsDiary