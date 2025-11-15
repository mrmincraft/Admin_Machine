const { identifyUser, authorizeAdmin } = require('../midleware/autorisation');
const jwt = require('../utile/token.js');
const dbUtile = require('../utile/dbUtille.js');
const HttpError = require('../utile/httpError.js');

// Mock external dependencies
jest.mock('../utile/token.js');
jest.mock('../utile/dbUtille.js');

describe('identifyUser middleware', () => {

    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {};
        next = jest.fn();
    });

    test('should return 401 if no token provided', () => {
        identifyUser(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const error = next.mock.calls[0][0];
        expect(error.status).toBe(401);
        expect(error.message).toBe('No token provided');
    });

    test('should return 401 if token invalid', () => {
        req.headers.authorization = 'Bearer invalidtoken';

        jwt.verifyToken.mockReturnValue(null); // Simulate invalid token

        identifyUser(req, res, next);

        const error = next.mock.calls[0][0];
        expect(error.status).toBe(401);
        expect(error.message).toBe('Invalid token');
    });

    test('should return 404 if user not found', () => {
        req.headers.authorization = 'Bearer validtoken';

        jwt.verifyToken.mockReturnValue({ id: 123 });
        dbUtile.findUserById.mockReturnValue(null);

        identifyUser(req, res, next);

        const error = next.mock.calls[0][0];
        expect(error.status).toBe(404);
        expect(error.message).toBe('User not found');
    });

    test('should attach user and call next() on success', () => {
        req.headers.authorization = 'Bearer validtoken';

        const mockUser = { id: 123, levelAccess: 'user' };

        jwt.verifyToken.mockReturnValue({ id: 123 });
        dbUtile.findUserById.mockReturnValue(mockUser);

        identifyUser(req, res, next);

        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalledWith(); // no error
    });
});

describe('authorizeAdmin middleware', () => {

    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {};
        next = jest.fn();
    });

    test('should return 401 if user not identified', () => {
        authorizeAdmin(req, res, next);

        const error = next.mock.calls[0][0];
        expect(error.status).toBe(401);
        expect(error.message).toBe('User not identified');
    });

    test('should return 403 if user is not admin', () => {
        req.user = { levelAccess: 'user' };

        authorizeAdmin(req, res, next);

        const error = next.mock.calls[0][0];
        expect(error.status).toBe(403);
        expect(error.message).toBe('Admin access required');
    });

    test('should call next if user is admin', () => {
        req.user = { levelAccess: 'admin' };

        authorizeAdmin(req, res, next);

        expect(next).toHaveBeenCalledWith();
    });
});