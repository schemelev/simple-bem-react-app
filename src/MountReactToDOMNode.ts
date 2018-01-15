import { injectable } from 'inversify';
import { render, unmountComponentAtNode } from 'react-dom';
import { isNil } from 'lodash';

export namespace interfaces {
    export interface MountReactToDOMNode {
        mount(elementId, reactComponent);
        unmount(domElement): boolean;
    }

    export interface Settings {
        appMountIntervalCheckMs: number;
        appMountTimeMs: number;
        appMountTimerMs: number;
    }
}

@injectable()
export default class MountReactToDOMNode implements interfaces.MountReactToDOMNode {
    private settings: interfaces.Settings = {
        appMountIntervalCheckMs: 100,
        appMountTimeMs: 3000,
        appMountTimerMs: 0,
    };
    private foundIntervalId;

    getSettigns(): interfaces.Settings {
        return this.settings;
    }

    foundHTMLElement(elementId: string): Promise<Element> {
        return new Promise((resolve, reject) => {
            this.foundIntervalId = setInterval(() => {
                if (this.settings.appMountTimerMs >= this.settings.appMountTimeMs) {
                    clearInterval(this.foundIntervalId);

                    reject('not found element by ID');
                } else {
                    const HTMLElement = document.getElementById(elementId);

                    if (!isNil(HTMLElement)) {
                        clearInterval(this.foundIntervalId);

                        resolve(HTMLElement);
                    }

                    this.settings.appMountTimerMs += this.settings.appMountIntervalCheckMs;
                }
            }, this.settings.appMountIntervalCheckMs);
        });
    }

    mount(reactComponent, elementId): Promise<Element> {
        return new Promise((resolve, reject) => {
            this.foundHTMLElement(elementId)
                .then(htmlElement => {
                    render(reactComponent, htmlElement);

                    resolve(htmlElement);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    unmount(HTMLElement) {
        if (!isNil(HTMLElement)) {
            unmountComponentAtNode(HTMLElement);
            return true;
        }

        return false;
    }
}
