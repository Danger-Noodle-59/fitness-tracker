const statsController = require('../server/controllers/statsController');
const User = require('../server/models/userModel');
const httpMocks = require('node-mocks-http'); // A package to mock Express.js 'req' and 'res'
const { createRequest, createResponse } = httpMocks;

jest.mock('../server/models/userModel', () => ({

    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),

}));

describe('statsController', () => {
    let req, res, next;

    beforeEach(() => {
        req = createRequest();
        res = createResponse();
        next = jest.fn();

    });

    describe('updateStats', () => {
        it('should update the stats of a user', async () => {
            req.cookies = { ssid: 'test_id' };
            req.body = { goal: 'new goal', weight: 'new weight' };
            User.findByIdAndUpdate.mockResolvedValueOnce({});

            await statsController.updateStats(req, res, next);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                { _id: 'test_id' },
                { goal: 'new goal', weight: 'new weight' },
                { new: true }
            );
            expect(next).toHaveBeenCalled();
        });



    });

    describe('getUserInfo', () => {
        it('should get the user info', async () => {
            req.cookies = { ssid: 'test_id' };
            const mockUser = {
                firstName: 'First',
                lastName: 'Last',
                age: 25,
                sex: 'Male',
                height: 170,
                weight: 70,
                goal: 'Goal',
                data: [],
            };
            User.findById.mockResolvedValueOnce(mockUser);
            await statsController.getUserInfo(req, res, next);
            expect(User.findById).toHaveBeenCalledWith({ _id: 'test_id' });
            expect(res.locals.userInfo).toEqual(mockUser);
            expect(next).toHaveBeenCalled();
        });

    });

    describe('updateLogs', () => {
        it('should update the logs of a user', async () => {
          req.cookies = { ssid: 'test_id' };
          req.body = { data: 'new data' };
          User.findByIdAndUpdate.mockResolvedValueOnce({});

          await statsController.updateLogs(req, res, next);

          expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: 'test_id' },
            { data: 'new data' },
            { new: true }
          );
          expect(next).toHaveBeenCalled();
        });
      });

});
