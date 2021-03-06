export default (error: string): string => {
    switch(error) {
        case ERRORS.WRONG_EMAIL:
            return "грешен имейл";
        case ERRORS.DUPLICATE_EMAIL:
            return "вече има такъв регистриран имейл";
        case ERRORS.EMPTY_EMAIL:
            return "моля въведете имейл";
        case ERRORS.SHORT_EMAIL:
            return "имейлът е твърде къс";
        case ERRORS.INVALID_EMAIL:
            return "моля въведете валиден имейл";
        case ERRORS.LONG_EMAIL:
            return "имейлът е прекалено дълъг";
        case ERRORS.WRONG_PASSWORD:
            return "грешна парола";
        case ERRORS.SHORT_PASSWORD:
            return "паролата е твърде къса";
        case ERRORS.LONG_PASSWORD:
            return "паролата е твърде дълга";
        case ERRORS.EMPTY_PASSWORD:
            return "моля въведете парола";
        case ERRORS.WRONG_EMAIL_OR_PASSWORD:
            return "грешно име или парола";
        case ERRORS["INVALID_PASSWORD"]:
            return "грешна парола"; 
        default:
            return "нещо се обърка, моля, опитайте да рестартирате браузъра";  
    }
}
export enum ERRORS {
    // DIFFERENT IN REGISTER
    "WRONG_EMAIL" = "Wrong email or password",
    "DUPLICATE_EMAIL" = "",
    // LOGIN
    "EMPTY_EMAIL" = `"email" is not allowed to be empty`,
    "SHORT_EMAIL" = `"email" length must be at least 5 characters long`,
    "INVALID_EMAIL" = `"email" must be a valid email`,
    "LONG_EMAIL" = `"email" length must be less than or equal to 255 characters long`,
    "WRONG_PASSWORD" = "Wrong email or password",
    "SHORT_PASSWORD" = `"password" length must be at least 10 characters long`,
    "LONG_PASSWORD" = `"password" length must be less than or equal to 255 characters long`,
    "EMPTY_PASSWORD" = `"password" is not allowed to be empty`,
    "INVALID_PASSWORD" = `Invalid Password`,
    "WRONG_EMAIL_OR_PASSWORD"="Wrong email or password"
}