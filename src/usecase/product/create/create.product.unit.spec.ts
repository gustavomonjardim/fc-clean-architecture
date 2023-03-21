import Product from "../../../domain/product/entity/product";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const product = new Product("123", "Product 1", 50);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Product 1",
      price: 50,
    };

    const output: OutputCreateProductDto = {
      id: expect.any(String),
      name: "Product 1",
      price: 50,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not create a product", async () => {
    const productRepository = MockRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Product 1",
      price: 50,
    };

    input.name = "";

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Name is required");
  });
});
