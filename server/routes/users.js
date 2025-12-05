var express = require('express');
var router = express.Router();
const {faker} = require('@faker-js/faker');
const { readFile } = require('node:fs/promises');
const {hobbiesList} = require('../constants');
const Pagination = require('../models/pagination');


// Generate an array of 3 random unique hobbies
const randomHobbiesArray = faker.helpers.arrayElements(hobbiesList, 3);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
      const {search_text, hobby, nationality} = req.query
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      console.log(search_text)
      const usersData = await readFile("./users.json");
      const users = JSON.parse(usersData);
      let filteredUsers = users;
      if(search_text){
        filteredUsers = filteredUsers.filter(u => (u.firstName == search_text || u.lastName == search_text))
      }
      if(hobby){
        filteredUsers = filteredUsers.filter(u => u.hobbies.includes(hobby));
      }
      if(nationality){
        filteredUsers = filteredUsers.filter(u => u.nationality == nationality);
      }
      const resultCount = filteredUsers.length;
      const totalPages = Math.ceil(resultCount / limit);
      const pagination = new Pagination(page, limit, resultCount, totalPages);
      const paginatedUsers = filteredUsers.slice(skip, skip+limit);
      const result = {data: paginatedUsers, pagination: pagination};
      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
