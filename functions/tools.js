const pattern = /[A-Za-z0-9!#@&]/;

export function checkSafeString(text) {

    if(text.includes('null') || text.includes('undefined')) {
        return false;
    }

    for(const letter of text) {
        if(!pattern.test(letter)){
            return false;
        }
    }

    return true;
}

export function generateToken() {
    const code = () => {
        return Math.random().toString(36).substring(2, 15);
    }

    return code() + "-" + code() + code();
}