import { Router } from 'express';
import { usersRoutes } from '@/routes/users-routes';
import { sessionsRoutes } from '@/routes/sessions-routes';
import { deliveriesRoutes } from '@/routes/deliveries-routes';
import { deliveryLogsRoutes } from '@/routes/delivery-logs-routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/deliveries', deliveriesRoutes);
routes.use('/delivery-logs', deliveryLogsRoutes);

export { routes };
