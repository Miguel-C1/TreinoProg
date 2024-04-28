import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

export default function DateTime() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text>{date.toLocaleString()}</Text>;
}
