import React from 'react';
import { decl } from 'bem-react-core';

import Header from 'e:Header';
import Intro from 'e:Intro';

import Button from 'b:Button';

export default decl({
    block: 'App',
    content() {
        return [
            <Header key="h">
                Welcome to BEM in your React <Button>press me</Button>
            </Header>,
            <Intro key="i">
                To get started, edit <code>src/components/App/App.js</code> and save to reload.
            </Intro>,
        ];
    },
});
