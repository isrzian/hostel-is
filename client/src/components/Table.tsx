import React from 'react';
import {Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TableProps {
    columns: ColumnsType<any>
    dataSource: any[]
}

export const _Table = (props: TableProps) => <Table columns={props.columns} dataSource={props.dataSource} />;
