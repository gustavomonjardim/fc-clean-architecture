import Product from "../../../domain/product/entity/product";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("123", "Product 1", 50);
const product2 = new Product("456", "Product 2", 100);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const input: InputListProductDto = {};

    const output: OutputListProductDto = {
      products: [
        {
          id: "123",
          name: "Product 1",
          price: 50,
        },
        {
          id: "456",
          name: "Product 2",
          price: 100,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not listproducts", async () => {
    const productRepository = MockRepository();

    const usecase = new ListProductUseCase(productRepository);

    const input: InputListProductDto = {};

    productRepository.findAll.mockRejectedValue(new Error("No products found"));

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("No products found");
  });
});
