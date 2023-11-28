class User {
    constructor({ first_name, last_name, email, phone, password }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    toObject() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone,
            password: this.password,
        };
    }
}

export default User;
