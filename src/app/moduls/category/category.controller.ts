import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.service";

const createCatergory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategoryDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryService.getCategoryDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrived",
    data: result,
  });
});
export const categoryController = {
  createCatergory,
  getAllCategory,
};
