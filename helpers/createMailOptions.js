const {EMAIL} = process.env

const createMailOptions = (userEmail, password) => {
    return {
        from: EMAIL,
        to: userEmail,
        subject: "Congratulations! You successfully changed your password",
        text: `Your new password:  ${password}`
    }
}

module.exports = createMailOptions