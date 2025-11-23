import React, { useEffect, useRef } from "react";
import { Table } from "@mantine/core";

type CursorWrapperProps = {
  clickFunc: () => void;
  bg: string;
  children: React.ReactNode;
  isCursor: boolean;
  getNextPage: (cursorIdx: number) => void;
  cursorIdx: number;
};

const CursorWrapper: React.FC<CursorWrapperProps> = ({
  clickFunc,
  bg,
  children,
  isCursor,
  getNextPage,
  cursorIdx,
}) => {
  const ref = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (!isCursor) return;
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getNextPage(cursorIdx);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Table.Tr ref={ref} onClick={clickFunc} bg={bg}>
      {children}
    </Table.Tr>
  );
};

export default CursorWrapper;
