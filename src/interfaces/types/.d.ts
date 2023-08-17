interface Request extends Express.Request {
    context: Record<string, any>;
}