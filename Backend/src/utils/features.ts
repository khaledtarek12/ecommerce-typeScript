import mongoose from "mongoose";

class Features {

  public paginationResult: any;
  constructor(
    public mongooseQuery: mongoose.Query<any[], any>,
    private queryString: any
  ) {}

  Filter() {
    return this;
  }

  Sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  LimitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  Pagination(documentCount: number) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const lastIndex = page * limit;
    const pagination: any = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.totalPages = Math.ceil(documentCount / limit);
    if (skip > 0) pagination.previous = page - 1;
    if (lastIndex < documentCount) pagination.next = page + 1;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  Search(modelName: string) {
    if (this.queryString.search) {
      let query: any = {};
      if (modelName === "products") {
        query.$or = [
          { name: new RegExp(this.queryString.search, "i") },
          { description: new RegExp(this.queryString.search, "i") },
        ];
      } else {
        query = { name: new RegExp(this.queryString.search, "i") };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

export default Features;
