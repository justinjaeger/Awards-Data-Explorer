import React from 'react';

type INotFoundProps = {
    thingCannotFind: string;
};

export default function NotFound(props: INotFoundProps) {
    return <h1>404 - {props.thingCannotFind} Not Found</h1>;
}
