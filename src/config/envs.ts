import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number,
    PRODUCT_SERVICE_HOST: string,
    PRODUCT_SERVICE_PORT: number,
    ORDER_SERVICE_HOST: string,
    ORDER_SERVICE_PORT: number,
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
    ORDER_SERVICE_HOST: joi.string().required(),
    ORDER_SERVICE_PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productServiceHost: envVars.PRODUCT_SERVICE_HOST,
    productServicePort: envVars.PRODUCT_SERVICE_PORT,
    orderServiceHost: envVars.ORDER_SERVICE_HOST,
    orderServicePort: envVars.ORDER_SERVICE_PORT,
}