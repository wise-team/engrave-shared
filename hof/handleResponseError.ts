import {Request, Response} from 'express'
import {validationResult} from "express-validator/check";
import * as HttpStatus from 'http-status-codes';

async function checkValidation(req: Request) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return Promise.reject({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            body: {
                error: errors.array()
            }
        })
    }
}

export async function handleResponseError(handler: any, req: Request, res: Response) {
    try {
        await checkValidation(req);
        return await handler(req, res);
    } catch (error) {
        const {
            statusCode,
            body,
            response
        } = error;

        if (!statusCode){
            return res.status(500).json({error: error.toString().replace(/"|error:/g, '')});
        }

        if (response) {
            return res.status(response.statusCode).json(response.body);
        } else {
            return res.status(statusCode).json(body);
        }

    }
}