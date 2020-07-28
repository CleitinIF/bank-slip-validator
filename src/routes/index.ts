import { Router } from 'express';
import bankSlipRoutes from './bank-slip.routes';

const routes = Router();

routes.use('/bank_slip', bankSlipRoutes);

export default routes;
