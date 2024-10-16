import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Filter by category if provided
  filterByCategory() {
    if (this.query.category) {
      this.modelQuery = this.modelQuery.where({
        category: this.query.category,
      });
    }
    return this;
  }

  // Filter by premium if provided
  filterByPremium() {
    if (this.query.premium) {
      this.modelQuery = this.modelQuery.where({
        premium: this.query.premium,
      });
    }
    return this;
  }

  // Count total documents and calculate pagination details
  async calculatePagination() {
    const queryFilters = this.modelQuery.getFilter();
    const documentCount = await this.modelQuery.model.countDocuments(
      queryFilters
    );

    const currentPage = Number(this?.query?.page) || 1;
    const itemsPerPage = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(documentCount / itemsPerPage);

    return {
      currentPage,
      itemsPerPage,
      documentCount,
      totalPages,
    };
  }
}

export default QueryBuilder;