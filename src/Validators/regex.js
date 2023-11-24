 const testEmail = (value) => {
    const emailPattent = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattent.test(value)
}

const testPhone = (value) => {
    const phonePattent = /^09\d{9}$/
    return phonePattent.test(value)
}


export default { testEmail, testPhone }