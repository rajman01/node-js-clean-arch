export default class User {
    constructor({ first_name, last_name, email, phone, password, role, status, status_reason }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.status = status;
        this.status_reason = status_reason;
    }

    toObject() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            role: this.role,
            status: this.status,
            status_reason: this.status_reason,
        };
    }

    static createRules() {}

    static updateRules() {}

    static loginRules() {}

    static CUSTOMER = "customer";
    static ADMIN = "admin";
}
