import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { PasswordHash } from "../security/passwordHash";
import { JWT } from "../security/jwt";
import { AuthenticationDTO } from "../dto/response/authentication.dto";
import { User } from "@prisma/client";
import { Converter } from "../util/converters";
import { RefreshTokenDto } from "../dto/request/refreshToken.dto";
import { RefreshTokenService } from "../services/refreshtoken.service";
import createHttpError from "http-errors";
import { RegisterDTO } from "../dto/request/register.dto";
import { LoginDTO } from "../dto/request/login.dto";


interface IRegisterRequest extends Request {
    body: RegisterDTO | undefined;
}

interface ILoginRequest extends Request {
    body: LoginDTO | undefined;
}

interface IRefreshTokenRequest extends Request {
    body: RefreshTokenDto | undefined;
}


export class AuthController {

    public static register = async (req: IRegisterRequest, res: Response, next: NextFunction) => {
        try {
            //data validation
            const body = req.body;

            if (!body) throw createHttpError(400, "Body is required");

            //check if user already exists
            const isAlreadyExists = await UserService.alreadyExists(body);
            if (isAlreadyExists) {
                throw createHttpError(409, "User already exists");
            }

            //hash password
            const hasedPassword = await PasswordHash.hashPassword(body.password);
            body.password = hasedPassword;

            //save user to db
            const user = await UserService.saveUser(body);

            const response = Converter.UserEntityToUserDto(user);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    public static login = async (req: ILoginRequest, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            if (!body) throw createHttpError(400, "Body is required");

            //check if user exists
            const user: User = await UserService.findUserByEmail(body.email);

            //compare password
            await PasswordHash.comparePassword(user.password, body.password);

            //generate token
            const { token, refreshToken } = await JWT.generateToken(user);

            //send response
            const userResponse = Converter.UserEntityToUserDto(user);
            const response: AuthenticationDTO = {
                token: token,
                refreshToken: refreshToken,
                user: userResponse
            }
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    public static refreshToken = async (req: IRefreshTokenRequest, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            //data validation
            if (!body) throw createHttpError(400, "Body is required");


            //check if jwt token is valid
            const isTokenValid = await JWT.validateToken(body.token);
            if (!isTokenValid) throw new Error("Invalid token");

            const jwtid = await JWT.getJwtIdFromToken(body.token);

            // check if the refresh token exists and is linked to the jwt token
            const isRefreshTokenExistsAndHasJwtId = await RefreshTokenService.isRefreshTokenExistsAndHasJwtId(body.refreshToken, jwtid);
            if (!isRefreshTokenExistsAndHasJwtId) throw new Error("Invalid refresh token");

            // check if the jwt token is expired
            const isTokenExpired = JWT.isTokenExpired(body.token);
            if (isTokenExpired) throw new Error("Token expired");

            // check if the refresh token is expired or used or invalidated
            const isRefreshTokenExpired = await RefreshTokenService.isRefreshTokenExpiredOrUsedOrInvalidated(body.refreshToken);
            if (isRefreshTokenExpired) throw new Error("Refresh token expired");
            // mark the refresh token as used

            await RefreshTokenService.markRefreshTokenAsUsed(body.refreshToken);

            // find the user in the database
            const userId = await JWT.getUserIdFromToken(body.token);
            const user = await UserService.findUserById(userId);

            // generate a fresh pair of tokens( jwt token and refresh token )
            const { token, refreshToken } = await JWT.generateToken(user);

            //send response
            const userResponse = Converter.UserEntityToUserDto(user);
            const response: AuthenticationDTO = {
                token: token,
                refreshToken: refreshToken,
                user: userResponse
            }

            // send response
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }


}
