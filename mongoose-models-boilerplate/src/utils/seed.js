import User from '../models/user';

const userData = {
    email: 'foo@bar.com'
};

export default () => {
    console.log('Seeding model data...');

    return User.find({email: userData.email}).exec()
        .then(users => {
            if (users.length === 1) return Promise.resolve(false);
            return User.create(userData).then(user => {
                console.log('Seeding model data finished');
                return Promise.resolve(true);
            });
        });
};
