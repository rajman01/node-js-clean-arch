import User from "../../entities/user.js";
import { BadRequestError } from "../../entities/error.js";

export default class UserUseCase {
    constructor({ logger, userRepository, authService, userValidator }) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.authService = authService;
        this.userValidator = userValidator;
    }

    async createUser(userData) {
        await this.userValidator.validateCreate(userData);

        const { email, role } = userData;
        if (!role) {
            userData.role = User.CUSTOMER;
        }

        // check if user email already exists
        const checkEmail = await this.userRepository.findOne({ email, role });
        if (checkEmail) {
            throw new BadRequestError("Email already exists");
        }

        userData.password = await this.authService.hashPassword(userData.password);

        const user = new User(userData);

        return this.userRepository.create(user.toObject());
    }
}
