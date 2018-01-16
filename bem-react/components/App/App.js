import React from 'react';
import { decl } from 'bem-react-core';

import Header from 'e:Header';
import Intro from 'e:Intro';
import ElemTable from 'e:Table';

import Table from 'b:Table';

export default decl({
    block: 'App',
    content() {
        const { headers, rows } = this.props.data;
        return [
            <Header key="h">Welcome to BEM in your React</Header>,
            <Intro key="i">
                To get started, edit <code>src/components/App/App.js</code> and save to reload.
            </Intro>,
            <ElemTable key="t">
                <Table headers={headers} rows={rows} />
            </ElemTable>,
        ];
    },
});
