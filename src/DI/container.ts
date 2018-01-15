import { Container } from 'inversify';
import { TYPES } from './types';

import MountReactToDOMNode, { interfaces } from '../MountReactToDOMNode';

const container = new Container();

container.bind<interfaces.MountReactToDOMNode>(TYPES.MountReactToDOMNode).to(MountReactToDOMNode);

export { container };
