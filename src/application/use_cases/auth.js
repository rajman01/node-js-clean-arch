import User from "../../entities/user";
import APITokenUseCase from "./apiToken.js";

export default class AuthUseCase {
    constructor({ logger, userRepository, authService, cryptService, apiTokenCache }) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.cryptService = cryptService;
        this.logger = logger;
        this.apiTokenUseCase = new APITokenUseCase({ logger, apiTokenCache});
    }

    async authenticate(token, apiToken) {
        let data = await this.authService.verifyToken(token);

        if (!data) {
            throw new Error("Invalid token");
        }

        data = this.cryptService.decrypt(data);

        const { id } = data;

        if (!id) {
            throw new Error("Invalid token");
        }

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Invalid token");
        }

        const apiTokenData = await this.apiTokenUseCase.validateToken(apiToken);
        if (!apiTokenData) {
            throw new Error("Invalid api token");
        }

        if (apiTokenData.user_id !== id) {
            throw new Error("Invalid api token");
        }

        return user;
    }

    async login(userData) {
        // TODO: Validate user data, using a library like Joi or validate.js

        const { email, password } = userData;

        // get user by email
        const user = await this.userRepository.findOne({ email }, { select: "+password" });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // check if password is correct
        const isValidPassword = await this.authService.comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        // generate token
        const token = await this.authService.generateToken(this.cryptService.encrypt({ id: user._id.toString() }));

        // generate api token
        const apiToken = await this.apiTokenUseCase.createToken({ user_id: user._id.toString() })

        // remove password from user object
        Reflect.deleteProperty(user, "password");

        return { user, token, api_token: apiToken };
    }
}
