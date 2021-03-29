const valiatePassword = (pass) => {
    console.log(pass);
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
}


module.exports = {
    valiatePassword,
}