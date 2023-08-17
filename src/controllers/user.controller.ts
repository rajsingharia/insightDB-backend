import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UpdateUserDTO } from "../dto/request/updateUser.dto";
import { PasswordHash } from "../security/passwordHash";
import { Converter } from "../util/converters";
import { UserDTO } from "../dto/response/user.dto";
import createHttpError from "http-errors";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //console.log(req.body);
        const userId = req.body.userId;
        if(!userId) throw createHttpError(401, "User id is required");

        const user = await UserService.findUserById(userId);
        if(!user) throw createHttpError(404, "User not found");

        const response: UserDTO = Converter.UserEntityToUserDto(user);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id  = req.params.id;
        const body: UpdateUserDTO = req.body;

        if(body.password) {
            body.password = await PasswordHash.hashPassword(body.password);
        }

        const user = await UserService.updateUser(id, body);
        const response: UserDTO = Converter.UserEntityToUserDto(user);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await UserService.deleteUserById(id);
        const response: UserDTO = Converter.UserEntityToUserDto(user);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
}