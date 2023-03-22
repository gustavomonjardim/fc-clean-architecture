import Product from "../../../domain/product/entity/product";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 50);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product 1",
      price: 50,
    };

    const output: OutputUpdateProductDto = {
      id: "123",
      name: "Product 1",
      price: 50,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not update a product", async () => {
    const productRepository = MockRepository();

    const usecase = new UpdateProductUseCase(productRepository);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product 1",
      price: 50,
    };

    productRepository.update.mockRejectedValue(new Error("Product not found"));

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
