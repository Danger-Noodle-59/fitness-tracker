const userController = require('../server/controllers/userController');
const { User } = require('../server/models/userModel');
const httpMocks = require('node-mocks-http');
const { createRequest, createResponse } = httpMocks;

jest.mock('../server/models/userModel', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('userController', () => {
  let req, res, next;

  beforeEach(() => {
    req = createRequest();
    res = createResponse();
    next = jest.fn();
  });

  describe('verifyUser', () => {
    it('should verify a user', async () => {
      req.body = { username: 'test_user', password: 'test_password' };
      const mockUser = {
        username: 'test_user',
        password: 'test_password',
        _id: 'test_id',
      };
      User.findOne.mockResolvedValueOnce(mockUser);

      await userController.verifyUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'test_user' });
      expect(res.locals).toEqual({
        authenticated: true,
        _id: 'test_id',
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      req.body = {
        username: 'test_user',
        password: 'test_password',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        sex: 'Male',
        height: 180,
        weight: 75,
        goal: 'Lose weight',
        data: [],
      };
      const mockUser = {
        _id: 'test_id',
      };
      User.create.mockResolvedValueOnce(mockUser);

      await userController.createUser(req, res, next);

      expect(User.create).toHaveBeenCalledWith({
        username: 'test_user',
        password: 'test_password',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        sex: 'Male',
        height: 180,
        weight: 75,
        goal: 'Lose weight',
        data: [],
      });
      expect(res.locals._id).toBe('test_id');
      expect(next).toHaveBeenCalled();
    });
  });
});
