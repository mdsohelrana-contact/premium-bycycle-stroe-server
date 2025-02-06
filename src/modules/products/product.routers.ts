import { Router } from 'express';
import { productControlers } from './product.controlers';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validatedRequest';
import { productValidation } from './product.validation.schema';

const productRouter = Router();

// getallProduct Route
productRouter.get('/products', productControlers.allProducts);

// get a single product Route
productRouter.get('/products/:productId', productControlers.singleData);

// post product  route
productRouter.post(
  '/products',
  auth('admin'),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(productValidation.productValidationSchema),
  productControlers.postProduct,
);

// update product  route BY ID
productRouter.put(
  '/products/:productId',
  auth('admin'),
  validateRequest(productValidation.updateProductValidationSchema),
  productControlers.updateProduct,
);

// delete  product  route BY ID
productRouter.delete(
  '/products/:productId',
  auth('admin'),
  productControlers.deleteSingleProduct,
);

export default productRouter;
