
/**
 *  Todo: Schemas para orientação de como esta implementada a aplicação
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: objectId
 *           description: O ID do user.
 *           example: 6091316840c37846f8ed1a0f
 *         name:
 *           type: string
 *           description: O nome do user.
 *           example: admin_user
 *         email:
 *           type: string
 *           description: O e-mail do user.
 *           example: admin@email.com
 * 
 *     RegisterUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: O nome de user.
 *           example: admin_user
 *         email:
 *           type: string
 *           description: O e-mail do user.
 *           example: admin@email.com
 *         password:
 *           type: string
 *           description:  A password do user.
 *           example: admin_password
 * 
 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: O e-mail do user.
 *           example: admin@email.com
 *         password:
 *           type: string
 *           description: A password do user.
 *           example: admin_password
 * 
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas: 
 *     NovosMortos:
 *       type: object
 *       properties:
 *         data:
 *           type: string
 *           description: A data do óbito.
 *           example: Jan-12
 *         distrito:
 *           type: string
 *           description: O distrito do óbito.
 *           example: Guarda.
 *         obitos:
 *           type: number
 *           description: Numero de óbitos.
 *           example: 23.
 * 
 *     Mortos:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: objectId
 *               description: O ID de tarefas.
 *               example: 6091316840c37846f8ed1a0f
 *         - $ref: '#/components/schemas/NovosMortos'
 *
 * /user/register:
 *   post:
 *     tags: 
 *       - User Requests
 *     summary: Registre um user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: Criou um user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: O valor booleano da autenticação.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: O valor jsonwebtoken.
 *                   example: eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiVmFnbmVyQm9tSmVzdXMiLCJVc2VybmFtZSI6IlZhZ25lciBCb20gSmVzdXMifQ.v4BcDDTFqMXhpi7ofKmhDLkkiiNtPXYlvZGgS8gU38M
 *
 * /user/login:
 *   post:
 *     tags: 
 *       - User Requests
 *     summary: Login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: The authentication boolean value.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: The jsonwebtoken value.
 *                   example: eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiVmFnbmVyQm9tSmVzdXMiLCJVc2VybmFtZSI6IlZhZ25lciBCb20gSmVzdXMifQ.v4BcDDTFqMXhpi7ofKmhDLkkiiNtPXYlvZGgS8gU38M
 *
 * @swagger
 * /user/isAuthorized:
 *   get:
 *     tags: 
 *       - User Requests
 *     summary: Verifique a autorização do user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verifique a autorização do user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * /morto/create:
 *   post:
 *     tags: 
 *       - Mortos Requests
 *     summary: Create a Todo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/NovosMortos'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Created a Todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Todo created.
 *       
 * /morto/list:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Lista dos Óbitos.
 *     description: Retorna a lista de Óbitos.
 *     responses:
 *       200:
 *         description: OK.
 * 
 * /morto/list_obitos:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Lista número dos óbitos.
 *     description: Retorna lista número dos óbitos.
 *     responses:
 *       200:
 *         description: OK.
 *
 * /morto/media:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Média dos óbitos.
 *     description: Retorna a média dos óbitos.
 *     responses:
 *       200:
 *         description: OK.
 *
 * /morto/soma:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Soma dos óbitos.
 *     description: Retorna a Soma dos óbitos.
 *     responses:
 *       200:
 *         description: OK.
 *
 * /morto/max:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Valor máximo de óbitos.
 *     description: Valor máximo de óbitos.
 *     responses:
 *       200:
 *         description: OK.
 *
 * /morto/min:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Valor mínimo de óbitos em um dia.
 *     description: Valor mínimo de óbitos
 *     responses:
 *       200:
 *         description: OK.
 *             
 *
 * /morto/search/data:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Consulte aqui todos os dados de uma respetiva Data.
 *     description: Os dados podem ser obtidos com base a consulta realizada
 *     parameters:
 *       - in: query
 *         required: false
 *         name: data
 *         description: Especifique a data no formato mm-dd.
 *         example: Jan-01
 *     responses:
 *       200:
 *         description: A lista dos óbitos.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mortos'
 * /morto/search/distrito:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Consulte aqui todos os dados de uma respetiva Distrito.
 *     description: Os dados podem ser obtidos com base a consulta realizada
 *     parameters:
 *       - in: query
 *         name: distrito
 *         required: false
 *         description: Especifique um distrito de Portugal.
 *         example: Guarda
 *     responses:
 *       200:
 *         description: A lista dos óbitos.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mortos'
 * 
 * /morto/search/obitos:
 *   get:
 *     tags: 
 *       - Mortos Requests
 *     summary: Consulte aqui todos os dados de uma respetivo numero de Óbitos.
 *     description: Os dados podem ser obtidos com base a consulta realizada
 *     parameters:
 *       - in: query
 *         name: obitos
 *         required: false
 *         description: Especifique numero de óbitos.
 *         example: 6
 *     responses:
 *       200:
 *         description: A lista dos óbitos.
 *         content:
 *           application/json:
 *             schema:
 *                   type: number
 *                   items:
 *                     $ref: '#/components/schemas/Mortos'
 * 
 */








