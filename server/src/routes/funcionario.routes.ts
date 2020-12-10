import { Router } from 'express';

import FornecedorController from '../app/controllers/FuncionarioController';

const fornecedoresRouter = Router();

fornecedoresRouter.get('/', FornecedorController.index);

fornecedoresRouter.post('/', FornecedorController.store);

export default fornecedoresRouter;
