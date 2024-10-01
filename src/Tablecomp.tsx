import cx from 'clsx';
import { useState } from 'react';
import { Table as MantineTable, ScrollArea } from '@mantine/core';
import classes from './Tablecomp.module.css';
import React from 'react';

const data = [
  {
    name: 'run1',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run2',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run3',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run4',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run5',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  },
  {
    name: 'run6',
    date: '10-10-24',
    location: 'MRDC',
    config: 'comp',
    testtarget: 'software',
    notes: 'drove in circles'
  }
];

function Tablecomp() {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <MantineTable>
        <tr key={row.name}>
        <td>{row.name}</td>
        <td>{row.date}</td>
        <td>{row.location}</td>
        <td>{row.config}</td>
        <td>{row.testtarget}</td>
        <td>{row.notes}</td>
        </tr>
    </MantineTable>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <MantineTable miw={700}>
            <th className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Config</th>
                  <th>Test Target</th>
                  <th>Notes</th>
              </tr>
            </th>
            <MantineTable.Tbody>{rows}</MantineTable.Tbody>
        </MantineTable>
    </ScrollArea>
  );
}
export default Tablecomp;