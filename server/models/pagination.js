// user.class.js
class Pagination {
  constructor(page, limit, totalItems, totalPages) {
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.hasNextPage = page < totalPages ? true : false;
    this.hasPrevPage = page > 1 ? true : false;
    this.nextPage = page+1 < totalPages ? page+1 : null;
    this.prevPage = page-1 > 0 ? page-1 : null;
  }

}

module.exports = Pagination;