import cx from 'clsx';
import { useState } from 'react';
import { Table , ScrollArea } from '@mantine/core';
import classes from './tablecomp.module.css';
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
      <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.location}</Table.Td>
      <Table.Td>{row.config}</Table.Td>
      <Table.Td>{row.testtarget}</Table.Td>
      <Table.Td>{row.notes}</Table.Td>
      </Table.Tr>
  ));

  return (
    <pre>
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
            <Table.Th className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Config</Table.Th>
                  <Table.Th>Test Target</Table.Th>
                  <Table.Th>Notes</Table.Th>
              </Table.Tr>
            </Table.Th>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    </ScrollArea>
    </pre>
  );
}
export default Tablecomp;