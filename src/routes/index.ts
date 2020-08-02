import { Router } from 'express';
import bankSlipRoutes from './billet.routes';

const routes = Router();

routes.use('/billet', bankSlipRoutes);

export default routes;
