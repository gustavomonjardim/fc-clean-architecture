import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 50);

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
});
