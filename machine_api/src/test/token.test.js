const jwt = require('jsonwebtoken');
const jwtUtils = require('../utile/token');

describe('JWT Utility Functions', () => {
    const SECRET = 'testsecret';
    const USER_ID = 123;

    beforeAll(() => {
        process.env.JWT_SECRET = SECRET;
    });

    describe('create()', () => {
        test('should create a valid JWT token', () => {
            const token = jwtUtils.create(USER_ID);

            expect(typeof token).toBe('string');

            const decoded = jwt.verify(token, SECRET);
            expect(decoded.id).toBe(USER_ID);
            expect(decoded.exp).toBeDefined();
        });
    });

    describe('verifyToken()', () => {
        test('should verify a valid token and return payload', () => {
            const token = jwt.sign({ id: USER_ID }, SECRET);
            const result = jwtUtils.verifyToken(token);

            expect(result.id).toBe(USER_ID);
        });

        test('should return false for invalid token', () => {
            const invalidToken = 'invalid.token.here';
            const result = jwtUtils.verifyToken(invalidToken);

            expect(result).toBe(false);
        });
    });

    describe('decode()', () => {
        test('should decode token without verification', () => {
            const token = jwt.sign({ id: USER_ID }, SECRET);
            const decoded = jwtUtils.decode(token);

            expect(decoded.id).toBe(USER_ID);
        });

        test('should return null for invalid token', () => {
            const result = jwtUtils.decode('not_a_real_token');

            expect(result).toBe(null);
        });
    });
});