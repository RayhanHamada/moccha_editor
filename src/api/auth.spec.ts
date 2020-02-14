import { expect } from 'chai';
import {
	getRoomKey,
	getAuthEndpoint,
	checkRoomExistence,
	deleteRoomKey,
} from './auth';
import { clearRoomKeys } from './api.util';

import { config } from "dotenv";
config();

// skipped, already run test and all passed
describe.skip('Auth API Interface', function() {
	this.timeout(15000);

	this.afterAll(done => {
		clearRoomKeys().then(res => {
			console.log(`clearing room key on server: ${res.data}`);
			done();
		});
	});

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

	it('should delete specific key', done => {
		// create room key on server
		getRoomKey().then(key => {
			// then check room existence if exists
			checkRoomExistence(key).then(existsBefore => {
				// then delete that generated key
				deleteRoomKey(key).then(() => {
					// then check room existence again if not exists
					checkRoomExistence(key).then(existsAfter => {
						expect(existsBefore && !existsAfter).to.be.true;
						done();
					});
				});
			});
		});
	});
});
