import User from '../../lib/models/user';

const data = {
    email: 'foo@bar.com',
};

describe('Model: User', () => {
    it('should be queryable', done => {
        User.find((err, users) => expect(users).toBeTruthy())
            .then(done);
    });

    it('should have required fields', done => {
        new User({}).save((err, u) => {
            expect(err).toBeTruthy();
            expect(err.name).toBe('ValidationError');
            done();
        });
    });

    it('should be updatable and deletable', done => {
        new User(data).save((err, u) => expect(u._id).toBeTruthy())
            .then(() => User.findOneAndRemove()
                            .then(() => User.count((_, n) => expect(n).toEqual(0))
                            .then(done)));
    });
});
