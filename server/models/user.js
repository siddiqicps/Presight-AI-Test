// user.class.js
class User {
  constructor({id, avatar, fname, lname, nationality, age, hobbies}) {
    this.id = id;
    this.avatar = avatar;
    this.firstName = fname;
    this.lastName = lname;
    this.nationality = nationality;
    this.age = age;
    this.hobbies = hobbies
  }

  // Method to get user's full name
  getFullName() {
    return this.firstName + this.lastName;
  }
}

module.exports = User;