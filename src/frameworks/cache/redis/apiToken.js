import APITokenCacheInterface from "../../../application/cache/apiToken.js";
import { redisClient } from "./client.js";

export default class APITokenCache extends APITokenCacheInterface {
    constructor({ logger, config }) {
        super({ logger, config });
        this.oneDayInSeconds = 60 * 60 * 24;
    }

    setToken({ token, exp = this.oneDayInSeconds, data }) {
        return new Promise((resolve, reject) => {
            redisClient.setex(`api_token_${token}`, exp, JSON.stringify(data), (error, reply) => {
                if (error) {
                    this.logger.error("Redis set error", error);
                    reject(error);
                }

                resolve(reply);
            });
        });
    }

    getToken(token) {
        return new Promise((resolve, reject) => {
            redisClient.get(`api_token_${token}`, (error, reply) => {
                if (error) {
                    this.logger.error("Redis get error", error);
                    reject(error);
                }

                resolve(JSON.parse(reply));
            });
        });
    }

    deleteToken(token) {
        return new Promise((resolve, reject) => {
            redisClient.del(`api_token_${token}`, (error, reply) => {
                if (error) {
                    this.logger.error("Redis delete error", error);
                    reject(error);
                }

                resolve(reply);
            });
        });
    }
}
