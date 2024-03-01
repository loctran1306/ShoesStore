import { Avatar, Box, Checkbox, TableCell, TableRow, Tooltip } from '@mui/material';

import { useEffect, useState } from 'react';
import { fDateTime } from 'src/utils/formatTime';

type rowProps = {
  selected?: boolean | number;
  onSelectRow?: () => void;
  row: any;
  data: any;
  tableHead: any[];
  handleClick: VoidFunction;
  index: number;
};

function ViewTableRow({
  selected,
  onSelectRow,
  row,
  data,
  tableHead,
  handleClick,
  index,
}: rowProps) {
  const newRow = tableHead.map((title) => title.id);

  const renderRow = (item: string, key: number) => {
    if (item === 'stt') {
      return <TableCell key={key}>{key}</TableCell>;
    }
    return (
      <TableCell key={key} align="center">
        {data[item]}
      </TableCell>
    );
  };

  return (
    <TableRow
      onDoubleClick={handleClick}
      sx={{
        '&:hover > .MuiTableCell-root': {
          cursor: 'pointer',
          backgroundColor: 'rgba(145, 158, 171, 0.08)',
        },
        cursor: 'pointer',
        '& .MuiSvgIcon-root': {
          width: '20px',
        },

        '& td': {
          borderRight: '0 !important',
        },
      }}
    >
      <TableCell sx={{ padding: '0px !important', textAlign: 'center' }}>
        <Checkbox checked={selected !== -1} onChange={onSelectRow} value={row?.Id} />
      </TableCell>
      {newRow.map((item: any) => renderRow(item, index))}
    </TableRow>
  );
}

export default ViewTableRow;
