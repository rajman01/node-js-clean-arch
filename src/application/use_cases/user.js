import User from "../../entities/user";

export default class UserUseCase {
    constructor({ logger, userRepository, authService }) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async createUser(userData) {
        // TODO: Validate user data, using a library like Joi or validate.js

        const { email } = userData;

        // check if user email already exists
        const checkEmail = await this.userRepository.findOne({ email });
        if (checkEmail) {
            throw new Error("Email already exists");
        }

        userData.password = await this.authService.hashPassword(userData.password);

        const user = new User(userData);

        return this.userRepository.create(user.toObject());
    }
}
