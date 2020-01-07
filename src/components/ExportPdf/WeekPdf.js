import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import isAfter from 'date-fns/isAfter';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import { useAuth } from '../../utils/dataStore';

function WeekPdf() {
  const { user } = useAuth();
  const { error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const weekOfMoods = (entries) => {
    const prevWeekData = entries.filter((mood) => {
      return isAfter(startOfDay(+mood.createdAt), subDays(Date.now(), 7));
    });
    return prevWeekData;
  };

  const [weekMoods, setWeekMoods] = useState([]);

  useEffect(() => {
    if (data) {
      setWeekMoods(weekOfMoods(data.user.moods));
    }
  }, [data]);

  if (error) return `Error: ${error.message}`;

  const dateDisplay = (timestamp, display) => {
    const originalDate = Number(timestamp);
    return format(new Date(originalDate), display);
  };

  const pdfData = weekMoods.map((record) => [
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
      ? `${user.firstName}'s 7-Day Mood History`
      : `${user.firstName} ${user.lastName}'s 7-Day Mood History`;
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
      headStyles: { fillColor: ['#FCA395'] },
    };

    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('mood-history.pdf');
  };

  return (
    <>
      <Button type="button" onClick={() => exportPDF()}>
        Last 7 Days
      </Button>
    </>
  );
}

export default WeekPdf;

const Button = styled.button`
  height: 50px;
  width: 60%;
  border: none;
  background-color: #00917a;
  color: #fff;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;
