import * as React from 'react';

import { container } from './DI/container';
import { TYPES } from './DI/types';

import { interfaces } from './MountReactToDOMNode';

const fabrica = require('./index');
const { App } = fabrica;

const sampleData: ISampleData[] = require('./sample-data-for-table').default;

interface ISampleData {
    Id: string;
    Country: string;
    Street: string;
    Phone: string;
    Email: string;
    Name: string;
    Date: string;
    Lat: number;
    Lng: number;
}

const prepareSampleData = (data: ISampleData[]) => {
    let keys: string[];

    return data.reduce(
        (acc: { headers: string[]; rows: string[][] }, row, index) => {
            if (index === 0) {
                keys = Object.keys.call(Object, row);
                acc.headers = [...keys];
            }

            acc.rows.push(
                keys.reduce((a: string[], r) => {
                    a.push(row[r]);
                    return a;
                }, [])
            );

            return acc;
        },
        { headers: [], rows: [] }
    );
};

const mountReact = container.get<interfaces.MountReactToDOMNode>(TYPES.MountReactToDOMNode);

mountReact.mount(<App data={prepareSampleData(sampleData)} />, 'root').catch(err => {
    console.error(err);
});
