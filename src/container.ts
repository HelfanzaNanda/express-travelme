import { Container } from 'injektion';
import { UserRepository, } from './app/Repositories';

// const container = new Container({
//   autoloadBaseDir: './src/app',
// });

// const container = await Container.autoload('./src/app');

Container.namedBind('UserRepository', UserRepository);

export default container;