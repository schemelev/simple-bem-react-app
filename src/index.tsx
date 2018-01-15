import * as React from 'react';

import { container } from './DI/container';
import { TYPES } from './DI/types';

import { interfaces } from './MountReactToDOMNode';

const fabrica = require('./index');

const mountReact = container.get<interfaces.MountReactToDOMNode>(TYPES.MountReactToDOMNode);

mountReact.mount(<fabrica.App />, 'root')
    .catch((err) => {
        console.error(err);
    });
