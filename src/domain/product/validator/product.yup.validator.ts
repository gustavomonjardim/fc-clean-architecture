import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(product: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .required("Price is required")
            .moreThan(0, "Price must be greater than zero"),
        })
        .validateSync(
          {
            id: product.id,
            name: product.name,
            price: product.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        product.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
