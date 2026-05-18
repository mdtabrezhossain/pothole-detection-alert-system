import type { Request, Response, NextFunction } from "express";

export function errorHandler(error: Error, request: Request, response: Response, nextFunc: NextFunction) {
    console.error(error);

    return response
        .status(500)
        .json({ message: "internal server error" });
}