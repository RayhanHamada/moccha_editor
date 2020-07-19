import { expect } from 'chai';
import {
  getRoomKeyAPI,
  getAuthEndpointAPI,
  checkRoomExistenceAPI,
  deleteRoomKeyAPI,
} from './auth';
import { clearRoomKeysAPI } from './api.util';
import { debugLog } from '../utils';

describe.skip('Auth API Interface', function() {
  this.timeout(15000);

  this.afterAll(done => {
    clearRoomKeysAPI().then(res => {
      console.log(`clearing room key on server: ${res.data}`);
      done();
    });
  });

  // * passed
  it('should get to auth endpoint', done => {
    getAuthEndpointAPI().then(val => {
      expect(val).exist;
      done();
    });
  });

  // * passed
  it('should get room key', done => {
    getRoomKeyAPI().then(val => {
      expect(val, `the keys: ${val}`).exist;
      done();
    });
  });

  // * passed
  it('should check for key existence', done => {
    getRoomKeyAPI().then(roomKey => {
      checkRoomExistenceAPI(roomKey).then(exists => {
        expect(exists, `roomKey is ${roomKey}`).to.be.true;
        done();
      });
    });
  });

  // * passed
  it('should delete specific key', done => {
    // create room key on server
    getRoomKeyAPI()
      .then(key => {
        // then check room existence if exists
        checkRoomExistenceAPI(key)
          .then(existsBefore => {
            // then delete that generated key
            deleteRoomKeyAPI(key)
              .then(() => {
                // then check room existence again if not exists
                checkRoomExistenceAPI(key)
                  .then(existsAfter => {
                    expect(existsBefore && !existsAfter).to.be.true;
                    done();
                  })
                  .catch(() => {
                    debugLog(
                      `error when checking room existence after deleting roomKey`
                    );
                  });
              })
              .catch(() => {
                debugLog(`error when deleting room key`);
              });
          })
          .catch(() => {
            debugLog(
              `error when checking room existence before deleting roomKey`
            );
          });
      })
      .catch(() => {
        debugLog(`error when get roomKey`);
      });
  });
});
