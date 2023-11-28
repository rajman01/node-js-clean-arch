import AuthUseCase from "../../../application/use_cases/auth.js";

export default class AuthMiddleware {
    constructor(dependencies) {
        const { logger, databaseService: { userRepository }, cacheService: { apiTokenCache }, authService, cryptService, } = dependencies;
        this.logger = logger;
        this.authUseCase = new AuthUseCase({ logger, userRepository,  authService, cryptService, apiTokenCache });
    }

    async authenticate(req, res, next) {
        try {

        } catch (e) {
            this.logger.error(e);
        }
    }
}