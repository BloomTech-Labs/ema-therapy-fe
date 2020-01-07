import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import { useAuth } from '../../utils/dataStore';

function AllMoodsPdf() {
  const { user } = useAuth();
  const { error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const [allMoods, setAllMoods] = useState([]);

  useEffect(() => {
    if (data) {
      setAllMoods(data.user.moods);
    }
  }, [data]);

  const dateDisplay = (timestamp, display) => {
    const originalDate = Number(timestamp);
    return format(new Date(originalDate), display);
  };

  if (error) return `Error: ${error.message}`;

  const pdfData = allMoods.map((record) => [
    dateDisplay(record.createdAt, 'iii MM/dd/yyyy'),
    record.mood,
    record.anxietyLevel,
    record.sleep,
  ]);

  const exportPDF = () => {
    const orientation = 'portrait'; // portrait or landscape
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);

    const title = !user.lastName
      ? `${user.firstName}'s Mood History`
      : `${user.firstName} ${user.lastName}'s Mood History`;
    const headers = [
      [
        'Date of Entry',
        'Mood Rating (1-5)',
        'Anxiety Level (1-10)',
        'Hours Slept',
      ],
    ];
    const content = {
      startY: 50,
      head: headers,
      body: pdfData.reverse(),
      theme: 'grid',
      headStyles: { fillColor: ['#00917A'] },
    };

    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('mood-history.pdf');
  };
  return (
    <>
      <Button type="button" onClick={() => exportPDF()}>
        All Time
      </Button>
    </>
  );
}

export default AllMoodsPdf;

const Button = styled.button`
  height: 50px;
  width: 60%;
  border: 1px solid #00917a;
  background-color: #fff;
  color: #00917a;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;
