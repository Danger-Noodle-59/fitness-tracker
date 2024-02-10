const cookieController = require('../server/controllers/cookieController');
const { createRequest, createResponse } = require('node-mocks-http');

describe('cookieController', () => {
    describe('setSSIDCookie', () => {
        it('should set a cookie if res.locals._id is present', () => {
            const req = createRequest();
            const res = createResponse();
            const next = jest.fn();
            res.locals._id = 'test_id';
            cookieController.setSSIDCookie(req, res, next);
            const cookies = res.cookies;
            const ssidCookie = cookies.ssid;
            expect(ssidCookie).toBeDefined();
            expect(ssidCookie.value).toBe('test_id');
            expect(next).toHaveBeenCalled();
        });

        it('should throw an error if res.locals._id is not present', () => {
            const req = createRequest();
            const res = createResponse();
            const next = jest.fn();

            cookieController.setSSIDCookie(req, res, next);


            expect(next).toHaveBeenCalledWith({
                log: 'error in cookieController.setSSIDCookie',
                message: { err: `Error user id undefined` }
            });
        });
    });
    describe('removeSSIDCookie', () => {
        it('should remove a cookie', () => {
          const req = createRequest();
          req.cookies = { ssid: 'test_id' };
          const res = createResponse();
          const next = jest.fn();
          res.cookies = { ssid: { value: 'test_id', options: {} } };
          res.clearCookie = jest.fn().mockImplementationOnce((name) => {
              if (name === 'ssid') {
                  res.cookies.ssid = { value: '', options: {} };
              }
          });

          cookieController.removeSSIDCookie(req, res, next);
          const cookies = res.cookies;
          const ssidCookie = cookies.ssid;
          expect(ssidCookie.value).toBe("");
          expect(res.clearCookie).toHaveBeenCalledWith('ssid');
          expect(next).toHaveBeenCalled();
      });

      it('should throw an error if removing the cookie fails', () => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();
        req.cookies = { ssid: 'test_id' };
        res.clearCookie = () => { throw new Error('Error trying to delete SSID cookie') };

        cookieController.removeSSIDCookie(req, res, next);


        expect(next).toHaveBeenCalledWith({
            log: 'error in cookieController.removeSSIDCookie',
            message: { err: 'Error trying to delete SSID cookie' }
        });
    });

      it('should handle attempting to clear a cookie that does not exist', () => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();
        cookieController.removeSSIDCookie(req, res, next);
        expect(next).toHaveBeenCalledWith({
            log: 'error in cookieController.removeSSIDCookie',
            message: { err: 'No ssid cookie to remove' }
        });
      });
      });
});
