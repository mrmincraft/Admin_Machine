const fs = require('node:fs');
const path = require('node:path');
const dbUtille = require('../utile/dbUtille');

// Mock the file system
jest.mock('node:fs');

const mockDbPath = path.join(__dirname, '../data/db.json');
const mockDb = {
  users: [{ id: 1, username: 'testuser', password: 'hashedpassword' }],
  machines: [{ id: 1, nameMachine: 'Machine A', status: 'active', levelAccess: 2 }],
};

describe('dbUtille', () => {
  beforeEach(() => {
    // Mock reading the database file
    fs.readFileSync.mockImplementation(() => JSON.stringify(mockDb));
    // Mock writing to the database file
    fs.writeFileSync.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findUserById should return the correct user', () => {
    const user = dbUtille.findUserById(1);
    expect(user).toEqual({ id: 1, username: 'testuser', password: 'hashedpassword' });
  });

  test('findUserByUsername should return the correct user', () => {
    const user = dbUtille.findUserByUsername('testuser');
    expect(user).toEqual({ id: 1, username: 'testuser', password: 'hashedpassword' });
  });

  test('addUser should add a new user and write to the database', () => {
    const newUser = { id: 2, username: 'newuser', password: 'newpassword' };
    dbUtille.addUser(newUser);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          users: [...mockDb.users, newUser],
        },
        null,
        2
      ),
      'utf8'
    );
  });

  test('updateUser should update an existing user and write to the database', () => {
    const updates = { username: 'updateduser' };
    const updatedUser = dbUtille.updateUser(1, updates);

    expect(updatedUser).toEqual({ id: 1, username: 'updateduser', password: 'hashedpassword' });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          users: [{ id: 1, username: 'updateduser', password: 'hashedpassword' }],
        },
        null,
        2
      ),
      'utf8'
    );
  });

  test('deleteUser should remove a user and write to the database', () => {
    dbUtille.deleteUser(1);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          users: [],
        },
        null,
        2
      ),
      'utf8'
    );
  });

  test('findMachineById should return the correct machine', () => {
    const machine = dbUtille.findMachineById(1);
    expect(machine).toEqual({ id: 1, nameMachine: 'Machine A', status: 'active', levelAccess: 2 });
  });

  test('addMachine should add a new machine and write to the database', () => {
    const newMachine = { id: 2, nameMachine: 'Machine B', status: 'inactive', levelAccess: 1 };
    dbUtille.addMachine(newMachine);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          machines: [...mockDb.machines, newMachine],
        },
        null,
        2
      ),
      'utf8'
    );
  });

  test('updateMachine should update an existing machine and write to the database', () => {
    const updates = { status: 'inactive' };
    const updatedMachine = dbUtille.updateMachine(1, updates);

    expect(updatedMachine).toEqual({ id: 1, nameMachine: 'Machine A', status: 'inactive', levelAccess: 2 });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          machines: [{ id: 1, nameMachine: 'Machine A', status: 'inactive', levelAccess: 2 }],
        },
        null,
        2
      ),
      'utf8'
    );
  });

  test('deleteMachine should remove a machine and write to the database', () => {
    dbUtille.deleteMachine(1);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDbPath,
      JSON.stringify(
        {
          ...mockDb,
          machines: [],
        },
        null,
        2
      ),
      'utf8'
    );
  });
});