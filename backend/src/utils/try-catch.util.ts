import type { Request, Response, NextFunction, RequestHandler } from "express";

export function tryCatchWrapper(func: RequestHandler) {
    return async function (request: Request, response: Response, nextFunc: NextFunction) {
        try {
            await func(request, response, nextFunc);
        } catch (error) {
            nextFunc(error);
        }
    };
}