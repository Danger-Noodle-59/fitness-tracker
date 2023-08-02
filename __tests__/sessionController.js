const sessionController = require('../server/controllers/sessionController');
const Session = require('../server/models/sessionModel');

jest.mock('../server/models/sessionModel');

describe('sessionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('startSession', () => {
    it('should create a new session if the user does not have one', (done) => {
      const req = {};
      const res = { locals: { _id: 'test_user_id' } };
      const next = jest.fn();

      Session.find.mockResolvedValueOnce([]);
      Session.create.mockResolvedValueOnce({});

      sessionController.startSession(req, res, next);

      setImmediate(() => {
        expect(Session.find).toHaveBeenCalledWith({ cookieId: 'test_user_id' });
        expect(Session.create).toHaveBeenCalledWith({ cookieId: 'test_user_id' });
        expect(next).toHaveBeenCalled();
        done();
      });
    });

    it('should call next with an error if res.locals._id does not exist', (done) => {
      const req = {};
      const res = { locals: {} };
      const next = jest.fn();

      sessionController.startSession(req, res, next);

      setImmediate(() => {
        expect(next).toHaveBeenCalledWith({
          log: 'error in sessionController.StartSession',
          message: { err: 'Error user id undefined' }
        });
        done();
      });
    });

    it('should call next with an error if the session is not found in the database', (done) => {
      const req = {};
      const res = { locals: { _id: 'test_user_id' } };
      const next = jest.fn();

      Session.find.mockRejectedValueOnce(new Error('Database error'));

      sessionController.startSession(req, res, next);

      setImmediate(() => {
        expect(Session.find).toHaveBeenCalledWith({ cookieId: 'test_user_id' });
        expect(next).toHaveBeenCalledWith({
          log: 'error in sessionController.StartSession',
          message: { err: 'Error finding session in db: Error: Database error' }
        });
        done();
      });
    });
  });

  describe('isLoggedIn', () => {
    it('should call next with an error if the ssid cookie does not exist', (done) => {
      const req = { cookies: {} };  // No ssid cookie
      const res = { redirect: jest.fn() };
      const next = jest.fn();

      sessionController.isLoggedIn(req, res, next);

      setImmediate(() => {
        // We expect Session.findOne not to be called because the ssid cookie doesn't exist
        expect(Session.findOne).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({
          log: 'Error occurred in sessionController.isLoggedIn',
          message: { err: 'An error occurred' },
        });
        done();
      });
    });

    it('should redirect if there is no active session in the database', (done) => {
      const req = { cookies: { ssid: 'test_ssid' } };
      const res = { redirect: jest.fn() };
      const next = jest.fn();

      Session.findOne.mockResolvedValueOnce(null);

      sessionController.isLoggedIn(req, res, next);

      setImmediate(() => {
        expect(Session.findOne).toHaveBeenCalledWith({ cookieId: 'test_ssid' });
        expect(res.redirect).toHaveBeenCalledWith('/');
        done();
      });
    });
  });


  describe('endSession', () => {
    it('should end a session if one exists', (done) => {
      const req = { cookies: { ssid: 'test_ssid' } };
      const res = {};
      const next = jest.fn();

      Session.findOneAndDelete.mockResolvedValueOnce({});

      sessionController.endSession(req, res, next);

      setImmediate(() => {
        expect(Session.findOneAndDelete).toHaveBeenCalledWith({ cookieId: 'test_ssid' });
        expect(next).toHaveBeenCalled();
        done();
      });
    });
    it('should call next with an error if there is no active session', (done) => {
      const req = { cookies: { ssid: 'non_existent_ssid' } };
      const res = {};
      const next = jest.fn();

      // Mock the findOneAndDelete method to resolve with null, indicating no session was found
      Session.findOneAndDelete.mockResolvedValueOnce(null);

      sessionController.endSession(req, res, next);

      setImmediate(() => {
        expect(Session.findOneAndDelete).toHaveBeenCalledWith({ cookieId: 'non_existent_ssid' });
        expect(next).toHaveBeenCalledWith({
          log: 'error in sessionController.endSession',
          message: { err: 'Error there is no active session' }
        });
        done();
      });
    });


  });
});
