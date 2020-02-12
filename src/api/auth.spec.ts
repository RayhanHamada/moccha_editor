import { expect } from 'chai';
import { getRoomKey, getAuthEndpoint, checkRoomExistence } from './auth';

describe('Auth API Interface', function() {
	this.timeout(15000);

	it('should get to auth endpoint', done => {
		getAuthEndpoint().then(val => {
			expect(val).exist;
			done();
		});
	});

	it('should get room key', done => {
		getRoomKey().then(val => {
			expect(val, `the keys: ${val}`).exist;
			done();
		});
	});

	it('should check for key existence', done => {
		getRoomKey().then(roomKey => {
			checkRoomExistence(roomKey).then(exists => {
				expect(exists, `roomKey is ${roomKey}`).to.be.true;
				done();
			});
		});
	});
});
