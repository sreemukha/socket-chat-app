const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name:'Test user1',
      room:'Test room'
    }, {
      id: '2',
      name:'Test user2',
      room:'Test room2'
    }, {
      id: '3',
      name:'Test user3',
      room:'Test room'
    }];
  });

  it('should add a new user', () => {
    const test_users = new Users();
    const user = {
      id: '1212qw',
      name:'Test user',
      room:'Test room'
    };
    const resultUser = test_users.addUser(user.id, user.name, user.room);
    expect(test_users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '1';
    const user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '13';
    const user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    const userId = '5';
    const user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for Test room', ()=>{
    const userList = users.getUserList('Test room');
    expect(userList).toEqual(['Test user1', 'Test user3']);
  });

  it('should return names for Test room2', ()=>{
    const userList = users.getUserList('Test room2');
    expect(userList).toEqual(['Test user2']);
  });
});
