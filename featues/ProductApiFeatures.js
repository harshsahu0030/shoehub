class ProductApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              gender: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              title: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              brand: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              color: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  primitiveFilters() {
    const gender = this.queryStr.gender
      ? {
          gender: this.queryStr.gender,
        }
      : {};

    this.query = this.query.find({ ...gender });
    return this;
  }

  arrayFilters() {
    const category = this.queryStr.category
      ? {
          category: {
            $in: this.queryStr.category.split(","),
          },
        }
      : {};

    // const brand = this.queryStr.brand
    //   ? {
    //       brand: {
    //         $in: this.queryStr.brand.split(","),
    //       },
    //     }
    //   : {};

    const color = this.queryStr.color
      ? {
          color: {
            $in: this.queryStr.color.split(","),
          },
        }
      : {};

    this.query = this.query.find({ ...category, ...color });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for category
    const removeFields = [
      "keyword",
      "page",
      "limit",
      "gender",
      "category",
      "brand",
      "color",
      "sort",
      "limit",
    ];

    // filter for category / type / gender
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    this.queryStr.sort &&
      (this.query = this.query.sort([
        [
          this.queryStr.sort.split(",")[0],
          parseInt(this.queryStr.sort.split(",")[1]),
        ],
      ]));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ProductApiFeatures;
